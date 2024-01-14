import { Module } from '@nestjs/common';
import { TextToSpeechController } from './text-to-speech.controller';
import { TextToSpeechService } from './text-to-speech.service';

@Module({
  providers: [TextToSpeechService],
  exports: [TextToSpeechService],
  // controllers: [TextToSpeechController],
})
export class TextToSpeechModule {}
