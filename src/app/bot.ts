import type {
  ContextInterface,
  HandlerInterface,
  SdkInterface,
} from '../core/interfaces';
import { DemoWorkflow } from './workflows';

export class Bot implements HandlerInterface {
  constructor(
    private readonly ctx: ContextInterface,
    private readonly sdk: SdkInterface,
  ) {}

  async onMessageReceived(): Promise<void> {
    const workflow = new DemoWorkflow(this.ctx, this.sdk);
    await workflow.execute();
  }
}
