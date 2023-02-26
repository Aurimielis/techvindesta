import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { ServerlessFrameworkDeploymentRole } from "../../construct/iam/role/serverless-framework-deployment-role";

interface EnvironmentManagementStackProps extends cdk.StackProps {
  stage: string
}

export class EnvironmentManagementStack extends cdk.Stack {
  public readonly apiCloudformationDeploymentRole: ServerlessFrameworkDeploymentRole

  constructor(scope: Construct, id: string, props: EnvironmentManagementStackProps) {
    super(scope, id, props);

    this.apiCloudformationDeploymentRole = new ServerlessFrameworkDeploymentRole(this, "ApiServerlessDeploymentRole", {
      stage: props.stage
    })
  }
}
