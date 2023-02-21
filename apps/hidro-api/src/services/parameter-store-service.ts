import AWS from 'aws-sdk'

export class ParameterStoreService {
  private ssm: AWS.SSM;
  private cache: { [key: string]: string } = {};

  constructor() {
    this.ssm = new AWS.SSM();
  }

  async get(key: string): Promise<string> {
    if (this.cache[key]) {
      return this.cache[key];
    }

    const params = {
      Name: key,
      WithDecryption: true,
    };

    const data = await this.ssm.getParameter(params).promise();
    this.cache[key] = data.Parameter.Value;
    return data.Parameter.Value;
  }
}
