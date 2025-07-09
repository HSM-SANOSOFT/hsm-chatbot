import type { TurnContext } from 'botbuilder';
import {
  CloudAdapter,
  ConfigurationBotFrameworkAuthentication,
} from 'botbuilder';
import * as restify from 'restify';

import type { ServerInterface } from '../../../core/interfaces';

export class MsBotServerAdapter implements ServerInterface {
  private server = restify.createServer();
  private adapter: CloudAdapter;
  private pendingResolvers: Array<(ctx: TurnContext) => void> = [];

  constructor() {
    this.server.use(restify.plugins.bodyParser());
    const botAuth = new ConfigurationBotFrameworkAuthentication();
    this.adapter = new CloudAdapter(botAuth);
    this.adapter.onTurnError = async (context, error) => {
      console.error('[onTurnError] unhandled error:', error);
      await context.sendTraceActivity(
        'OnTurnError Trace',
        `${error}`,
        'https://www.botframework.com/schemas/error',
        'TurnError',
      );
      await context.sendActivity('The bot encountered an error or bug.');
      await context.sendActivity(
        'To continue to run this bot, please fix the bot source code.',
      );
    };
  }

  async start(): Promise<void> {
    this.server.post('/api/messages', async (req, res) => {
      await this.adapter.process(req, res, async (turnCtx: TurnContext) => {
        if (this.pendingResolvers.length > 0) {
          const resolve = this.pendingResolvers.shift()!;
          resolve(turnCtx);
        }
      });
    });

    await new Promise<void>(resolve => {
      const port = 3000;
      this.server.listen(port, () => {
        console.log(
          `Server running. Connect MS Bot Framework Emulator to http://localhost:${port}/api/messages`,
        );
        resolve();
      });
    });
  }

  onRequest<T = TurnContext>(): Promise<T> {
    return new Promise<T>(resolve => {
      this.pendingResolvers.push(resolve as (ctx: TurnContext) => void);
    });
  }

  stop(): void {
    this.server.close(() => console.log('MsBotServerAdapter stopped'));
  }

  async restart(): Promise<void> {
    this.stop();
    await this.start();
  }
}
