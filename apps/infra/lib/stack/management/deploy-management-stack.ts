import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { CircleciDeployUser } from "../../construct/iam/user/circleci-deploy-user";

export class DeployManagementStack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new CircleciDeployUser(this, 'CircleCiDeployUser')
  }
}
