import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

interface HidroVpcStackProps extends cdk.StackProps {
  vpcCidr: string;
}

export class HidroVpcStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;
  public readonly securityGroup: ec2.SecurityGroup;

  public static readonly subnetNamePublic = 'HidroPublic';
  public static readonly subnetNameData = 'HidroData';
  public static readonly subnetNameApp = 'HidroApp';

  constructor(scope: Construct, id: string, props: HidroVpcStackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, 'HidroVpc', {
      ipAddresses: ec2.IpAddresses.cidr(props.vpcCidr),
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          name: HidroVpcStack.subnetNamePublic,
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: HidroVpcStack.subnetNameData,
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
        {
          name: HidroVpcStack.subnetNameApp,
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
          cidrMask: 24,
        }
      ]
    });
  }
}
