import { Construct } from "constructs";
import * as iam from 'aws-cdk-lib/aws-iam';

interface EnvDeployRoleProps {
  /**
   * List of role arns that user can assume
   */
  assumableArns: string[];

  /**
   * User name, can be name of the service or application it will be responsible for deploying
   */
  name: string;
}

export class EnvDeployUser extends Construct {
  public static readonly nameAppendix = "DeployUser";
  public readonly user: iam.User;

  constructor(scope: Construct, id: string, props: EnvDeployRoleProps) {
    super(scope, id);

    const { assumableArns, name } = props;

    this.user = new iam.User(this, "DeployUser", {
      userName: `${name}${EnvDeployUser.nameAppendix}`,
    });

    this.user.attachInlinePolicy(new iam.Policy(this, "DeployUserPolicy", {
      statements: [
        new iam.PolicyStatement({
          actions: ["sts:AssumeRole"],
          resources: assumableArns,
        }),
      ],
    }));
  }
}
