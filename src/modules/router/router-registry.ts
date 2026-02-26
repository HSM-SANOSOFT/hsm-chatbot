import { RouterRegistry } from '@hsm-chatbot-lib/definitions';
import { AgentsRepository, EndAgent, WelcomeAgent } from '../agents';

export const RoutesAgentRegistry: RouterRegistry = {
  [AgentsRepository.WELCOME]: new WelcomeAgent(),
  [AgentsRepository.END]: new EndAgent(),
} as const satisfies RouterRegistry;
