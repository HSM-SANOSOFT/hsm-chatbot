export enum ChannelId {
  FACEBOOK = 'facebook',
  TIKTOK = 'tiktok',
  WHATSAPP = 'whatsapp',
  TELEGRAM = 'telegram',
  CHATWOOT = 'chatwoot',
  WEBHOOK = 'webhook',
}

export interface IChannel {
  id: ChannelId;
  account: {
    id: string;
    metadata: Record<string, unknown>;
    user: {
      id: string;
      [key: string]: unknown;
    };
  };
}
