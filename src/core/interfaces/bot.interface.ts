import type { ContextInterface } from './context.interface';

export interface BotInterface {
  run(ctx: ContextInterface): Promise<void>;
}
