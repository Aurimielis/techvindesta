import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { CircleciDeployUser } from "../../construct/iam/user/circleci-deploy-user";
import { CodeDeployDeploymentRole } from "../../construct/iam/role/code-deploy-deployment-role";

export class DeployManagementStack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new CircleciDeployUser(this, 'CircleCiDeployUser')

    new CodeDeployDeploymentRole(this, 'CDDeploymentRole')
  }
}
