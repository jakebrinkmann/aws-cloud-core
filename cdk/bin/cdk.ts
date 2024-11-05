#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { IamUserWithAccessKey } from "../lib/my-users-stack";
import { GitHubPagesRoute53SetupStack } from "../lib/my-network-stack";

const envUSA = { account: "531737344926", region: "us-east-2" };

const app = new cdk.App();
new IamUserWithAccessKey(app, "IamUserWithAccessKey", {
  userName: "CloudAdmin",
  managedPolicy: "AdministratorAccess",
  env: envUSA,
});
new GitHubPagesRoute53SetupStack(app, 'GitHubPagesStack', {
  domainName: 'jakebrinkmann.com',
  githubPagesDomain: 'jakebrinkmann.github.io',
  env: envUSA,
});
