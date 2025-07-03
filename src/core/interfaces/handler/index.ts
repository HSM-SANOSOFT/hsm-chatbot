import type { MemberHandlerInterface } from './member.handler.interface';
import type { MessageHandlerInterface } from './message.handler.interface';

export interface HandlerInterface {
  memberHandler: MemberHandlerInterface;
  messageHandler: MessageHandlerInterface;
}
