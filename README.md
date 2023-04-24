# Techvindesta 🔋

A mono-repository for all the projects of Techvindesta:
- CDK for managing infrastructure
- Lambda APIs for the backend
- Web app for the frontend

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Prerequisites

- [Node.js](https://nodejs.org/en/) >= 16.19.1 (just run `nvm install && nvm use` to use the correct version)
- [serverless-cli](https://www.serverless.com/framework/docs/getting-started/) >= 3.0.0
- [aws-cdk-cli](https://docs.aws.amazon.com/cdk/v2/guide/cli.html) >= 2.66.1
- [aws-cli](https://aws.amazon.com/cli/) (configured with credentials)

## Getting started

Before starting the work on any of these projects, make sure you have 
1. correct node version set up (`nvm install and nvm use`).
2. `aws-cli` installed and configured with aws credentials for programmatic access to the AWS account.

### CDK

1. Get familiar with the core concepts of CDK by going through the [CDK Workshop](https://cdkworkshop.com/20-typescript.html).
2. Once through, cd into infra directory (`cd apps/infra`) and run `npm install` to install all the dependencies. Note: this is only temporary until better integrations paths are available.
3. After completing the setup and making some changes, run `cdk synth` to see the changes that will be applied to the AWS account.
4. If the changes look good, and you wish to deploy, run `cdk list` to get a list of stages followed by `cdk deploy HidroStage/\* # etc` to apply the changes to the AWS account.
5. Open `CloudFormation` service in AWS console and check the status of the stack. If the status is `CREATE_COMPLETE`, you can move on to the next task.

### Serverless

1. `cp apps/hidro-api/.env.dist apps/hidro-api/.env` and add the required values
2. `npm run api:sls:start`. That's it! You can now access the API at `http://localhost:3000` and see how they work as you make changes locally.

### API Application

Just run `npm run api:start` and you are good to go. The API will be available at `http://localhost:3001`.

### Web app

`nx serve web`

## Running tests

TBA (To Be Added)

## Deployment Workflow

While ideally all this should be done automatically through a CI/CD pipeline, for now, we will be deploying manually.

### CDK

As explained in `Getting started` section, `cdk synth` and `cdk deploy` are the two commands that you need to run to deploy the infrastructure. The `cdk synth` command will generate the CloudFormation template that will be applied to the AWS account. The `cdk deploy` command will apply the changes to the AWS account.

### Serverless

`npm run api:deploy -- --stage <stage>` to deploy the API to the specified stage. At the moment, we only have `production`.

### API

Changes are deployed automatically when pushed to `main` branch. The deployment is done through [CircleCI](https://app.circleci.com/pipelines/github/beniusij/techvindesta?branch=main)

#### Debugging deployment

Since this deployment includes different services, it is inherently more prone to failing so it is worth keeping note of how the pipeline can be debugged at any given step.

##### CircleCI

This one is probable the simplest since there is a dashboard available detailing each step in the (CI/CD pipeline)[https://app.circleci.com/pipelines/github/beniusij/techvindesta?branch=main] and if any given job fails it can be rerun from the dashboard with SSH connection: https://support.circleci.com/hc/en-us/articles/5170139355547-How-to-rerun-a-job-with-SSH  

##### AWS CodeDeploy

This is one more intricate so different aspects will be detailed as we go along.

To debug examine logs from running CodeDeploy steps as described in `./appspec.yml` file:
1. Connect to the EC2 instance ![Screenshot 2023-04-18 at 21.01.27.png](..%2F..%2F..%2F..%2Fvar%2Ffolders%2Fww%2Fk8sgj41j5jx9_2f0d_ghbqrm0000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_CGcjiB%2FScreenshot%202023-04-18%20at%2021.01.27.png)
2. Run `sudo su`
3. Run `cat /opt/codedeploy-agent/deployment-root/deployment-logs/codedeploy-agent-deployments.log`

##### PM2

PM2 is a process manager and is used to run node server in the background while managing its restarts and such.

1. Connect to the EC2 instance using SSM as shown in the image above
2. `sudo su`
3. Load .bashrc file: `. /home/ec2-user/.bashrc`
4`pm2 logs` to see the logs

## Web App

**Important:** If it's first time deploying to the app, make sure to change platform type to `WEB_COMPUTE` as described in official [AWS Amplify documentation](https://docs.aws.amazon.com/amplify/latest/userguide/redeploy-ssg-to-ssr.html:
```bash
aws amplify update-app --profile <aws profile> --app-id <app id> --platform WEB_COMPUTE --region <region>
```

1. Commit local changes and push them to the remote
2. Open a PR and merge it to `main` branch after it got reviews and tests passing
3. Merge to `main` will trigger a deployment which AWS Amplify will pick up and deploy the app to the production environment

## Reference

 - [Nx Documentation](https://nx.dev)
 - [CDK Workshop](https://cdkworkshop.com/20-typescript.html)
 - [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
 - [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)
