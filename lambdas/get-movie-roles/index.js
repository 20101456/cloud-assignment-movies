const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  QueryCommand,
  GetCommand
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

const tableName = process.env.MOVIES_TABLE;

exports.handler = async (event) => {
  try {
    const movieID = event.pathParameters.movieID;
    const actorID = event.queryStringParameters?.actor;

    if (actorID) {
      const result = await dynamodb.send(
        new GetCommand({
          TableName: tableName,
          Key: {
            pk: `m#${movieID}`,
            sk: `a#${actorID}`
          }
        })
      );

      if (!result.Item) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Role not found' })
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(result.Item)
      };
    }

    const result = await dynamodb.send(
      new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: 'pk = :pk AND begins_with(sk, :actor)',
        ExpressionAttributeValues: {
          ':pk': `m#${movieID}`,
          ':actor': 'a#'
        }
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items || [])
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};