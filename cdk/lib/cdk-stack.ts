import * as cdk from 'aws-cdk-lib/core';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import { Construct } from 'constructs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const moviesTable = new dynamodb.Table(this, 'MoviesTable', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const commonLambdaProps = {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      environment: {
        MOVIES_TABLE: moviesTable.tableName,
      },
    };

    const getMovieRolesFunction = new lambda.Function(
      this,
      'GetMovieRolesFunction',
      {
        ...commonLambdaProps,
        code: lambda.Code.fromAsset(
          path.join(__dirname, '../../lambdas/get-movie-roles')
        ),
      }
    );

    const getActorFunction = new lambda.Function(
      this,
      'GetActorFunction',
      {
        ...commonLambdaProps,
        code: lambda.Code.fromAsset(
          path.join(__dirname, '../../lambdas/get-actor')
        ),
      }
    );

    const postRoleFunction = new lambda.Function(
      this,
      'PostRoleFunction',
      {
        ...commonLambdaProps,
        code: lambda.Code.fromAsset(
          path.join(__dirname, '../../lambdas/post-role')
        ),
      }
    );

    const deleteRoleFunction = new lambda.Function(
      this,
      'DeleteRoleFunction',
      {
        ...commonLambdaProps,
        code: lambda.Code.fromAsset(
          path.join(__dirname, '../../lambdas/delete-role')
        ),
      }
    );

    moviesTable.grantReadData(getMovieRolesFunction);
    moviesTable.grantReadData(getActorFunction);
    moviesTable.grantWriteData(postRoleFunction);
    moviesTable.grantWriteData(deleteRoleFunction);

    const api = new apigateway.RestApi(this, 'MoviesApi', {
      restApiName: 'Movies API',
      description: 'Serverless API for managing movie cast roles',
      deployOptions: {
        stageName: 'prod',
      },
    });

    const movies = api.root.addResource('movies');

    const movieRoles = movies
      .addResource('{movieID}')
      .addResource('roles');

    movieRoles.addMethod(
      'GET',
      new apigateway.LambdaIntegration(getMovieRolesFunction)
    );

    movieRoles
      .addResource('{actorID}')
      .addMethod(
        'DELETE',
        new apigateway.LambdaIntegration(deleteRoleFunction)
      );

    movies
      .addResource('roles')
      .addMethod(
        'POST',
        new apigateway.LambdaIntegration(postRoleFunction)
      );

    const actors = api.root.addResource('actors');

    actors
      .addResource('{actorID}')
      .addMethod(
        'GET',
        new apigateway.LambdaIntegration(getActorFunction)
      );

    new cdk.CfnOutput(this, 'TableName', {
      value: moviesTable.tableName,
      description: 'DynamoDB table name',
    });

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'Movies API URL',
    });
  }
}