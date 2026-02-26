import { Logger } from '@hsm-chatbot-lib/common/logger';
import { RouteDataTransfer, RouterAction } from '@hsm-chatbot-lib/definitions';
import { IAgent } from '@hsm-chatbot-lib/definitions/agents';
import { ActivityTypes } from '@microsoft/agents-activity';
import { AgentApplication, TurnState } from '@microsoft/agents-hosting';
import { AgentsRepository } from '../agents';

export class EndAgent implements IAgent {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(EndAgent.name);
  }

  async handle(app: AgentApplication<TurnState>, _data: RouteDataTransfer) {
    await app.onActivity(ActivityTypes.Message, async (context, _state) => {
      this.logger.debug('Received user message');
      await context.sendActivity(
        ` Thank you for chatting! If you have any more questions, feel free to ask. Goodbye!`,
      );
    });
    return {
      action: RouterAction.RESET,
      target: { agentId: AgentsRepository.WELCOME },
    };
  }
}
