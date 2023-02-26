import { PrincipalBase } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";

interface EnvironmentDeploymentRoleProps {
  assumedBy: PrincipalBase;

  /**
   * Eg "Production", "Staging", "Development"
   */
  stage: string;
  policyDocument: iam.PolicyDocument;

  /**
   * Eg "Api". "Role", "Policy" and stage will be appended to this
   */
  name: string;
}

/**
 * Construct holding deployment Roles for specific environments
 */
export class EnvDeployRole extends Construct {
  public static readonly roleName = "DeploymentRole";
  public static readonly policyName = "DeploymentPolicy";

  public readonly role: iam.Role;
  public readonly policy: iam.Policy;

  constructor(
    scope: Construct,
    id: string,
    { assumedBy, stage, name, policyDocument }: EnvironmentDeploymentRoleProps
  ) {
    super(scope, id);

    this.role = new iam.Role(this, "DeploymentRole", {
      roleName: `${stage}${name}${EnvDeployRole.roleName}}`,
      assumedBy,
    });

    this.policy = new iam.Policy(this, "DeploymentPolicy", {
      policyName: `${stage}${name}${EnvDeployRole.policyName}`,
      document: policyDocument,
    });

    this.policy.attachToRole(this.role);
  }
}
