#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';

const app = new cdk.App();
new InfraStack(
    app, 
    'AWSMinecraftStack',
    "FALSE",  // Change this to "TRUE" if you want to deploy the Discord infra 
    {env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-west-2"}}
);