# aws-cloud-core

This is a place to house my AWS shared resources.

## Usage

```sh
aws-nuke -c nuke-config.yml --profile default --no-dry-run
cdk bootstrap aws://531737344926/us-east-2
```

```sh
cd cdk/
cdk synth
cdk deploy --all
cdk destroy --all
```

## TODOs

- [ ] Add Budgets and Alerts ($25/mo)
- [ ] Make IAM users (CloudAdmin, CdkBot)
  - [ ] seems secretsmanager isn't free-tier
- [ ] Setup s3 bucket for static hosting
  - this should happen in another project
- [ ] Setup DNS rules for websites:
  - [ ] 4rl0.xyz
  - [ ] arlobrinkmann.com
  - [ ] j4ke.xyz
  - [x] jakebrinkmann.com <-- use jakebrinkmann.github.io
