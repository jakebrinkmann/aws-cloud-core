#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { IamUserWithAccessKey } from "../lib/my-users-stack";
import { MyBucketStack } from "../lib/my-bucket-stack";

const app = new cdk.App();
new IamUserWithAccessKey(app, "IamUserWithAccessKey", {
  userName: process.env.USER || "my-user",
});

new MyBucketStack(app, "MyBucket", { bucketName: "arlobrinkmann.com" });
new MyBucketStack(app, "MyBucket", { bucketName: "jakebrinkmann.com" });
new MyBucketStack(app, "MyBucket", { bucketName: "j4ke.xyz" });
new MyBucketStack(app, "MyBucket", { bucketName: "4rl0.xyz" });
