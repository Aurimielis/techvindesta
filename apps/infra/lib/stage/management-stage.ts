import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { EnvironmentManagementStack } from "../stack/management/environment-management-stack";

interface ManagementStageProps extends cdk.StageProps {
  stageName: string
}

export class ManagementStage extends cdk.Stage {
  public readonly production: EnvironmentManagementStack

  constructor(scope: Construct, id: string, props: ManagementStageProps) {
    super(scope, id, props);

    this.production = new EnvironmentManagementStack(this, "ProductionManagementStack", {
      env: props.env,
      stage: props.stageName
    })
  }
}
