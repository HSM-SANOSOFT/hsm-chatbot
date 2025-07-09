// adapters/botframework/microsoft/botServer.adapter.ts

import type { TurnContext } from 'botbuilder';
import {
  CloudAdapter,
  ConfigurationServiceClientCredentialFactory,
  createBotFrameworkAuthenticationFromConfiguration,
} from 'botbuilder';
import * as restify from 'restify';

import type { ServerInterface } from '../../../core/interfaces';

export class MsBotServerAdapter implements ServerInterface {
  private server: restify.Server;
  private adapter: CloudAdapter;
  private pendingResolvers: Array<(ctx: TurnContext) => void> = [];

  constructor() {
    this.server = restify.createServer();
    this.server.use(restify.plugins.bodyParser());

    const credsFactory = new ConfigurationServiceClientCredentialFactory({
      MicrosoftAppId: process.env.MicrosoftAppId!,
      MicrosoftAppPassword: process.env.MicrosoftAppPassword!,
      MicrosoftAppType: process.env.MicrosoftAppType!,
      MicrosoftAppTenantId: process.env.MicrosoftAppTenantId!,
    });

    const auth = createBotFrameworkAuthenticationFromConfiguration(
      null,
      credsFactory,
    );
    this.adapter = new CloudAdapter(auth);

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
      const port = process.env.PORT || 3978;
      this.server.listen(port, () => {
        console.log(`MsBotServerAdapter listening on port ${port}`);
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
