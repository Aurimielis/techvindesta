import mysql from "mysql";
import { SecretsManagerService } from "./secrets-manager-service";
import { parseJson } from "nx/src/utils/json";

type credentialsConfig = {
  user: string;
  password: string;
  database: string;
  host: string;
  port: number;
}

export class DatabaseService {
  public client: mysql.Connection;

  private constructor(config: credentialsConfig) {
    // Initiate client connection
    this.client = mysql.createConnection(config)

    this.client.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.stack)
        return
      }
      console.log('connected as id ' + this.client.threadId)
    })
  }

  static async getService(): Promise<DatabaseService> {
    // Load credentials from env
    const {
      DATABASE_HOST,
      DATABASE_NAME,
      DATABASE_SECRET_NAME
    } = process.env

    // Initiate Secrets Manager service
    const secretsManager = new SecretsManagerService()

    // Get credentials from SSM
    const creds: {username: string, password: string} = await secretsManager.get(DATABASE_SECRET_NAME).then((res) => parseJson(res))

    const config: credentialsConfig = {
      database: DATABASE_NAME || 'techvindesta',
      host: DATABASE_HOST,
      password: creds.password,
      user: creds.username,
      port: 3306
    }

    return new DatabaseService(config)
  }
}
