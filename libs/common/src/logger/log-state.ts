export function logState<T>(state: T) {
  const logger = console;
  try {
    logger.debug(JSON.stringify(state));
  } catch (error) {
    logger.error(`Could not stringify state: ${error}`);
  }
}
