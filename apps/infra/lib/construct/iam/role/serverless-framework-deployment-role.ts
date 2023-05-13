import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import { Stack } from "aws-cdk-lib";
import { CircleciDeployUser } from "../user/circleci-deploy-user";

export const ServerlessApiProjectName: string = "hidro-api"

interface ServerlessFrameworkDeploymentRoleProps {
  stage: string
}

export class ServerlessFrameworkDeploymentRole extends Construct {
  public static readonly deployRoleName: string = "ServerlessFrameworkDeploymentRole"
  public static readonly executionRoleName: string = "ServerlessFrameworkExecutionRole"

  constructor(scope: Construct, id: string, props: ServerlessFrameworkDeploymentRoleProps) {
    super(scope, id);

    const { stage } = props


    // Create deployment role
    const deployRole = new iam.Role(this, ServerlessFrameworkDeploymentRole.deployRoleName, {
      assumedBy: new iam.CompositePrincipal(
        iam.User.fromUserName(this, "CircleCiDeployUser", CircleciDeployUser.userName),
        new iam.ServicePrincipal("cloudformation.amazonaws.com")
      ),
      roleName: `${stage}${ServerlessFrameworkDeploymentRole.deployRoleName}`,
    })

    // Create execution role
    const executionRole = new iam.Role(this, ServerlessFrameworkDeploymentRole.executionRoleName, {
      assumedBy: new iam.ServicePrincipal("cloudformation.amazonaws.com"),
      roleName: `${stage}${ServerlessFrameworkDeploymentRole.executionRoleName}`,
    })

    executionRole.attachInlinePolicy(this.getExecutionPolicyDocument());
    deployRole.attachInlinePolicy(this.getDeploymentPolicyDocument(executionRole.roleArn));
  }

