import type {
  ContextInterface,
  SdkInterface,
  WorkflowInterface,
} from '../../core/interfaces';

export class DemoWorkflow implements WorkflowInterface {
  constructor(
    public readonly ctx: ContextInterface,
    public readonly sdk: SdkInterface,
  ) {}

  readonly id = 'demo.workflow';

  async execute(): Promise<boolean> {
    const text = this.ctx.getText();

    await this.sdk.sendText({
      content: `Processed your input: ${text}`,
    });

    return true;
  }
}
