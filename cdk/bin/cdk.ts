#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { IamUserWithAccessKey } from "../lib/my-users-stack";

const app = new cdk.App();
new IamUserWithAccessKey(app, "IamUserWithAccessKey", {
  userName: process.env.USER || "my-user",
});
