import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_budgets as budgets } from 'aws-cdk-lib';

export interface SpendingBudgetProps extends cdk.StackProps {
  readonly emails: string[];
  readonly amount: number;
}

export class SpendingBudget extends cdk.Stack {

  constructor(scope: Construct, id: string, props: SpendingBudgetProps) {
    super(scope, id, props);

    // There are no official L2 constructs for this service yet.
    new budgets.CfnBudget(this, 'CfnSpendingBudget', {
      budget: {
        budgetType: 'COST',
        timeUnit: 'MONTHLY',
        budgetLimit: {
          amount: props.amount,
          unit: 'USD',
        },
        budgetName: 'MonthlySpendingLimit',
      },

      notificationsWithSubscribers: [{
        notification: {
          comparisonOperator: 'GREATER_THAN',
          notificationType: 'FORECASTED',
          threshold: 100,
          thresholdType: 'PERCENTAGE',
        },
        subscribers: props.emails.map(email => ({
          address: email,
          subscriptionType: 'EMAIL',
        })),
      }],
    });
  }
}
