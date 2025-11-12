import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';

export class MoviesApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const healthFn = new lambda.Function(this, 'HealthFn', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'health.handler',
      code: lambda.Code.fromAsset('../lambdas/dist'),
      timeout: Duration.seconds(5),
    });

    const httpApi = new apigwv2.HttpApi(this, 'MoviesHttpApi', {
      apiName: 'movies-api',
      createDefaultStage: true,
    });

    httpApi.addRoutes({
      path: '/health',
      methods: [apigwv2.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration('HealthIntegration', healthFn),
    });
  }
}
