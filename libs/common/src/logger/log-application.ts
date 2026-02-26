import util from 'node:util';
import { Logger } from './logger';

export function logApp<TContext, TState>(context: TContext, state: TState) {
  const logger = new Logger('logApp');
  let contextString = 'Context String';
  let stateString = 'State String';
  try {
    contextString = util.inspect(context, { depth: 6, colors: true });
  } catch (error) {
    logger.error(`Could not stringify context: ${error}`);
  }
  try {
    stateString = util.inspect(state, { depth: 6, colors: true });
  } catch (error) {
    logger.error(`Could not stringify state: ${error}`);
  }
  logger.debug(`Context: ${contextString}, State: ${stateString}`);
}
