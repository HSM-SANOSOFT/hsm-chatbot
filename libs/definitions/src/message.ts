import { IConversation } from './conversation';
import { IUser } from './user';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  DOCUMENT = 'document',
}

export type MessageContent =
  | { type: MessageType.TEXT; text: string }
  | { type: MessageType.IMAGE; url: string; mimeType: string }
  | { type: MessageType.AUDIO; url: string; mimeType: string }
  | { type: MessageType.DOCUMENT; url: string; mimeType: string };

export interface IMessage {
  id: string;
  content: MessageContent;
  timestamp: Date;
}

export interface IncomingMessages {
  user: IUser;
  conversation: IConversation;
}

export interface OutgoingMessage {
  content: MessageContent;
}
