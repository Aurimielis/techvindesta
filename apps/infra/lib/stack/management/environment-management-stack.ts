import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { ServerlessFrameworkDeploymentRole } from "../../construct/iam/role/serverless-framework-deployment-role";

export class EnvironmentManagementStack extends cdk.Stack {
  public readonly apiServerlessDeploymentRole: ServerlessFrameworkDeploymentRole

  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    this.apiServerlessDeploymentRole = new ServerlessFrameworkDeploymentRole(this, "ApiServerlessDeploymentRole")
  }
}
