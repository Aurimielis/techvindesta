import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";

export class CodeDeployRole extends Construct {
  public readonly role: iam.IRole

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.role = new iam.Role(this, 'CodeDeployServiceRole', {
      assumedBy: new iam.ServicePrincipal('codedeploy.amazonaws.com'),
      roleName: 'CodeDeployServiceRole',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSCodeDeployRole')
      ]
    })
  }
}
