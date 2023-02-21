import mysql from "mysql";
import { SecretsManagerService } from "./secrets-manager-service";
import { parseJson } from "nx/src/utils/json";
import { ParameterStoreService } from "./parameter-store-service";

type credentialsConfig = {
  user: string;
  password: string;
  database: string;
  host: string;
  port: number;
}

const DATABASE_HOST_PATH = '/techvindesta/rds/host'
const DATABASE_NAME_PATH = '/techvindesta/rds/database'

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

  /**
   * Initiate database service with credentials from Secrets Manager and SSM Parameter Store
   * The function is invoked asynchronously and returns a promise
   * @return Promise<DatabaseService>
   */
  static async init(): Promise<DatabaseService> {
    // Load credentials from env
    const { DATABASE_SECRET_NAME } = process.env

    // Initiate services
    const secretsManager = new SecretsManagerService()
    const parameterStore = new ParameterStoreService()

    // Get credentials from SSM
    const creds: {username: string, password: string} = await secretsManager.get(DATABASE_SECRET_NAME)
      .then((res) => parseJson(res))

    // Get remaining details from Parameter Store
    const host = await parameterStore.get(DATABASE_HOST_PATH)
    const database = await parameterStore.get(DATABASE_NAME_PATH)

    console.log(host, database)

    const config: credentialsConfig = {
      database: database || 'techvindesta',
      host: host,
      password: creds.password,
      user: creds.username,
      port: 3306
    }

    return new DatabaseService(config)
  }
}
