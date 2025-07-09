import type { ContextInterface } from './context.interface';
import type { SdkInterface } from './sdk.interface';
import type { ServerInterface } from './server.interface';

export interface BotFrameworkInterface {
  server: ServerInterface;
  init(): Promise<{
    ctx: ContextInterface;
    sdk: SdkInterface;
  }>;
}
