import type {
  ContextInterface,
  SdkInterface,
  WorkflowInterface,
} from '../../core/interfaces';

export class DemoWorkflow implements WorkflowInterface {
  constructor(
    private readonly ctx: ContextInterface,
    private readonly sdk: SdkInterface,
  ) {}

  readonly id = 'demo.workflow';

  async execute(): Promise<boolean> {
    const text = this.ctx.getText();
    const userId = this.ctx.getUserId();

    await this.sdk.sendText(userId, {
      content: `Processed your input: ${text}`,
    });

    return true;
  }
}
