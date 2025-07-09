import type { TurnContext } from 'botbuilder';

import { MsBotContextAdapter } from './adapters/botframework/microsoft/botContext.adapter';
import { MsBotServerAdapter } from './adapters/botframework/microsoft/botServer.adapter';

async function main() {
  const server = new MsBotServerAdapter();
  await server.start();
  console.log('Server listening — send messages via the Emulator');

  // never-ending loop: handle one activity at a time

  while (true) {
    const rawCtx: TurnContext = await server.onRequest();
    const ctxAdapter = new MsBotContextAdapter(rawCtx);

    // grab the incoming text
    const incoming = ctxAdapter.activity.getText();
    console.log('Received:', incoming);

    // echo it back
    await ctxAdapter.sendActivity(`You said: ${incoming}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
