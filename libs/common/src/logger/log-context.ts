export function logContext<T>(context: T) {
  const logger = console;
  try {
    logger.debug(JSON.stringify(context));
  } catch (error) {
    logger.error(`Could not stringify context: ${error}`);
  }
}
