import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ChatHistoryManager } from './model/chat-history-manager';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  CreateSessionInputDto,
  GetChatCompletionAnswerInputDTO,
  GetChatCompletionAnswerOutputDTO,
} from './model/chat-completion-answer.dto';
import { SessionType } from './model/chat-session-response.interface';

const DEFAULT_TEMPERATURE = 1;
const DEFAULT_MODEL = 'gpt-3.5-turbo';

@Injectable()
export class ChatGptApiService {
  private readonly logger: Logger = new Logger(ChatGptApiService.name);
  private readonly chatHistory: ChatHistoryManager;
  private readonly chat: ChatOpenAI;

  constructor() {
    this.chatHistory = new ChatHistoryManager();
    this.chat = new ChatOpenAI({
      temperature: DEFAULT_TEMPERATURE,
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: DEFAULT_MODEL,
    });
  }

  async startNewSession(data: CreateSessionInputDto) {
    try {
      let session = this.chatHistory.createChatSession(
        data.userName,
        data.sessionName,
        data.systemMessage,
      );
      return {
        sessionId: session.uuid,
      };
    } catch (error) {
      this.logger.error('Error starting a new session ', error);
      throw new HttpException(
        JSON.stringify(error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAiModelResponseFromUserSession(
    uuid: string,
    userName: string,
    data: GetChatCompletionAnswerInputDTO,
  ) {
    let userSession = this.chatHistory.getChatSession(uuid);

    if (!userSession) {
      this.logger.warn(`ChatSession ${uuid} does not exist`);
      throw new NotFoundException(`ChatSession ${uuid} does not exist`);
    }

    if (userSession.userName !== userName) {
      this.logger.warn(`ChatSession ${uuid} is not owned by ${userName}`);
      throw new ForbiddenException(
        `${userName} is not the owener of chatSession ${uuid}`,
      );
    }

    // update chat history with human data
    userSession.addHumanMessage(data.message);
    const result = await this.chat.predictMessages(userSession.chatHistory);

    const aiMessage = result.content;
    // Store to rember in next iteration
    userSession.addAiMessage(aiMessage);

    return {
      userId: userSession.userName,
      sessionId: userSession.sessionName,
      historyLength: userSession.chatHistory.length,
      ...GetChatCompletionAnswerOutputDTO.getInstance(aiMessage),
    };
  }

  getSessionsList(userId: string): SessionType[] {
    return this.chatHistory.getChatSessionsList(userId);
  }
}
