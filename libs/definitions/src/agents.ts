import { AgentApplication, TurnState } from '@microsoft/agents-hosting';
import { RouteDataTransfer, RouterResult } from './router';

export interface IAgent<TDataIn extends RouteDataTransfer = RouteDataTransfer> {
  handle<TDataOut extends RouteDataTransfer = RouteDataTransfer>(
    app: AgentApplication<TurnState>,
    data?: TDataIn,
  ): Promise<RouterResult<TDataOut>>;
}
