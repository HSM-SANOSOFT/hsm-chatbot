/*
import type { TurnContext } from 'botbuilder';

import type {
  BotFrameworkInterface,
  ContextInterface,
  SdkInterface,
  ServerInterface,
} from '../../../core/interfaces';
import { MsBotContextAdapter } from './botContext.adapter';
import { MsBotSDKAdapter } from './botSDK.adapter';

export class MsBotFrameworkAdapter implements BotFrameworkInterface {
  private ctx: TurnContext;
  constructor(public server: ServerInterface) {
    this.ctx = this.server.start();
  }
  async init(): Promise<{ ctx: ContextInterface; sdk: SdkInterface }> {
    const ctx = new MsBotContextAdapter(this.ctx);
    const sdk = new MsBotSDKAdapter(ctx);
    return Promise.resolve({
      ctx: ctx,
      sdk: sdk,
    });
  }
}
*/
