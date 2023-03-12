import { Construct } from "constructs"
import * as CodeDeploy from "aws-cdk-lib/aws-codedeploy"
import * as iam from "aws-cdk-lib/aws-iam"

interface ApiCodeDeployProps {
  ec2Name: string
  stage?: string
  serviceRole: iam.IRole
}

export class ApiCodeDeploy extends Construct {
  public readonly application: CodeDeploy.ServerApplication
  public readonly deploymentGroup: CodeDeploy.ServerDeploymentGroup

  constructor(scope: Construct, id: string, { ec2Name, stage, serviceRole }: ApiCodeDeployProps) {
    super(scope, id)

    this.application = new CodeDeploy.ServerApplication(this, 'ApiApplication', {
      applicationName: `ApiApplication`
    })

    this.deploymentGroup = new CodeDeploy.ServerDeploymentGroup(this, 'ApiDeploymentGroup', {
      application: this.application,
      deploymentGroupName: `${stage}ApiDeploymentGroup`,
      deploymentConfig: CodeDeploy.ServerDeploymentConfig.ONE_AT_A_TIME,
      ec2InstanceTags: new CodeDeploy.InstanceTagSet({
        'name': [ec2Name]
      }),
      role: serviceRole
    })
  }

}
