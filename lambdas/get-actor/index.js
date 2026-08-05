const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  GetCommand
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

const tableName = process.env.MOVIES_TABLE;

exports.handler = async (event) => {
  try {
    const actorID = event.pathParameters.actorID;
    const movieID = event.queryStringParameters?.movie;

    const actorResult = await dynamodb.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          pk: `a#${actorID}`,
          sk: `a#${actorID}`
        }
      })
    );

    if (!actorResult.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Actor not found' })
      };
    }

    if (!movieID) {
      return {
        statusCode: 200,
        body: JSON.stringify(actorResult.Item)
      };
    }

    const roleResult = await dynamodb.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          pk: `m#${movieID}`,
          sk: `a#${actorID}`
        }
      })
    );

    if (!roleResult.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Role not found for this actor and movie' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...actorResult.Item,
        roleName: roleResult.Item.roleName,
        roleDescription: roleResult.Item.roleDescription
      })
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};