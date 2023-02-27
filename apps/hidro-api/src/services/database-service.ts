import mysql from "mysql";
import { SecretsManagerService } from "./secrets-manager-service";
import { parseJson } from "nx/src/utils/json";
import { ParameterStoreService } from "./parameter-store-service";
import { LoggingService } from "./logging-service";
import winston from "winston";

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
  public readonly pool: mysql.Pool;
  private logger: winston.Logger

  private constructor(logger: LoggingService, config: credentialsConfig) {
    // Initiate client connection
    this.logger = logger.getLogger()
    this.pool = mysql.createPool(config)
  }

  /**
   * Initiate database service with credentials from Secrets Manager and SSM Parameter Store
   * The function is invoked asynchronously and returns a promise
   *
   * @return Promise<DatabaseService>
   */
  static async init(logger: LoggingService): Promise<DatabaseService> {
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

    const config: credentialsConfig = {
      database: database || 'techvindesta',
      host: host,
      password: creds.password,
      user: creds.username,
      port: 3306
    }

    return new DatabaseService(logger, config)
  }

  /**
   * Gets all data from selected table
   * @param name
   */
  public async getData(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${name}`

      // Get connection from the pool
      this.pool.getConnection((err, connection) => {
        // Handle connection error
        if (err) {
          this.logger.error(`error in getData while connecting: ${err}`)
          reject({
            statusCode: 500,
            body: err.message
          })
        }

        // Run query
        connection.query(query, (err, results) => {
          // Release connection back to the pool
          connection.release()

          // Handle query error if any
          if (err) {
            this.logger.error(`error in getData while querying: ${err}`)
            reject({
              statusCode: 500,
              body: err.message
            })
          }

          // Return results otherwise
          resolve({
            statusCode: 200,
            body: JSON.stringify(results)
          })
        })
      })
    })
  }
}
