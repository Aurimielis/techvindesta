import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";

interface HidroSecurityGroupsProps {
  vpc: ec2.IVpc;
}

export class HidroSecurityGroups extends Construct {
  /**
   * The security group used by the RDS Cluster
   */
  public readonly databaseSecurityGroup: ec2.SecurityGroup;

  /**
   * The security group used by the Fargate App ECS Cluster
   */
  public readonly appSecurityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props: HidroSecurityGroupsProps) {
    super(scope, id);
    const { vpc } = props

    this.appSecurityGroup = new ec2.SecurityGroup(this, "AppSecurityGroup", {
      vpc,
      description: "App subnet security group",
    });

    this.databaseSecurityGroup = new ec2.SecurityGroup(
      this,
      "DatabaseSecurityGroup",
      {
        vpc,
        description: "Database subnet security group",
      }
    );

    // App -> Database
    this.databaseSecurityGroup.addIngressRule(
      ec2.Peer.securityGroupId(this.appSecurityGroup.securityGroupId),
      ec2.Port.tcp(3306)
    )
  }
}
