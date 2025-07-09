export interface ActivityInterface {
  getId(): string;
  getType(): string;
  getTimestamp(): Date | undefined;
  getLocalTimestamp(): Date | undefined;
  getLocalTimezone(): string | undefined;
  getCallerId(): string | undefined;
  getServiceUrl(): string | undefined;
  getChannelId(): string;
  getFrom(): { id: string; name?: string; role?: string };
  getConversation(): { id: string };
  getRecipient(): { id: string; name?: string; role?: string };
  getText(): string;
  getTextFormat(): string | undefined;
  getAttachments(): any[] | undefined;
  getChannelData(): any;
}
