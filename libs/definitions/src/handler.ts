import { ChannelId } from './channel';
import { IncomingMessages, OutgoingMessage } from './message';
import { IErrorResponse } from './response';

export interface IHandlerChannel {
  readonly channelId: ChannelId;
  incomingMessage<TPayload>(
    accountId: string,
    payload: TPayload,
  ): Promise<IncomingMessages | IErrorResponse>;
  outgoingMessage<TPayload>(
    accountId: string,
    payload: TPayload,
  ): Promise<OutgoingMessage | IErrorResponse>;
}
