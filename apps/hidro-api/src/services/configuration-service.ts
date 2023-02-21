import { DatabaseService } from "./database-service";
import { SecretsManagerService } from "./secrets-manager-service";
import { ParameterStoreService } from "./parameter-store-service";

/**
 * Configuration service containing all services available in the API
 * following singleton pattern
 */
export class ConfigurationService {
  public readonly databaseService: DatabaseService;
  public readonly secretsManagerService: SecretsManagerService;
  public readonly parameterStoreService: ParameterStoreService;

  private constructor(databaseService: DatabaseService) {
    this.secretsManagerService = new SecretsManagerService();
    this.parameterStoreService = new ParameterStoreService();
    this.databaseService = databaseService;
  }

  static async init(): Promise<ConfigurationService> {
    const databaseService = await DatabaseService.init();

    const configService = new ConfigurationService(databaseService);

    return configService;
  }
}
