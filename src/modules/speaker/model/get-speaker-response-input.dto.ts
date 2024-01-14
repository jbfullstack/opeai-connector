import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetSpeakerAnswerInputDTO {
  @IsString()
  @IsNotEmpty()
  message: string;
}
