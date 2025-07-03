import type { ContextInterface } from '../context.interface';
import type { SdkInterface } from '../sdk.interface';

export interface MessageHandlerInterface {
  onMessageReceived(ctx: ContextInterface, sdk: SdkInterface): Promise<void>;
  onMessageSent(ctx: ContextInterface, sdk: SdkInterface): Promise<void>;
}
