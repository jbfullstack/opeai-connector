import { Module } from '@nestjs/common';
import { ChatGptApiService } from './chat-gpt-api.service';
import { ChatCompletionApiController } from './chat-gpt-api.controller';

@Module({
  exports: [ChatGptApiService],
  providers: [ChatGptApiService],
  controllers: [ChatCompletionApiController],
})
export class ChatCompletionApiModule {}
