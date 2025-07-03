import type { TurnContext } from 'botbuilder';
import { ActivityHandler } from 'botbuilder';

import type {
  ContextInterface,
  HandlerInterface,
  SdkInterface,
} from '../../../core/interfaces';
import { BotContextAdapter } from './botContext.adapter';
import { BotSDKAdapter } from './botSDK.adapter';

export class BotHandlerAdapter
  extends ActivityHandler
  implements HandlerInterface
{
  public messageHandler: Required<HandlerInterface>['messageHandler'];
  public memberHandler: Required<HandlerInterface>['memberHandler'];

  constructor(handler: HandlerInterface) {
    super();

    this.messageHandler = handler.messageHandler;
    this.memberHandler = handler.memberHandler;

    this.onMessage(async (turnCtx: TurnContext, next) => {
      const ctx: ContextInterface = new BotContextAdapter(turnCtx);
      const sdk: SdkInterface = new BotSDKAdapter(turnCtx);

      await this.messageHandler.onMessageReceived(ctx, sdk);

      if (this.messageHandler.onMessageSent) {
        await this.messageHandler.onMessageSent(ctx, sdk);
      }

      await next();
    });

    this.onMembersAdded(async (turnCtx: TurnContext, next) => {
      const ctx: ContextInterface = new BotContextAdapter(turnCtx);
      const sdk: SdkInterface = new BotSDKAdapter(turnCtx);

      await this.memberHandler.onMemberAdded(ctx, sdk);

      if (this.memberHandler.onMemberRemoved) {
        await this.memberHandler.onMemberRemoved(ctx, sdk);
      }

      await next();
    });
  }
}
