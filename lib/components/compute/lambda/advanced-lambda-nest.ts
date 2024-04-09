import {NestedStack} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as lambda_ from 'aws-cdk-lib/aws-lambda';
import * as pyLambda from '@aws-cdk/aws-lambda-python-alpha';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cdk from 'aws-cdk-lib';

import path = require("path");

interface MyProps {
    LogGroup?: logs.ILogGroup,
    removalPolicy: cdk.RemovalPolicy,
}

export class AdvancedLambdaNest extends NestedStack {

    public readonly function: lambda_.IFunction;

    constructor(scope: Construct, id: string, props: MyProps) {
        super(scope, id, props);

        const layer_one = new pyLambda.PythonLayerVersion(this, 'MyLayer', {
          entry: path.join(__dirname, "layers"), // point this to your library's directory          
          compatibleRuntimes: [lambda_.Runtime.PYTHON_3_10,
            lambda_.Runtime.PYTHON_3_11,
            lambda_.Runtime.PYTHON_3_12
          ]
        })

        const fn = new pyLambda.PythonFunction(this, 'MyFunction', {
            entry: path.join(__dirname, "assets"), // required
            runtime: lambda_.Runtime.PYTHON_3_12, // required
            index: 'index.py', // optional, defaults to 'index.py'
            handler: 'handler', // optional, defaults to 'handler'
            layers: [layer_one]
          });

          

    }
}
