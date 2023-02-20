import mysql from "mysql";
import { SecretsManagerService } from "./secrets-manager-service";

export class DatabaseService {
  public client: mysql.Connection;

  constructor() {
    // Load credentials from env
    const { DATABASE_HOST, DATABASE_SECRET_NAME } = process.env

    // Initiate Secrets Manager service
    const secretsManager = new SecretsManagerService()

    // Get credentials from SSM
    const credentials = secretsManager.get(DATABASE_SECRET_NAME)
    // Initiate client connection
  }

}
