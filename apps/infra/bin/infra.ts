#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { HidroStage } from "../lib/stage/hidro-stage";
import { Accounts } from "../lib/config/accounts";
import { ManagementStage } from "../lib/stage/management-stage";

const app = new cdk.App();

new ManagementStage(app, 'ManagementStage', {
  env: Accounts.production,
  stageName: Accounts.production.defaultStage,
});

new HidroStage(app, 'HidroStage', {
  env: Accounts.production,
  stageName: Accounts.production.defaultStage,
})
