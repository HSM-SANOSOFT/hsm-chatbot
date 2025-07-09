import { MsBotServerAdapter } from './adapters/botframework/microsoft/botServer.adapter';
import {
  BotFrameworkService,
  BotService,
  ServerService,
} from './core/services';

const server = new ServerService([new MsBotServerAdapter()]);
const frameworks = new BotFrameworkService(servers);
const bot = new BotService(frameworks);

while (true) {
  bot.run();
}
