import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";


/**
 * Service for retrieving secrets from AWS SSM service
 */
export class SecretsManagerService {
  private client: SecretsManagerClient
  private readonly cache: Map<string, string>

  constructor() {
    this.client = new SecretsManagerClient({})
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
      response = await this.client.send(
        new GetSecretValueCommand({
          SecretId: name,
          VersionStage: 'AWSCURRENT',
        })
      )

    } catch (e) {
      console.error(e)
      return ''
    }

    if (typeof response.SecretString === 'undefined') {
      console.error('SecretString is undefined')
      return ''
    }

    this.cache[name] = response.SecretString

    return response.SecretString
  }
}
