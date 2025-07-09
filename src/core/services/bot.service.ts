import { DemoWorkflow } from '../../app/workflows';
import type {
  BotFrameworkInterface,
  BotInterface,
  HandlerInterface,
} from '../interfaces';
export class BotService implements BotInterface {
  private readonly handler: HandlerInterface;

  constructor(private readonly framework: BotFrameworkInterface) {}

  async run(): Promise<void> {
    const { ctx, sdk } = await this.framework.init();
    const workflow = new DemoWorkflow(ctx, sdk);
    this.handler.onMessage(workflow);
  }
  async stop(): Promise<void> {
    console.log('Bot is stopping...');
  }
  async restart(): Promise<void> {
    console.log('Bot is restarting...');
  }
}
