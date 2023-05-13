import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import { Effect } from "aws-cdk-lib/aws-iam";
import { CircleciDeployUser } from "../user/circleci-deploy-user";

export class CodeDeployDeploymentRole extends Construct {
  public static roleName: string = 'CodeDeployDeploymentRole'

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const role = new iam.Role(this, CodeDeployDeploymentRole.roleName, {
      assumedBy: iam.User.fromUserName(this, "CircleCiDeployUser", CircleciDeployUser.userName),
      roleName: CodeDeployDeploymentRole.roleName,
    })

    role.attachInlinePolicy(new iam.Policy(this, `${CodeDeployDeploymentRole.roleName}Policy`, {
      document: new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            sid: "S3Allow",
            actions: [
              "s3:Put*"
            ],
            resources: ["*"],
            effect: Effect.ALLOW
          })
        ]
      })
    }))
  }
}
