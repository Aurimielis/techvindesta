import {
  DatabaseService,
  SecretsManagerService,
  ParameterStoreService,
  LoggingService
} from "@techvindesta/services";

/**
 * Configuration service containing all services available in the API
 * following singleton pattern
 */
export class ServiceContainer {
  public readonly loggingService: LoggingService;
  public readonly databaseService: DatabaseService;
  public readonly secretsManagerService: SecretsManagerService;
  public readonly parameterStoreService: ParameterStoreService;

  private constructor(databaseService: DatabaseService) {
    this.secretsManagerService = new SecretsManagerService();
    this.parameterStoreService = new ParameterStoreService();
    this.loggingService = new LoggingService();
    this.databaseService = databaseService;
  }

  static async init(): Promise<ServiceContainer> {
    const logger = new LoggingService();
    const databaseService = await DatabaseService.init(logger);

    return new ServiceContainer(databaseService);
  }
}
