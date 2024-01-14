import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ChatGptApiService } from './chat-gpt-api.service';
import {
  CreateSessionInputDto,
  GetChatCompletionAnswerInputDTO,
} from './model/chat-completion-answer.dto';

//! TODO : Secure endpoints

@Controller('chat-gpt-api')
export class ChatCompletionApiController {
  private readonly logger: Logger = new Logger(
    ChatCompletionApiController.name,
  );
  constructor(private readonly service: ChatGptApiService) {}

  @HttpCode(201)
  @Post('/start-session')
  createNewSession(
    @Body(new ValidationPipe({ transform: true }))
    data: CreateSessionInputDto,
  ) {
    return this.service.startNewSession(data);
  }

  @HttpCode(200)
  @Post('/user/:user/chat-session/:chatSessionId')
  getChatCompletionMessageFromUserSession(
    @Param('user') userName,
    @Param('chatSessionId') uuid,
    @Body(new ValidationPipe({ transform: true }))
    data: GetChatCompletionAnswerInputDTO,
  ) {
    return this.service.getAiModelResponseFromUserSession(uuid, userName, data);
  }

  @HttpCode(200)
  @Get('/user/:userId/sessions')
  getSessionsList(@Param('userId') userId) {
    const sessionIds = this.service.getSessionsList(userId);
    return sessionIds;
  }
}
