import { Construct } from "constructs"
import * as s3 from "aws-cdk-lib/aws-s3"
import { Stack } from "aws-cdk-lib";

export class ApiCodeDeployBucket extends Construct {
  public readonly bucket: s3.Bucket
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const region = Stack.of(this).region
    const account = Stack.of(this).account

    this.bucket = new s3.Bucket(this, 'ApiCodeDeployBucket', {
      bucketName: `api-code-deploy-bucket-${region}-${account}`,
    })
  }
}
