#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MyUsersStack } from '../lib/my-users-stack';

const app = new cdk.App();
new MyUsersStack(app, 'MyUsersStack');
