import { RouterState, RouterStateKey } from '@hsm-chatbot-lib/definitions';
import { TurnState } from '@microsoft/agents-hosting';

export function setRouterState(state: TurnState, routerState: RouterState) {
  state[RouterStateKey] = routerState;
}

export function getRouterState(state: TurnState): RouterState {
  return state[RouterStateKey] as RouterState;
}
