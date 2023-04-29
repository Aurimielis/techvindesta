import mysql from "mysql";
import { SecretsManagerService } from "../secrets-manager-service/secrets-manager-service";
import { ParameterStoreService } from "../parameter-store-service/parameter-store-service";
import { LoggingService } from "../logging-service/logging-service";
import winston from "winston";
import { HttpStatusCode } from "axios";

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
    const creds: {username: string, password: string} = await secretsManager.get(DATABASE_SECRET_NAME ?? '')
      .then((res) => JSON.parse(res))

    console.log('fetching stuff from param store')
    // Get remaining details from Parameter Store
    const host = await parameterStore.get(DATABASE_HOST_PATH)
    const database = await parameterStore.get(DATABASE_NAME_PATH)
    console.log('Done fetching host and database from Parameter Store')

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
      const query = `SELECT value1, value2, DATE_FORMAT(reading_time, "%Y-%m-%d %H:%i") as reading_time FROM ${name} ORDER BY reading_time DESC LIMIT 10`

      // Connect to database
      this.pool.getConnection((err, connection) => {
        // Handle connection error
        if (err) {
          this.logger.error(`error in getData while connecting: ${err}`)

          reject({
            statusCode: HttpStatusCode.InternalServerError,
            body: "An error occurred while connecting to the database"
          })
        }

        this.logger.info(`Database connection state: ${connection.state}`)

        // Run query
        connection.query(query, (err, results) => {
          // Return results otherwise
          resolve({
            statusCode: HttpStatusCode.Ok,
            body: JSON.stringify(results),
          })

          connection.release()

          // Handle query error if any
          if (err) {
            this.logger.error(`error in getData while querying: ${err}`)

            reject({
              statusCode: HttpStatusCode.NotFound,
              body: "Table does not exist",
            })
          }
        })
      })
    })
  }

  /**
   * Stores sensor data in selected table
   *
   * @param name
   * @param values
   */
  public async storeSensorData(name: string, values: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ${name} (value1, value2, value3) VALUES (${values[0]}, ${values[1]}, ${values[2]})`

      // Connect to database
      this.pool.getConnection((err, connection) => {
        // Handle connection error
        if (err) {
          this.logger.error(`error in createHeData while connecting: ${err}`)

          reject({
            statusCode: HttpStatusCode.InternalServerError,
            body: "An error occurred while connecting to the database"
          })
        }

        connection.query(query, (err, results) => {
          // Return results otherwise
          resolve({
            statusCode: HttpStatusCode.Ok,
            body: JSON.stringify(results)
          })

          connection.release()

          // Handle query error if any
          if (err) {
            this.logger.error(`error in createHeData while querying: ${err}`)

            reject({
              statusCode: HttpStatusCode.NotFound,
              body: "Table does not exist"
            })
          }
        })
      })
    })
  }
}
