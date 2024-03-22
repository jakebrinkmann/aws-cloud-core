import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { User, Group, AccessKey } from 'aws-cdk-lib/aws-iam';

export class MyUsersStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const myGroup = new Group(this, 'IamGroup',  {
      groupName: "myGroup",
      path: "/myGroup/",
    })

    const user = new User(this, 'IamUser', {
      userName: 'my-user',
      groups: [myGroup],
    });

    const accessKey = new AccessKey(this, 'AccessKey', { user });
    new CfnOutput(this, 'accessKeyId', {
      value: accessKey.accessKeyId
    });
    new CfnOutput(this, 'secretAccessKey', {
      value: accessKey.secretAccessKey.unsafeUnwrap()
    });
  }
}
