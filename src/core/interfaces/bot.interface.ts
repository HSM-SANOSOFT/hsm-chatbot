export interface BotInterface {
  run(): Promise<void>;
  stop(): Promise<void>;
  restart(): Promise<void>;
}
