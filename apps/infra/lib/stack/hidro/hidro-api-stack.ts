import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Ec2Api } from "../../construct/ec2/ec2-api";

interface HidroApiStackProps extends cdk.StackProps {
  stageName?: string
}

export class HidroApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: HidroApiStackProps) {
    super(scope, id, props);

    new Ec2Api(this, 'Ec2ApiInstance', {
      allowSsh: true,
      stage: props.stageName,
    })
  }
}
