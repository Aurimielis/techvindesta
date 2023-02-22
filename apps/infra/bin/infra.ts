#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { HidroStage } from "../lib/stage/hidro-stage";
import { Accounts } from "../lib/config/accounts";

const app = new cdk.App();

// new ManagementStage(app, 'ManagementStage', {});

new HidroStage(app, 'HidroStage', {})
