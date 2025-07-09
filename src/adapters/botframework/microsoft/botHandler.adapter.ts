import { ActivityHandler } from 'botbuilder';

import type {
  HandlerInterface,
  WorkflowInterface,
} from '../../../core/interfaces';

export class MsBotHandlerAdapter implements HandlerInterface {
  readonly handler: ActivityHandler;
  constructor() {
    this.handler = new ActivityHandler();
  }

  async onMessage(workflow: WorkflowInterface): Promise<void> {
    await this.handler.onMessage(workflow.execute);
  }
}
