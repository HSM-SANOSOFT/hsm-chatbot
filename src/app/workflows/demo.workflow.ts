import type {
  ContextInterface,
  SdkInterface,
  WorkflowInterface,
} from '../../core/interfaces';

export class DemoWorkflow implements WorkflowInterface {
  readonly id = 'demo.workflow';

  async execute(ctx: ContextInterface, sdk: SdkInterface): Promise<boolean> {
    const text = ctx.getText();
    const userId = ctx.getUserId();

    await sdk.sendText(userId, { content: `Processed your input: ${text}` });

    return true;
  }
}
