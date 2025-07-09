import type { ActivityModel } from '../models/activity.model';

export interface ContextInterface {
  readonly activity: ActivityModel;
  sendActivity(activity: Partial<ActivityModel> | string): Promise<void>;
  sendActivities(activities: Array<Partial<ActivityModel> | string>): Promise<void>;
  sendTraceActivity(name: string, value: any, valueType?: string, label?: string): Promise<void>;
  updateActivity(activity: Partial<ActivityModel>): Promise<void>;
  deleteActivity(activityId: string): Promise<void>;
}