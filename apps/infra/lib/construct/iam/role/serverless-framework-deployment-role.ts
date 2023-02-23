import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";

export class ServerlessFrameworkDeploymentRole extends Construct {
  public readonly role: iam.Role

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.role = new iam.Role(this, "ServerlessFrameworkDeploymentRole", {
      assumedBy: new iam.ServicePrincipal("cloudformation.amazonaws.com"),
      roleName: "ServerlessFrameworkDeploymentRole"
    })
  }
}
