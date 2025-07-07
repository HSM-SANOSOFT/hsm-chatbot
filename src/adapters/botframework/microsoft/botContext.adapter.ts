import type { TurnContext } from 'botbuilder';

import type { ContextInterface } from '../../../core/interfaces';

export class BotContextAdapter implements ContextInterface {
  constructor(private context: TurnContext) {}

  getUserId(): string {
    return this.context.activity.from.id;
  }

  getText(): string {
    return this.context.activity.text || '';
  }

  getChannelId(): string {
    return this.context.activity.channelId;
  }

  getConversationId(): string {
    return this.context.activity.conversation.id;
  }

  getTimestamp(): Date {
    return this.context.activity.timestamp || new Date();
  }

  async sendActivity(activity: unknown): Promise<void> {
    await this.context.sendActivity(activity);
  }
}
