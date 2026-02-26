import { Logger } from '@hsm-chatbot-lib/common/logger/logger';
import {
  IRouter,
  RouterAction,
  RouterRegistry,
} from '@hsm-chatbot-lib/definitions';
import { IAgent } from '@hsm-chatbot-lib/definitions/agents';
import { AgentApplication, TurnState } from '@microsoft/agents-hosting';
import { AgentsRepository } from '../agents';
import { RoutesAgentRegistry } from './router-registry';
import { getRouterState, setRouterState } from './router-utils';

export class Router implements IRouter {
  readonly registry: RouterRegistry;
  readonly maxHops: number = 10;
  readonly app: AgentApplication<TurnState>;
  readonly initialAgentId: AgentsRepository;
  readonly logger: Logger = new Logger(Router.name);

  constructor(
    app: AgentApplication<TurnState>,
    initialAgentId?: AgentsRepository,
    registry?: RouterRegistry,
  ) {
    this.app = app;
    this.registry = registry ?? RoutesAgentRegistry;
    this.initialAgentId = initialAgentId ?? AgentsRepository.WELCOME;
    this.logger.info(`Router initialized`);
  }

  run(): void {
    this.logger.info('Starting router');

    this.app.onConversationUpdate('membersAdded', async (_context, state) => {
      this.logger.debug('checking router state');

      if (!getRouterState(state)) {
        setRouterState(state, {
          currentAgentId: this.initialAgentId,
        });
      }
      await this.handler(state);
    });
  }

  async handler(state: TurnState) {
    this.logger.debug('Handling router logic');
    const routerState = getRouterState(state);
    let active = true;

    while (active) {
      const agent: IAgent = this.registry[routerState.currentAgentId];
      const result = await agent.handle(this.app);
      this.logger.debug(
        `Agent ${routerState.currentAgentId} -> action ${result.action} target ${result.target?.agentId}`,
      );
      switch (result.action) {
        case RouterAction.NEXT:
        case RouterAction.PREVIOUS:
          routerState.currentAgentId = result.target.agentId;
          setRouterState(state, routerState);
          continue;
        case RouterAction.WAIT:
          setRouterState(state, routerState);
          continue;
        case RouterAction.END:
          routerState.currentAgentId = result.target.agentId;
          setRouterState(state, routerState);
          active = false;
          continue;
      }
    }
  }
}
