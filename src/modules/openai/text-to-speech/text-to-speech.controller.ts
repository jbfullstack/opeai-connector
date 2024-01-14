import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { TextToSpeechService } from './text-to-speech.service';
import { TextToSpeechInputDto } from './models/text-to-speech-input.dto';
import { Response } from 'express';

@Controller('text-to-speech')
export class TextToSpeechController {
  constructor(private readonly service: TextToSpeechService) {}

  @Post()
  getTextToSpeech(
    @Body(new ValidationPipe({ transform: true }))
    data: TextToSpeechInputDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.service.textToSpeech(data);
  }
}
