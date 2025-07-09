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
  private ctx!: TurnContext;
  private adapter: CloudAdapter;

  constructor() {
    this.server = restify.createServer();
    this.server.use(restify.plugins.bodyParser());

    const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
      MicrosoftAppId: process.env.MicrosoftAppId,
      MicrosoftAppPassword: process.env.MicrosoftAppPassword,
      MicrosoftAppType: process.env.MicrosoftAppType,
      MicrosoftAppTenantId: process.env.MicrosoftAppTenantId,
    });

    const botFrameworkAuthentication =
      createBotFrameworkAuthenticationFromConfiguration(
        null,
        credentialsFactory,
      );

    this.adapter = new CloudAdapter(botFrameworkAuthentication);
  }

  async start(): Promise<void> {
    this.adapter.onTurnError = async (context, error) => {
      console.error(`[onTurnError] unhandled error: ${error}`);
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

    this.server.listen(process.env.port || process.env.PORT || 3978, () => {
      console.log(`${this.server.name} listening to ${this.server.url}`);
    });
  }

  stop(): void {
    this.server.close(() => console.log('Bot server stopped'));
  }

  async restart(): Promise<void> {
    this.stop();
    await this.start();
  }

  async onRequest<T = TurnContext>(): Promise<T> {
    const ctxPromise = new Promise<T>(resolve => {
      this.server.post('/api/messages', async (req, res) => {
        await this.adapter.process(req, res, async context => {
          this.ctx = context;
          resolve(context as T);
        });
      });
    });

    return ctxPromise;
  }
}
