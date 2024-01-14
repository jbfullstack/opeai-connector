import { Logger } from '@nestjs/common';
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
  BaseMessage,
} from 'langchain/schema';
import { v4 as uuidv4 } from 'uuid';

export class ChatSession {
  private readonly logger: Logger = new Logger(ChatSession.name);
  readonly uuid: string;
  readonly sessionName: string;
  readonly userName: string;
  readonly chatHistory: BaseMessage[];

  constructor(userName: string, sessionName: string, systemMessage?: string) {
    this.uuid = uuidv4();
    this.userName = userName;
    this.sessionName = sessionName;
    this.chatHistory = [];

    if (systemMessage && systemMessage.length) {
      this.logger.debug(
        `ChatSession ${this.uuid} intializes with systemMessage:\n ${systemMessage}`,
      );
      this.addSystemMessage(systemMessage);
    }
  }

  private addSystemMessage(message: string) {
    this.chatHistory.push(new SystemMessage(message));
  }

  addAiMessage(message: string) {
    this.chatHistory.push(new AIMessage(message));
  }

  addHumanMessage(message: string) {
    this.chatHistory.push(new HumanMessage(message));
  }
}
