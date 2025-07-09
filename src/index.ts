// src/index.ts

import type { TurnContext } from 'botbuilder';

import { MsBotServerAdapter } from './adapters/botframework/microsoft/botServer.adapter';
import { ServerService } from './core/services';

async function main() {
  // Compose your HTTP server adapter(s)
  const server = new ServerService([new MsBotServerAdapter()]);

  // Start listening
  await server.start();
  console.log('Server is listening for incoming activities...');

  // Loop forever, logging each incoming TurnContext

  while (true) {
    const ctx = await server.onRequest<TurnContext>();
    console.log('Received context:', ctx);
  }
}

main().catch(err => {
  console.error('Fatal error in main loop:', err);
  process.exit(1);
});
