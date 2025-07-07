export interface HandlerInterface {
  getActivityType(): string;

  onMessageReceived?(): Promise<void>;
  onMessageSent?(): Promise<void>;

  onMemberAdded?(): Promise<void>;
  onMemberRemoved?(): Promise<void>;
}
