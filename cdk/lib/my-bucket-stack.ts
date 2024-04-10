import { Stack, App, StackProps, CfnOutput, RemovalPolicy } from "aws-cdk-lib";
import {
  BucketAccessControl,
  BlockPublicAccess,
  Bucket,
} from "aws-cdk-lib/aws-s3";
import { Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";

export interface MyBucketStackProps extends StackProps {
  domainName: string;
  subDomain: string;
}

export class MyBucketStack extends Stack {
  public readonly bucket: Bucket;
  constructor(scope: App, id: string, props: MyBucketStackProps) {
    super(scope, id, props);

    const siteDomain = `${props.subDomain}.${props.domainName}`;
    new CfnOutput(this, "Website", { value: "https://" + siteDomain });

    this.bucket = new Bucket(this, "Bucket", {
      accessControl: BucketAccessControl.PRIVATE,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      bucketName: siteDomain,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const originAccessIdentity = new OriginAccessIdentity(this, "Origin");
    this.bucket.grantRead(originAccessIdentity);
    new Distribution(this, "Distribution", {
      defaultRootObject: "index.html",
      domainNames: [props.domainName],
      defaultBehavior: {
        origin: new S3Origin(this.bucket, { originAccessIdentity }),
      },
    });
  }
}
