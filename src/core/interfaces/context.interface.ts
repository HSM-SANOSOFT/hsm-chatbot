export interface ContextInterface {
  getUserId(): string;
  getText(): string;
  getChannelId(): string;
  getConversationId(): string;
  getTimestamp(): Date;

  sendActivity(activity: unknown): Promise<void>;
}
