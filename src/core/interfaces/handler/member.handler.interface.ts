import type { ContextInterface } from '../context.interface';
import type { SdkInterface } from '../sdk.interface';

export interface MemberHandlerInterface {
  onMemberAdded(ctx: ContextInterface, sdk: SdkInterface): Promise<void>;
  onMemberRemoved(ctx: ContextInterface, sdk: SdkInterface): Promise<void>;
}
