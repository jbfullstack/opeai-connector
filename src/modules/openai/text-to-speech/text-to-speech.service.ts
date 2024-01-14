import { Injectable, Logger } from '@nestjs/common';
import { TextToSpeechInputDto } from './models/text-to-speech-input.dto';
import axios from 'axios';

@Injectable()
export class TextToSpeechService {
  private readonly logger: Logger = new Logger(TextToSpeechService.name);

  async textToSpeech(textToSpeechInputDto: TextToSpeechInputDto) {
    const url = `${process.env.OPEN_API__TEXT_TO_SPEECH_URL}`;
    const headers = {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    const data = {
      model: textToSpeechInputDto.model,
      input: textToSpeechInputDto.input,
      voice: textToSpeechInputDto.voice,
      response_format: 'mp3',
    };

    try {
      const response = await axios.post(url, data, {
        headers,
        responseType: 'stream',
      });

      return response;
    } catch (error) {
      this.logger.error(`Error in convertTextToSpeech: ${error.message}`);
      throw error;
    }
  }
}
