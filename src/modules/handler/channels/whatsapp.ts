import {
  ChannelId,
  IErrorResponse,
  IHandlerChannel,
  IncomingMessages,
  OutgoingMessage,
} from '@hsm-chatbot-lib/definitions';

export class WhatsAppHandler implements IHandlerChannel {
  readonly channelId: ChannelId;
  constructor() {
    this.channelId = ChannelId.WHATSAPP;
  }

  incomingMessage<TPayload>(
    accountId: string,
    payload: TPayload,
  ): Promise<IncomingMessages | IErrorResponse> {
    return Promise.reject(
      new Error(
        `Method not implemented for account ${accountId} and payload ${payload}`,
      ),
    );
  }

  outgoingMessage<TPayload>(
    accountId: string,
    payload: TPayload,
  ): Promise<OutgoingMessage | IErrorResponse> {
    return Promise.reject(
      new Error(
        `Method not implemented for account ${accountId} and payload ${payload}`,
      ),
    );
  }
}
