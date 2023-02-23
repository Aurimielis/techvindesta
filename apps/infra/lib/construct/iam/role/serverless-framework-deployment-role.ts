import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";

interface ServerlessFrameworkDeploymentRoleProps {
  stage: string
}

export class ServerlessFrameworkDeploymentRole extends Construct {
  public static readonly roleName: string = "ServerlessFrameworkDeploymentRole"
  public readonly role: iam.Role

  constructor(scope: Construct, id: string, props: ServerlessFrameworkDeploymentRoleProps) {
    super(scope, id);

    const { stage } = props

    this.role = new iam.Role(this, "ServerlessFrameworkDeploymentRole", {
      assumedBy: new iam.ServicePrincipal("cloudformation.amazonaws.com"),
      roleName: `${stage}ServerlessFrameworkDeploymentRole`
    })
  }
}
