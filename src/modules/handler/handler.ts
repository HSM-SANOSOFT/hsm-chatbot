import {
  ChannelId,
  IErrorResponse,
  IncomingMessages,
  OutgoingMessage,
} from '@hsm-chatbot-lib/definitions';
import {
  ChatwootHandler,
  FacebookHandler,
  TelegramHandler,
  TikTokHandler,
  WebhookHandler,
  WhatsAppHandler,
} from './channels';

export class Handler {
  private readonly whatsappHandler: WhatsAppHandler;
  private readonly telegramHandler: TelegramHandler;
  private readonly facebookHandler: FacebookHandler;
  private readonly tiktokHandler: TikTokHandler;
  private readonly webhookHandler: WebhookHandler;
  private readonly chatwootHandler: ChatwootHandler;

  constructor() {
    this.whatsappHandler = new WhatsAppHandler();
    this.telegramHandler = new TelegramHandler();
    this.facebookHandler = new FacebookHandler();
    this.tiktokHandler = new TikTokHandler();
    this.webhookHandler = new WebhookHandler();
    this.chatwootHandler = new ChatwootHandler();
  }

  incomingMessage(
    channelId: ChannelId,
    accountId: string,
    payload: unknown,
  ): Promise<IncomingMessages | IErrorResponse> {
    switch (channelId) {
      case ChannelId.WHATSAPP:
        return this.whatsappHandler.incomingMessage(accountId, payload);
      case ChannelId.TELEGRAM:
        return this.telegramHandler.incomingMessage(accountId, payload);
      case ChannelId.FACEBOOK:
        return this.facebookHandler.incomingMessage(accountId, payload);
      case ChannelId.TIKTOK:
        return this.tiktokHandler.incomingMessage(accountId, payload);
      case ChannelId.WEBHOOK:
        return this.webhookHandler.incomingMessage(accountId, payload);
      case ChannelId.CHATWOOT:
        return this.chatwootHandler.incomingMessage(accountId, payload);
      default:
        return Promise.reject(new Error(`Unsupported channel: ${channelId}`));
    }
  }

  outgoingMessage(
    channelId: ChannelId,
    accountId: string,
    payload: unknown,
  ): Promise<OutgoingMessage | IErrorResponse> {
    switch (channelId) {
      case ChannelId.WHATSAPP:
        return this.whatsappHandler.outgoingMessage(accountId, payload);
      case ChannelId.TELEGRAM:
        return this.telegramHandler.outgoingMessage(accountId, payload);
      case ChannelId.FACEBOOK:
        return this.facebookHandler.outgoingMessage(accountId, payload);
      case ChannelId.TIKTOK:
        return this.tiktokHandler.outgoingMessage(accountId, payload);
      case ChannelId.WEBHOOK:
        return this.webhookHandler.outgoingMessage(accountId, payload);
      case ChannelId.CHATWOOT:
        return this.chatwootHandler.outgoingMessage(accountId, payload);
      default:
        return Promise.reject(new Error(`Unsupported channel: ${channelId}`));
    }
  }
}
