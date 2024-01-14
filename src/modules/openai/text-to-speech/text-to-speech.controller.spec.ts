import { Test, TestingModule } from '@nestjs/testing';
import { TextToSpeechController } from './text-to-speech.controller';

describe('TextToSpeechController', () => {
  let controller: TextToSpeechController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextToSpeechController],
    }).compile();

    controller = module.get<TextToSpeechController>(TextToSpeechController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
