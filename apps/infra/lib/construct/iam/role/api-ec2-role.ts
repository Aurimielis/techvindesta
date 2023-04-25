import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";

interface ApiEc2RoleProps {
  stage?: string
}

export class ApiEc2Role extends Construct {
  public readonly role: iam.IRole;

  constructor(scope: Construct, id: string, { stage }: ApiEc2RoleProps) {
    super(scope, id);

    this.role = new iam.Role(this, 'SSMRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      roleName: `${stage}ApiEc2Role`,
    })

    // SSM policies
    this.role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore')
    )

    // Code Deploy policies
    this.role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonEC2RoleForAWSCodeDeploy')
    )

    // Secrets Manager policies
    // TODO: Update this to get perms to fetch secrets of database when we have a construct for it
    const secret = new secretsmanager.Secret(this, 'Secret')
    secret.grantRead(this.role)
  }
}
