import { DatabaseService } from "./database-service";
import { SecretsManagerService } from "./secrets-manager-service";
import { ParameterStoreService } from "./parameter-store-service";
import { LoggingService } from "./logging-service";

/**
 * Configuration service containing all services available in the API
 * following singleton pattern
 */
export class ServiceContainer {
  public readonly databaseService: DatabaseService;
  public readonly secretsManagerService: SecretsManagerService;
  public readonly parameterStoreService: ParameterStoreService;
  public readonly loggingService: LoggingService;

  private constructor(databaseService: DatabaseService) {
    this.secretsManagerService = new SecretsManagerService();
    this.parameterStoreService = new ParameterStoreService();
    this.loggingService = new LoggingService();
    this.databaseService = databaseService;
  }

  static async init(): Promise<ServiceContainer> {
    const databaseService = await DatabaseService.init();

    const configService = new ServiceContainer(databaseService);

    return configService;
  }
}
