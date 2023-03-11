import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HidroApiStack } from "../stack/hidro/hidro-api-stack";

/**
 * This is Hidro Stage
 * This is responsible for creating all Hidro related resources like database, lambda, etc.
 */
export class HidroStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props: cdk.StageProps) {
    super(scope, id, props);

    new HidroApiStack(this, 'HidroApiStack', {
      stageName: props.stageName,
    })
  }
}
