import { Environment } from "aws-cdk-lib"

export interface IAccount extends Environment {
  defaultStage: string
}

export class Accounts {
  public static readonly production: IAccount = {
    account: "261683817353",
    region: "eu-west-1",
    defaultStage: "production",
  }
}
