export interface MessageHandlerInterface {
  onMessageReceived(): Promise<void>;
  onMessageSent(): Promise<void>;
}
