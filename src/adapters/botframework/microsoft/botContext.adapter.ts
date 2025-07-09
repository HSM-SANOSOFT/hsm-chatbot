import type { Activity, TurnContext } from 'botbuilder';

import type { ContextInterface } from '../../../core/interfaces';

export class MsBotContextAdapter implements ContextInterface {
  constructor(public readonly ctx: TurnContext) {}

  getUserId(): string {
    return this.ctx.activity.from.id;
  }

  getText(): string {
    return this.ctx.activity.text || '';
  }

  getChannelId(): string {
    return this.ctx.activity.channelId;
  }

  getConversationId(): string {
    return this.ctx.activity.conversation.id;
  }

  getTimestamp(): Date {
    return this.ctx.activity.timestamp || new Date();
  }

  async sendActivity(activity: unknown): Promise<void> {
    await this.ctx.sendActivity(activity as Activity);
  }
}
