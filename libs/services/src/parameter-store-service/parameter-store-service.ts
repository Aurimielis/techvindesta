import AWS from 'aws-sdk'

export class ParameterStoreService {
  private ssm: AWS.SSM;
  private cache: { [key: string]: string } = {};

  constructor() {
    this.ssm = new AWS.SSM()
  }

  async get(key: string): Promise<string> {
    console.info(`Getting '${key}`)
    if (this.cache[key]) {
      return this.cache[key]!
    }

    const params = {
      Name: key,
      WithDecryption: true,
    };

    let data: AWS.SSM.GetParameterResult
    try {
      data = await this.ssm.getParameter(params).promise();
    } catch (e) {
      console.error('Error occurred while fetching from Parameter Store: ', e)
      return ''
    }

    if (typeof data.Parameter === 'undefined') {
      throw new Error(`Parameter ${key} not found`)
    }

    this.cache[key] = data.Parameter.Value!

    return data.Parameter.Value!
  }
}
