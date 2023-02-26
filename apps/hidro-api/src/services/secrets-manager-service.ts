import AWS from "aws-sdk";


/**
 * Service for retrieving secrets from AWS SSM service
 */
export class SecretsManagerService {
  private client: AWS.SecretsManager
  private readonly cache: Map<string, string>

  constructor() {
    this.client = new AWS.SecretsManager({})
    this.cache = new Map<string, string>()
  }

  /**
   * Get secret with provided id and name
   * @param name of the secret as appears in the dashboard
   */
  public async get(name: string): Promise<string> {
    if (this.cache.has(name)) {
      return this.cache.get(name)
    }

    let response: any

    try {
      response = await this.client.getSecretValue(
        {
          SecretId: name,
          VersionStage: 'AWSCURRENT',
        }
      ).promise()
    } catch (e) {
      console.error(e)
      return ''
    }

    if (typeof response.SecretString === 'undefined') {
      console.error('SecretString is undefined')
      return ''
    }

    this.cache[name] = response.SecretString

    return this.cache[name]
  }
}
