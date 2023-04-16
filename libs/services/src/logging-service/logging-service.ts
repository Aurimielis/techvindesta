import winston from "winston";

/**
 * Service for logging messages with varying importance
 */
export class LoggingService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.json(),
      defaultMeta: { service: 'hidro-controllers' },
      transports: [
        new winston.transports.Console(),
      ],
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
      }
    });
  }

  public getLogger(): winston.Logger {
    return this.logger;
  }
}
