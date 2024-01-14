import { Test, TestingModule } from '@nestjs/testing';
import { ChatGptApiService } from './chat-gpt-api.service';

describe('ChatCompletionApiService', () => {
  let service: ChatGptApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGptApiService],
    }).compile();

    service = module.get<ChatGptApiService>(ChatGptApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
