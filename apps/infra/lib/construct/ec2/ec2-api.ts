import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as iam from 'aws-cdk-lib/aws-iam'

interface Ec2ApiProps {
  allowSsh: boolean
  stage?: string
}

export class Ec2Api extends Construct {
  public readonly vpc: ec2.IVpc
  public readonly securityGroup: ec2.SecurityGroup
  public readonly instance: ec2.Instance

  private readonly keyName: string = 'techvindesta-ec2'

  constructor(
    scope: Construct,
    id: string,
    { allowSsh, stage }: Ec2ApiProps
  ) {
    super(scope, id);

    this.vpc = ec2.Vpc.fromLookup(this, 'Vpc', { isDefault: true })

    this.securityGroup = new ec2.SecurityGroup(this, 'Ec2ApiSecurityGroup', {
      vpc: this.vpc,
      securityGroupName: 'Ec2ApiSecurityGroup',
    })

    this.securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'allow HTTP access from the world'
    )

    if (allowSsh) {
      this.securityGroup.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(22),
        'allow SSH access from the world'
      )
    }

    const userData = ec2.UserData.forLinux()

    // Install nvm, node and git
    userData.addCommands(
      'exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1',
      'sudo yum update -y',
      'sudo yum install git -y',
      'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash',
      'chown -R ec2-user:ec2-user /.nvm',
      'cat <<EOF >> /home/ec2-user/.bashrc\nexport NVM_DIR=/.nvm\n[ -s \"/.nvm/nvm.sh\" ] && \. \"/.nvm/nvm.sh\"\nEOF',
    )

    const ssmRole = new iam.Role(this, 'SSMRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      roleName: `${stage}Ec2ApiSsmRole`,
    })

    ssmRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore')
    )

    this.instance = new ec2.Instance(this, 'Ec2Api', {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux(),
      vpc: this.vpc,
      keyName: this.keyName,
      userData,
      instanceName: `${stage}Ec2Api`,
      securityGroup: this.securityGroup,
    })
  }
}
