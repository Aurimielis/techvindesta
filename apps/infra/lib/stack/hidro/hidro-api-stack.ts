import * as cdk from 'aws-cdk-lib';
import * as route53 from 'aws-cdk-lib/aws-route53';
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

    // Register domain for the ec2 instance
    // Load in hosted zone
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'techvindesta.com',
      privateZone: false
    })

    // Create record
    new route53.ARecord(this, 'Ec2ApiARecord', {
      zone: hostedZone,
      target: route53.RecordTarget.fromIpAddresses(apiEc2.instance.instancePublicIp),
      recordName: `api.techvindesta.com`,
    })

    const codeDeployRole = new CodeDeployRole(this, 'CodeDeployRole')

    new ApiCodeDeploy(this, 'ApiCodeDeploy', {
      ec2Name: apiEc2.name,
      stage: props.stageName,
      serviceRole: codeDeployRole.role
    })
  }
}
