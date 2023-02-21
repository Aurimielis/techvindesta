import { DatabaseService } from "./database-service";
import { SecretsManagerService } from "./secrets-manager-service";

export class ConfigurationService {
  public databaseService: DatabaseService;
  private ssmService: SecretsManagerService;

  private constructor(databaseService: DatabaseService) {
    this.ssmService = new SecretsManagerService();
    this.databaseService = databaseService;
  }

  static async getService(): Promise<ConfigurationService> {
    const databaseService = await DatabaseService.getService();
    const configService = new ConfigurationService(databaseService);
    return configService;
  }
}
