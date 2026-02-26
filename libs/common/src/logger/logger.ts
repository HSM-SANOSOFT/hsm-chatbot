import pino, { Logger as PinoLogger } from 'pino';
import pretty from 'pino-pretty';
import { envs } from '../../../../src/config';

export class Logger {
  private readonly logger: PinoLogger;
  private readonly callerName: string;
  private readonly appName: string;
  private readonly level: pino.LevelWithSilent;
  constructor(
    params?:
      | string
      | {
          level?: pino.LevelWithSilent;
          appName?: string;
          callerName?: string;
        },
  ) {
    const isString = typeof params === 'string';
    const options = isString ? undefined : params;
    const callerName = isString ? params : options?.callerName;
    this.appName = options?.appName ?? envs.APP_NAME;
    this.callerName = callerName ?? '';
    this.level =
      options?.level ?? (envs.ENVIRONMENT === 'production' ? 'info' : 'debug');

    const stream = pretty({
      colorize: true,
      colorizeObjects: true,
      singleLine: false,
      sync: true,
      translateTime: 'SYS:standard',
      hideObject: true,
      ignore: 'hostname,time,level,pid,levelLabel',
      levelFirst: false,

      timestampKey: 'time',
      messageKey: 'msg',
      levelLabel: 'levelLabel',

      customColors: {
        message: 'reset',
      },

      messageFormat: (log, messageKey, levelLabel, { colors }) => {
        const pid = String(process.pid) || 'PID Place Holder';
        const time = log.time
          ? new Date(log.time as string | number).toLocaleString('en-US')
          : 'Time Place Holder';
        const level =
          String(log.level) || levelLabel.toUpperCase() || 'LEVEL PLACE HOLDER';
        const message = String(log[messageKey]) || 'Message Place Holder';

        const colorLevel = (level: string, s?: string) => {
          const numericLevel = Number(level);
          const levelName =
            pino.levels.labels[numericLevel] ??
            levelLabel?.toLowerCase?.() ??
            'unknown';

          const output = s || levelName.toUpperCase();
          switch (Number(level)) {
            case pino.levels.values.error:
            case pino.levels.values.fatal:
              return colors.red(output);

            case pino.levels.values.warn:
              return colors.yellow(output);

            case pino.levels.values.debug:
              return colors.magenta(output);

            case pino.levels.values.trace:
              return colors.cyan(output);

            case pino.levels.values.info:
            default:
              return colors.green(output);
          }
        };

        const coloredPid = colorLevel(level, pid);
        const coloredCtx = colors.yellow(`[${this.callerName}]`);
        const coloredTime = colors.white(time);
        const coloredLevel = colorLevel(level);
        const coloredMessage = colorLevel(level, message);
        const coloredAppName = colorLevel(level, `[${this.appName}]`);

        const logMessage = `${coloredAppName} ${coloredPid} - ${coloredTime}  ${coloredLevel} ${coloredCtx} ${coloredMessage}`;

        return logMessage;
      },
    });

    this.logger = pino(
      {
        level: this.level,
        timestamp: pino.stdTimeFunctions.isoTime,
      },
      stream,
    );
  }

  debug(message: string, meta?: Record<string, unknown>) {
    meta ? this.logger.debug(meta, message) : this.logger.debug(message);
  }
  info(message: string, meta?: Record<string, unknown>) {
    meta ? this.logger.info(meta, message) : this.logger.info(message);
  }
  warn(message: string, meta?: Record<string, unknown>) {
    meta ? this.logger.warn(meta, message) : this.logger.warn(message);
  }
  error(message: string, meta?: Record<string, unknown>) {
    meta ? this.logger.error(meta, message) : this.logger.error(message);
  }
}
