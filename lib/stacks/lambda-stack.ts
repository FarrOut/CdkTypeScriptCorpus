import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import { SimpleLambdaNest } from '../components/compute/lambda/simple-lambda-function-nest';
import { AdvancedLambdaNest } from '../components/compute/lambda/advanced-lambda-nest';

/* ===============================================================================
// === References ===
// [1] - SubnetFilter.byIds
// https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-ec2.SubnetFilter.html#static-bywbridssubnetids


===============================================================================*/

interface MyProps extends cdk.StackProps {
    removalPolicy: cdk.RemovalPolicy,
}

export class LambdaStack extends cdk.Stack {

    public readonly functionArn: string;

    constructor(scope: Construct, id: string, props: MyProps) {
        super(scope, id, props);


        new SimpleLambdaNest(this, 'SimpleLambdaNest', {
            removalPolicy: props.removalPolicy,
        })

        new AdvancedLambdaNest(this, 'AdvancedLambdaNest', {
            removalPolicy: props.removalPolicy,
        })
/*
        this.functionArn = LambdaStack.function.functionArn;
        new cdk.CfnOutput(this, 'LambdaFunctionArn', {
            value: this.functionArn,
            description: 'Lambda function ARN',
        })

 */
    }
}
