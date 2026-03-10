import {
  ChannelId,
  IErrorResponse,
  IHandlerChannel,
  IncomingMessages,
  OutgoingMessage,
} from '@hsm-chatbot-lib/definitions';

export class ChatwootHandler implements IHandlerChannel {
  readonly channelId: ChannelId;
  constructor() {
    this.channelId = ChannelId.CHATWOOT;
  }

  incomingMessage<TPayload>(
    accountId: string,
    payload: TPayload,
  ): Promise<IncomingMessages | IErrorResponse> {
    return Promise.resolve({
      error: {
        code: 'NOT_IMPLEMENTED',
        message: `Method not implemented for account ${accountId} and payload ${payload}`,
      },
    } as IErrorResponse);
  }

  outgoingMessage<TPayload>(
    accountId: string,
    payload: TPayload,
  ): Promise<OutgoingMessage | IErrorResponse> {
    return Promise.resolve({
      error: {
        code: 'NOT_IMPLEMENTED',
        message: `Method not implemented for account ${accountId} and payload ${payload}`,
      },
    } as IErrorResponse);
  }
}
