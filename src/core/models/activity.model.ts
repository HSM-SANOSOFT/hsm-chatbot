import type { ActivityInterface } from '../interfaces';

export class ActivityModel implements ActivityInterface {
  constructor(
    public data: {
      id?: string;
      type: string;
      timestamp?: Date;
      localTimestamp?: Date;
      localTimezone?: string;
      callerId?: string;
      serviceUrl?: string;
      channelId: string;
      from: {
        id: string;
        name?: string;
        role?: string;
      };
      conversation: {
        id: string;
      };
      recipient: {
        id: string;
        name?: string;
        role?: string;
      };
      textFormat?: string;
      attachmentLayout?: string;
      membersAdded?: any[];
      membersRemoved?: any[];
      reactionsAdded?: any[];
      reactionsRemoved?: any[];
      topicName?: string;
      historyDisclosed?: boolean;
      locale?: string;
      text: string;
      speak?: string;
      inputHint?: string;
      summary?: string;
      suggestedActions?: any;
      attachments?: any[];
      entities?: any[];
      channelData?: any;
      action?: string;
      replyToId?: string;
      label?: string;
      valueType?: string;
      value?: any;
      name?: string;
      relatesTo?: any;
      code?: string;
      expiration?: Date;
      importance?: string;
      deliveryMode?: string;
      listenFor?: string[];
      textHighlights?: any[];
      semanticAction?: any;
    },
  ) {}

  getId(): string {
    return this.data.id || '';
  }
  getType(): string {
    return this.data.type;
  }
  getTimestamp(): Date | undefined {
    return this.data.timestamp;
  }
  getLocalTimestamp(): Date | undefined {
    return this.data.localTimestamp;
  }
  getLocalTimezone(): string | undefined {
    return this.data.localTimezone;
  }
  getCallerId(): string | undefined {
    return this.data.callerId;
  }
  getServiceUrl(): string | undefined {
    return this.data.serviceUrl;
  }
  getChannelId(): string {
    return this.data.channelId;
  }
  getFrom(): { id: string; name?: string; role?: string } {
    return this.data.from;
  }
  getConversation(): { id: string } {
    return this.data.conversation;
  }
  getRecipient(): { id: string; name?: string; role?: string } {
    return this.data.recipient;
  }
  getText(): string {
    return this.data.text;
  }
  getTextFormat(): string | undefined {
    return this.data.textFormat;
  }
  getAttachments(): any[] | undefined {
    return this.data.attachments;
  }
  getChannelData(): any {
    return this.data.channelData;
  }
  // Implement other getters as needed...
}
