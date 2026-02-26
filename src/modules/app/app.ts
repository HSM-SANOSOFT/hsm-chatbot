import { Logger } from '@hsm-chatbot-lib/common/logger';
import { IRouter } from '@hsm-chatbot-lib/definitions';
import {
  AgentApplication,
  CloudAdapter,
  MemoryStorage,
  Storage,
  TurnState,
} from '@microsoft/agents-hosting';
import { startServer } from '@microsoft/agents-hosting-express';
import { AgentsRepository } from '../agents';
import { Router, RoutesAgentRegistry } from '../router';

export class App {
  private logger: Logger;
  private adapter: CloudAdapter;
  private storage: Storage;
  private app: AgentApplication<TurnState>;
  private router: IRouter;

  constructor(
    initialAgentId: AgentsRepository,
    options?: {
      adapter?: CloudAdapter;
      storage?: Storage;
      router?: IRouter;
      logger?: Logger;
    },
  ) {
    this.logger = options?.logger ?? new Logger('App');

    this.adapter = options?.adapter ?? new CloudAdapter();
    this.storage = options?.storage ?? new MemoryStorage();

    this.app = new AgentApplication({
      adapter: this.adapter,
      storage: this.storage,
    });

    this.router =
      options?.router ??
      new Router(this.app, initialAgentId, RoutesAgentRegistry);
  }

  create() {
    this.logger.info('Creating application');
    this.adapter.onTurnError = async (context, error) => {
      await context.sendActivity('Sorry, it looks like something went wrong!');
      this.logger.error(`Turn error: ${error}`);
    };
    return this.app;
  }

  listen(port: number = 3978) {
    this.logger.info(`Starting server on port ${port}`);
    startServer(this.app);
    this.router.run();
  }
}
