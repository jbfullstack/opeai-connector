import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import {
  CreateSessionInputDto,
  GetChatCompletionAnswerInputDTO,
} from 'src/modules/openai/chat-completion-api/model/chat-completion-answer.dto';
import { Response } from 'express';
import { AudioGateway } from './audio-gateway-websocket';
import { ChatGptApiService } from '../openai/chat-completion-api/chat-gpt-api.service';

//! TODO : Secure endpoints
@Controller('ai-speaker')
export class SpeakerController {
  constructor(
    private readonly speakerService: SpeakerService,
    private readonly gptService: ChatGptApiService,
    private readonly audioGateway: AudioGateway,
  ) {}

  @HttpCode(201)
  @Post('/start-session')
  createNewSession(
    @Body(new ValidationPipe({ transform: true }))
    data: CreateSessionInputDto,
  ) {
    return this.gptService.startNewSession(data);
  }

  @HttpCode(200)
  @Get('/user/:userId/sessions')
  getSessionsList(@Param('userId') userId) {
    const sessionIds = this.gptService.getSessionsList(userId);
    return sessionIds;
  }

  @HttpCode(201)
  @Post('/user/:user/chat-session/:chatSessionId')
  async getChatCompletionMessageFromUserSession(
    @Param('user') userName,
    @Param('chatSessionId') uuid,
    @Body(new ValidationPipe({ transform: true }))
    data: GetChatCompletionAnswerInputDTO,
    @Res() res: Response,
  ) {
    const audioStream = await this.speakerService.getSpeakerResponse(
      uuid,
      userName,
      data,
    );
    // this.audioGateway.streamAudioToClient(audioStream);
    // return { message: 'Streaming audio' };

    res.setHeader('Content-Type', 'audio/mpeg; charset=binary');
    res.charset = 'binary';
    res.status(HttpStatus.OK);

    // Pipe the audio stream directly to the response
    audioStream.pipe(res);
  }
}
