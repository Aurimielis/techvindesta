import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import { ApiCodeDeployBucket } from "../../construct/s3/api-code-deploy-bucket";

export class HidroAssetsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    new ApiCodeDeployBucket(this, 'ApiCodeDeployBucket')
  }
}
