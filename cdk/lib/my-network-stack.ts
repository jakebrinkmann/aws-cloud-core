import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
// TODO: add HTTP support too
import { ARecord, AaaaRecord, CnameRecord, RecordTarget, PublicHostedZone } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget, Route53RecordTarget } from 'aws-cdk-lib/aws-route53-targets';
// FIXME: github-pages still reports this isn't configurated correctly

interface GitHubPagesRoute53SetupStackProps extends cdk.StackProps {
  domainName: string;
  githubPagesDomain: string;
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

    const { domainName, githubPagesDomain } = props;

    const zone = new PublicHostedZone(this, 'MyHostedZone', {
      zoneName: domainName,
    });

    new ARecord(this, 'GitHubPagesARecord', {
      zone,
      recordName: domainName,
      target: RecordTarget.fromIpAddresses(...ipv4Addresses),
    });

    new AaaaRecord(this, 'GitHubPagesAaaaRecord', {
      zone,
      recordName: domainName,
      target: RecordTarget.fromIpAddresses(...ipv6Addresses), // Spread the array
    });

    new CnameRecord(this, 'GitHubPagesCnameRecord', {
      zone,
      recordName: 'www.' + domainName,
      domainName: githubPagesDomain,
    });
  }
}
