import type { TurnContext } from 'botbuilder';

import type { ContextInterface } from '../../../core/interfaces';
import { ActivityModel } from '../../../core/models';

export class MsBotContextAdapter implements ContextInterface {
  public readonly activity: ActivityModel;

  constructor(private readonly ctx: TurnContext) {
    const raw = ctx.activity;
    this.activity = new ActivityModel({
      id: raw.id,
      type: raw.type,
      timestamp: raw.timestamp ? new Date(raw.timestamp) : undefined,
      localTimestamp: raw.localTimestamp
        ? new Date(raw.localTimestamp)
        : undefined,
      localTimezone: raw.localTimezone,
      callerId: raw.callerId,
      serviceUrl: raw.serviceUrl,
      channelId: raw.channelId,
      from: { id: raw.from?.id, name: raw.from?.name, role: raw.from?.role },
      conversation: { id: raw.conversation?.id },
      recipient: {
        id: raw.recipient?.id,
        name: raw.recipient?.name,
        role: raw.recipient?.role,
      },
      textFormat: raw.textFormat,
      attachmentLayout: raw.attachmentLayout,
      membersAdded: raw.membersAdded,
      membersRemoved: raw.membersRemoved,
      reactionsAdded: raw.reactionsAdded,
      reactionsRemoved: raw.reactionsRemoved,
      topicName: raw.topicName,
      historyDisclosed: raw.historyDisclosed,
      locale: raw.locale,
      text: raw.text || '',
      speak: raw.speak,
      inputHint: raw.inputHint,
      summary: raw.summary,
      suggestedActions: raw.suggestedActions,
      attachments: raw.attachments,
      entities: raw.entities,
      channelData: raw.channelData,
      action: raw.action,
      replyToId: raw.replyToId,
      label: raw.label,
      valueType: raw.valueType,
      value: raw.value,
      name: raw.name,
      relatesTo: raw.relatesTo,
      code: raw.code,
      expiration: raw.expiration ? new Date(raw.expiration) : undefined,
      importance: raw.importance,
      deliveryMode: raw.deliveryMode,
      listenFor: raw.listenFor,
      textHighlights: raw.textHighlights,
      semanticAction: raw.semanticAction,
    });
  }

  async sendActivity(activity: Partial<ActivityModel> | string): Promise<void> {
    await this.ctx.sendActivity(
      typeof activity === 'string' ? activity : (activity as any),
    );
  }

  async sendActivities(
    activities: Array<Partial<ActivityModel> | string>,
  ): Promise<void> {
    const payloads = activities.map(a =>
      typeof a === 'string' ? { type: 'message', text: a } : a,
    );
    await this.ctx.sendActivities(payloads as any);
  }

  async sendTraceActivity(
    name: string,
    value: any,
    valueType?: string,
    label?: string,
  ): Promise<void> {
    await this.ctx.sendTraceActivity(name, value, valueType, label);
  }

  async updateActivity(activity: Partial<ActivityModel>): Promise<void> {
    await this.ctx.updateActivity(activity as any);
  }

  async deleteActivity(activityId: string): Promise<void> {
    await this.ctx.deleteActivity(activityId);
  }
}
