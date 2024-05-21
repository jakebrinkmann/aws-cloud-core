#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { IamUserWithAccessKey } from "../lib/my-users-stack";
import { MyBucketStack } from "../lib/my-bucket-stack";

const app = new cdk.App();
new IamUserWithAccessKey(app, "IamUserWithAccessKey", {
  userName: process.env.USER || "my-user",
});

new MyBucketStack(app, "ArloWebsiteBucket", {
  domainName: "arlobrinkmann.com",
  subDomain: "www",
});
new MyBucketStack(app, "MyWebsiteBucket", {
  domainName: "jakebrinkmann.com",
  subDomain: "www",
});
new MyBucketStack(app, "MyBlogBucket", {
  domainName: "j4ke.xyz",
  subDomain: "blog",
});
new MyBucketStack(app, "ArloBlogBucket", {
  domainName: "4rl0.xyz",
  subDomain: "blog",
});
