import { Logger } from '@hsm-chatbot-lib/common/logger';
import { CloudAdapter, MemoryStorage } from '@microsoft/agents-hosting';
import { AgentsRepository } from './modules/agents';
import { App } from './modules/app';

function bootstrap() {
  const adapter = new CloudAdapter();
  const storage = new MemoryStorage();
  const agent = AgentsRepository.WELCOME;
  const app = new App(agent, {
    logger: new Logger({ level: 'debug', callerName: 'App' }),
    adapter,
    storage,
  });

  app.create();
  app.listen(3000);
}

void bootstrap();
