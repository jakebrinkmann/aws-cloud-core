import { Stack, StackProps, SecretValue, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import { User, Group, AccessKey, ManagedPolicy } from "aws-cdk-lib/aws-iam";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";

export interface IamUserWithAccessKeyProps extends StackProps {
  userName: string;
  groupName?: string;
  managedPolicy?: string;
  useSecretsManager?: boolean;
}

export class IamUserWithAccessKey extends Stack {
  public readonly accessKey: AccessKey;
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
    this.accessKey = new AccessKey(this, "AccessKey", { user });

    if (props.useSecretsManager) {
      this.createSecret(user);
    } else {
      this.createExport();
    }
  }

  createSecret(user: User) {
    new Secret(this, "Secret", {
      secretObjectValue: {
        userName: SecretValue.unsafePlainText(user.userName),
        accessKeyId: SecretValue.unsafePlainText(this.accessKey.accessKeyId),
        secretAccessKey: this.accessKey.secretAccessKey,
      },
    });
  }

  createExport() {
    new CfnOutput(this, "AccessKeyId", {
      value: this.accessKey.accessKeyId,
    });
    new CfnOutput(this, "SecretAccessKey", {
      value: this.accessKey.secretAccessKey.unsafeUnwrap(),
    });
  }
}
