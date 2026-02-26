import { Logger } from '@hsm-chatbot-lib/common/logger';
import { AgentApplication, TurnState } from '@microsoft/agents-hosting';
import { IAgent } from './agents';

export type RouteDataTransfer = Record<string, unknown>;

export enum RouterAction {
  NEXT,
  PREVIOUS,
  WAIT,
  END,
  RESET,
}

export type RouterState = {
  currentAgentId: number;
};

export const RouterStateKey = 'routerState';

export type RouterRegistry = Record<number, IAgent>;

export type RouterTarget<TData extends RouteDataTransfer = RouteDataTransfer> =
  {
    agentId: number;
    data?: TData;
  };

export type RouterResult<TData extends RouteDataTransfer = RouteDataTransfer> =
  {
    action: RouterAction;
    target: RouterTarget<TData>;
  };

export interface IRouter {
  readonly registry: RouterRegistry;
  readonly maxHops: number;
  readonly logger: Logger;
  readonly initialAgentId: number;
  app: AgentApplication<TurnState>;

  run(): void;

  handler(state: TurnState): Promise<void>;
}
