#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkTypeScriptCorpusStack } from '../lib/cdk_type_script_corpus-stack';
import { NetworkingStack } from '../lib/stacks/network-stack';
import { LambdaStack } from '../lib/stacks/lambda-stack';

const app = new cdk.App();

const default_env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION
}

const net = new NetworkingStack(app, 'CdkTypeScriptNetworkingStack', {
  env: default_env,
});


new LambdaStack(app, 'LambdaStack', {
  env: default_env,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
});