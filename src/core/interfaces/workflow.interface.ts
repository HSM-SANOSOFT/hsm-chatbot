import type { ContextInterface, SdkInterface } from '.';

export interface WorkflowInterface {
  readonly id: string;

  execute(ctx: ContextInterface, sdk: SdkInterface): Promise<boolean>;
}