  /**
   * Return iam.Policy for Serverless Execution Role
   */
  public getExecutionPolicyDocument(): iam.Policy {
    const currentStack = Stack.of(this)

    const allowPassRole = new iam.PolicyStatement({
      sid: "CFDeployLambdaExecutionRoles",
      actions: [
        "iam:Get*",
        "iam:List*",
        "iam:PassRole",
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:AttachRolePolicy",
        "iam:DeleteRolePolicy",
        "iam:PutRolePolicy",
        "iam:TagRole",
        "iam:UntagRole",
      ],
      resources: [`arn:aws:iam::${currentStack.account}:role/${ServerlessApiProjectName}-*`],
    });

    const allowCloudFormation = new iam.PolicyStatement({
      sid: "CFAllowCloudFormationForServerlessFramework",
      actions: [
        "cloudformation:Describe*",
        "cloudformation:List*",
        "cloudformation:Get*",
        "cloudformation:PreviewStackUpdate",
        "cloudformation:CreateStack",
        "cloudformation:UpdateStack",
      ],

      resources: [
        `arn:aws:cloudformation:${currentStack.region}:${currentStack.account}:stack/${ServerlessApiProjectName}*`,
      ],
    });

    const allowCFValidation = new iam.PolicyStatement({
      sid: "CFAllowCFValidation",
      actions: ["cloudformation:ValidateTemplate"],
      resources: ["*"],
    });

    const allowS3FullAccessForProject = new iam.PolicyStatement({
      sid: "CFAllowS3FullAccessForProjectBucket",
      actions: ["s3:*"],
      resources: [
        `arn:aws:s3:::${ServerlessApiProjectName}*`,
        `arn:aws:s3:::${ServerlessApiProjectName}*/*`,
      ],
    });

    const allowS3BucketCreate = new iam.PolicyStatement({
      sid: "CFAllowS3BucketCreate",
      actions: ["s3:ListAllMyBuckets", "s3:CreateBucket"],
      resources: ["*"],
    });

    const allowApiGateway = new iam.PolicyStatement({
      sid: "CFAllowApiGateway",
      actions: [
        "apigateway:GET",
        "apigateway:POST",
        "apigateway:PUT",
        "apigateway:PATCH",
        "apigateway:DELETE",
        "apigateway:TagResource",
        "apigateway:UntagResource",
      ],
      resources: [
        `arn:aws:apigateway:${currentStack.region}::/restapis`,
        `arn:aws:apigateway:${currentStack.region}::/restapis/*`,
        `arn:aws:apigateway:${currentStack.region}::/tags`,
        `arn:aws:apigateway:${currentStack.region}::/tags/*`,
        `arn:aws:apigateway:${currentStack.region}::/apis`,
        `arn:aws:apigateway:${currentStack.region}::/apis/*`,
      ],
    });

    const allowLambdaLogGroup = new iam.PolicyStatement({
      sid: "CFAllowLogGroup",
      actions: [
        "logs:CreateLogGroup",
        "logs:Get*",
        "logs:Describe*",
        "logs:List*",
        "logs:DeleteLogGroup",
        "logs:PutResourcePolicy",
        "logs:DeleteResourcePolicy",
        "logs:PutRetentionPolicy",
        "logs:DeleteRetentionPolicy",
        "logs:TagLogGroup",
        "logs:UntagLogGroup",
      ],
      resources: [
        `arn:aws:logs:${currentStack.region}:${currentStack.account}:log-group:/aws/lambda/${ServerlessApiProjectName}*:log-stream:*`,
        `arn:aws:logs:${currentStack.region}:${currentStack.account}:log-group:/aws/http-api/${ServerlessApiProjectName}-*`,
      ],
    });

    const allowEvents = new iam.PolicyStatement({
      sid: "CFAllowEvents",
      actions: [
        "events:Describe*",
        "events:Get*",
        "events:List*",
        "events:CreateEventBus",
        "events:DeleteEventBus",
        "events:PutRule",
        "events:DeleteRule",
        "events:PutTargets",
        "events:RemoveTargets",
        "events:TagResource",
        "events:UntagResource",
      ],
      resources: [
        `arn:aws:events:${currentStack.region}:${currentStack.account}:event-bus/${ServerlessApiProjectName}-*`,
        `arn:aws:events:${currentStack.region}:${currentStack.account}:rule/${ServerlessApiProjectName}-*`,
      ],
    });

    const allowLambda = new iam.PolicyStatement({
      sid: "CFAllowLambda",
      actions: [
        "lambda:Get*",
        "lambda:List*",
        "lambda:CreateFunction",
        "lambda:DeleteFunction",
        "lambda:CreateFunction",
        "lambda:DeleteFunction",
        "lambda:UpdateFunctionConfiguration",
        "lambda:UpdateFunctionCode",
        "lambda:PublishVersion",
        "lambda:CreateAlias",
        "lambda:DeleteAlias",
        "lambda:UpdateAlias",
        "lambda:AddPermission",
        "lambda:RemovePermission",
        "lambda:InvokeFunction",
        "lambda:TagResource",
        "lambda:UntagResource",
      ],
      resources: [
        `arn:aws:lambda:*:${currentStack.account}:function:${ServerlessApiProjectName}*`,
      ],
    });

    const allowAccessToSecurityGroups = new iam.PolicyStatement({
      sid: "ServerlessFrameworkCliAccessToSecurityGroups",
      actions: [
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeSecurityGroupRules",
        "ec2:DescribeTags",
        "ec2:DescribeSubnets",
        "ec2:DescribeVpcs",
      ],
      resources: ['*']
    });

    const allowCloudFront = new iam.PolicyStatement({
      sid: "ServerlessFrameworkCliAllowCloudFront",
      actions: [
        "cloudfront:CreateDistribution",
        "cloudfront:DeleteDistribution",
        "cloudfront:GetDistribution",
        "cloudfront:UpdateDistribution",
        "cloudfront:TagResource",
      ],
      resources: ['*']
    })

    const policyDocument = new iam.PolicyDocument({
      statements: [
        allowPassRole,
        allowCloudFormation,
        allowCFValidation,
        allowS3FullAccessForProject,
        allowS3BucketCreate,
        allowApiGateway,
        allowLambdaLogGroup,
        allowEvents,
        allowLambda,
        allowAccessToSecurityGroups,
        allowCloudFront
      ],
    })

    return new iam.Policy(this, "ServerlessExecutionPolicy", {
      document: policyDocument
    })
  }

