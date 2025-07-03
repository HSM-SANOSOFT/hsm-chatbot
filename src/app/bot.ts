import type {
  BotInterface,
  ContextInterface,
  HandlerInterface,
  SdkInterface,
} from '../core/interfaces';

import { DemoWorkflow } from './workflows';

export class Bot extend {
  public async run(ctx: ContextInterface, sdk: SdkInterface): Promise<void>{
    this.onMessage(async (ctx, next) => {
      entryWorkflow = new DemoWorkflow()
      await entryWorkflow.execute(ctx, sdk);
  }
}
