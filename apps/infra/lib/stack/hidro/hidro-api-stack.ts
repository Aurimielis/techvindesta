import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiEc2 } from "../../construct/ec2/api-ec2";
import { CodeDeployRole } from "../../construct/iam/role/code-deploy-role";
import { ApiCodeDeploy } from "../../construct/code-deploy/api-code-deploy";

interface HidroApiStackProps extends cdk.StackProps {
  stageName?: string
}

export class HidroApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: HidroApiStackProps) {
    super(scope, id, props);

    const apiEc2 = new ApiEc2(this, 'Ec2ApiInstance', {
      allowSsh: true,
      stage: props.stageName,
    })

    const codeDeployRole = new CodeDeployRole(this, 'CodeDeployRole')

    new ApiCodeDeploy(this, 'ApiCodeDeploy', {
      ec2Name: apiEc2.name,
      stage: props.stageName,
      serviceRole: codeDeployRole.role
    })
  }
}