  /**
   * Return iam.Policy for Serverless Deployment Role
   */
  public getDeploymentPolicyDocument(execRoleArn: string): iam.Policy {
    const currentStack = Stack.of(this);

    const allowPassRole = new iam.PolicyStatement({
      sid: "DelegateToCloudFormationRole",
      actions: ["iam:PassRole"],
      resources: [execRoleArn],
    });

    const allowCloudFormationValidation = new iam.PolicyStatement({
      sid: "ServerlessFrameworkCliValidateCloudFormation",
      actions: ["cloudformation:ValidateTemplate"],
      resources: ["*"],
    });

    const allowValidateCloudFormation = new iam.PolicyStatement({
      sid: "ServerlessFrameworkCliValidateCloudFormation",
      actions: ["cloudformation:ValidateTemplate"],
      resources: ["*"],
    });

    const allowExecuteCloudFormation = new iam.PolicyStatement({
      sid: "ServerlessFrameworkCliExecuteCloudFormation",
      actions: [
        "cloudformation:CreateChangeSet",
        "cloudformation:CreateStack",
        "cloudformation:DeleteChangeSet",
        "cloudformation:DeleteStack",
        "cloudformation:DescribeChangeSet",
        "cloudformation:DescribeStackEvents",
        "cloudformation:DescribeStackResource",
        "cloudformation:DescribeStackResources",
        "cloudformation:DescribeStacks",
        "cloudformation:ExecuteChangeSet",
        "cloudformation:ListStackResources",
        "cloudformation:SetStackPolicy",
        "cloudformation:UpdateStack",
        "cloudformation:UpdateTerminationProtection",
        "cloudformation:GetTemplate",
      ],
      resources: [
        `arn:aws:cloudformation:${currentStack.region}:${currentStack.account}:stack/${ServerlessApiProjectName}-*/*`,
      ],
    });

    const allowReadLambda = new iam.PolicyStatement({
      sid: "ServerlessFrameworkCliReadLambda",
      actions: ["lambda:Get*", "lambda:List*"],
      resources: [`*`],
    });

    const allowManageSlsDeploymentBucket = new iam.PolicyStatement({
      sid: "ServerlessFrameworkCliManageSlsDeploymentBucket",
      actions: [
        "s3:CreateBucket",
        "s3:DeleteBucket",
        "s3:ListBucket",
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:GetBucketPolicy",
        "s3:PutBucketPolicy",
        "s3:DeleteBucketPolicy",
        "s3:PutBucketAcl",
        "s3:GetEncryptionConfiguration",
        "s3:PutEncryptionConfiguration",
      ],
      resources: [
        `arn:aws:s3:::${ServerlessApiProjectName}*`,
        `arn:aws:s3:::${ServerlessApiProjectName}*/*`,
      ],
    });

    const allowListBuckets = new iam.PolicyStatement({
      sid: "ServerlessFrameworkCliListBuckets",
      actions: ["s3:List*"],
      resources: ["*"],
    });

    const allowApiGateway = new iam.PolicyStatement({
      sid: "CFAllowApiGateway",
      actions: [
        "apigateway:GET",
      ],
      resources: [
        `arn:aws:apigateway:${currentStack.region}::/domainnames/*`,
      ],
    });

    const policyDocument = new iam.PolicyDocument({
      statements: [
        allowPassRole,
        allowCloudFormationValidation,
        allowValidateCloudFormation,
        allowExecuteCloudFormation,
        allowReadLambda,
        allowManageSlsDeploymentBucket,
        allowListBuckets,
        allowApiGateway
      ],
    });

    return new iam.Policy(this, "ServerlessDeployPolicy", {
      document: policyDocument
    })
  }
}
