import { ContextInterface } from './context.interface';

export interface ServerInterface {
  start(): Promise<void>;
  onRequest<T>(): Promise<T>;
  stop(): void;
  restart(): Promise<void>;
}
