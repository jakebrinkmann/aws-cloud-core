import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// TODO: add HTTPs support too
// import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { ARecord, AaaaRecord, TxtRecord, CnameRecord, RecordTarget, PublicHostedZone } from 'aws-cdk-lib/aws-route53';
import { Route53RecordTarget } from 'aws-cdk-lib/aws-route53-targets';

interface GitHubPagesRoute53SetupStackProps extends cdk.StackProps {
  domainName: string;
  githubUsername: string;
}

// docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
const ipv4Addresses = [
  '185.199.108.153',
  '185.199.109.153',
  '185.199.110.153',
  '185.199.111.153',
];
const ipv6Addresses = [
  '2606:50c0:8000::153',
  '2606:50c0:8001::153',
  '2606:50c0:8002::153',
  '2606:50c0:8003::153',
];

export class GitHubPagesRoute53SetupStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GitHubPagesRoute53SetupStackProps) {
    super(scope, id, props);

    const { domainName, githubUsername } = props;
    // const githubPagesDomain = `${githubUsername}.github.io`

    const zone = new PublicHostedZone(this, 'MyHostedZone', {
      zoneName: domainName,
    });

    const record = new ARecord(this, 'GitHubPagesARecord', {
      zone,
      recordName: domainName,
      target: RecordTarget.fromIpAddresses(...ipv4Addresses),
    });

    new ARecord(this, 'GitHubPagesWwwARecord', {
      zone,
      recordName: 'www.' + domainName,
      target: RecordTarget.fromAlias(new Route53RecordTarget(record))
    });

    new AaaaRecord(this, 'GitHubPagesAaaaRecord', {
      zone,
      recordName: domainName,
      target: RecordTarget.fromIpAddresses(...ipv6Addresses),
    });

    new TxtRecord(this, 'GithubVerifiedTxtRecord', {
      zone,
      recordName: `_github-pages-challenge-${githubUsername}.${domainName}`,
      ttl: cdk.Duration.minutes(30),
      values: ['e9df02c5acc10c713dc04cba65ccd9'],
    });
  }
}
