import { Logger } from '@hsm-chatbot-lib/common/logger';
import { RouteDataTransfer, RouterAction } from '@hsm-chatbot-lib/definitions';
import { IAgent } from '@hsm-chatbot-lib/definitions/agents';
import { AgentApplication, TurnState } from '@microsoft/agents-hosting';
import { AgentsRepository } from '../agents';

export class WelcomeAgent implements IAgent {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(WelcomeAgent.name);
  }

  async handle(app: AgentApplication<TurnState>, _data: RouteDataTransfer) {
    this.logger.debug('Handling welcome agent');
    app.onConversationUpdate('membersAdded', async (context, _state) => {
      this.logger.debug('Received user message');
      await context.sendActivity(
        ` Welcome to the chatbot! How can I assist you today?`,
      );
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    return {
      action: RouterAction.END,
      target: { agentId: AgentsRepository.END },
    };
  }
}
