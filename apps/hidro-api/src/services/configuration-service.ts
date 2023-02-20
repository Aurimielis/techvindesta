import { DatabaseService } from "./database-service";
import { SecretsManagerService } from "./secrets-manager-service";

export class ConfigurationService {
  public databaseService: DatabaseService;
  private ssmService: SecretsManagerService;

  constructor() {
    this.databaseService = new DatabaseService();
    this.ssmService = new SecretsManagerService();

    this.ssmService.get(process.env.DATABASE_SECRET_NAME)
  }
}
