import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { EnvironmentManagementStack } from "../stack/management/environment-management-stack";
import { DeployManagementStack } from "../stack/management/deploy-management-stack";

interface ManagementStageProps extends cdk.StageProps {
  stageName: string
}

export class ManagementStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props: ManagementStageProps) {
    super(scope, id, props);

    // Environment-specific
    new EnvironmentManagementStack(this, "ProductionManagementStack", {
      env: props.env,
      stage: props.stageName
    })

    new DeployManagementStack(this, "DeployManagementStack")
  }
}
