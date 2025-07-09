import type { WorkflowInterface } from './workflow.interface';

export interface HandlerInterface {
  handler: unknown;
  getActivityType?(): string;

  onMessage?(workflow: WorkflowInterface): Promise<void>;
  onMessageSent?(workflow: WorkflowInterface): Promise<void>;

  onMemberAdded?(workflow: WorkflowInterface): Promise<void>;
  onMemberRemoved?(workflow: WorkflowInterface): Promise<void>;
}
