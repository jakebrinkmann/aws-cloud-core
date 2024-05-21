import { Stack, StackProps, SecretValue } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  User,
  Group,
  AccessKey,
  ManagedPolicy,
  Policy,
  PolicyStatement,
} from "aws-cdk-lib/aws-iam";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";

export interface IamUserWithAccessKeyProps extends StackProps {
  userName: string;
  groupName?: string;
  managedPolicy?: string;
}

export class IamUserWithAccessKey extends Stack {
  public readonly accessKey: AccessKey;
  public readonly secret: Secret;
  constructor(scope: Construct, id: string, props: IamUserWithAccessKeyProps) {
    super(scope, id, props);

    const user = new User(this, "IamUser", {
      userName: props.userName,
      groups: [
        new Group(this, "IamGroup", {
          groupName: props.groupName || "myGroup",
        }),
      ],
    });
    // https://aws.permissions.cloud/managedpolicies/PowerUserAccess
    user.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName(
        props.managedPolicy || "PowerUserAccess",
      ),
    );

    // add inline policy for aws-nuke
    user.attachInlinePolicy(
      new Policy(this, "aws-nuker", {
        statements: [
          new PolicyStatement({
            actions: ["iam:ListAccountAliases"],
            resources: ["*"],
          }),
        ],
      }),
    );

    this.accessKey = new AccessKey(this, "AccessKey", { user });
    this.secret = new Secret(this, "Secret", {
      secretObjectValue: {
        userName: SecretValue.unsafePlainText(user.userName),
        accessKeyId: SecretValue.unsafePlainText(this.accessKey.accessKeyId),
        secretAccessKey: this.accessKey.secretAccessKey,
      },
    });
  }
}
