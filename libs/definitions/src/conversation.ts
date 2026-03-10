import { IChannel } from './channel';
import { IMessage } from './message';

export interface IConversation {
  id: string;
  channel: IChannel;
  messages: IMessage[];
}
