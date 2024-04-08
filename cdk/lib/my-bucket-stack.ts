import { Stack, App, StackProps } from "aws-cdk-lib";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";

export interface MyBucketStackProps extends StackProps {
  bucketName: string;
}

export class MyBucketStack extends Stack {
  public readonly bucket: Bucket;
  constructor(scope: App, id: string, props: MyBucketStackProps) {
    super(scope, id, props);

    this.bucket = new Bucket(scope, "Bucket", {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      bucketName: props.bucketName,
    });
  }
}
