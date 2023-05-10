import * as iam from "aws-cdk-lib/aws-iam";
import { Effect } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { Stack } from "aws-cdk-lib";

export class CircleciDeployUser extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const accountId: string = Stack.of(this).account

    const user = new iam.User(this, "CircleCiUser", {
      userName: "CircleCI"
    })

    user.attachInlinePolicy(new iam.Policy(this, 'circleci-deploy-policies', {
      statements: [new iam.PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["sts:AssumeRole"],
        resources: [`arn:aws:iam::${accountId}:role/*`],
      })]
    }))
  }
}
