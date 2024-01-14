import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionInputDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  sessionName: string;

  @IsString()
  systemMessage: string;
}

export class GetChatCompletionAnswerInputDTO {
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class GetChatCompletionAnswerOutputDTO {
  @IsString()
  @IsNotEmpty()
  aiMessage: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  sessionId: string;

  static getInstance(aiMessage: string) {
    const result = new GetChatCompletionAnswerOutputDTO();
    result.aiMessage = aiMessage;
    return result;
  }
}
