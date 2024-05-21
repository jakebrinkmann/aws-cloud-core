#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { IamUserWithAccessKey } from "../lib/my-users-stack";

const envUSA = { account: "531737344926", region: "us-east-2" };

const app = new cdk.App();
new IamUserWithAccessKey(app, "CloudAdminStack", {
  userName: "CloudAdmin",
  managedPolicy: "AdministratorAccess",
  env: envUSA,
});
