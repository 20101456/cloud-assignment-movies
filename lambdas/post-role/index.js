const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  PutCommand
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

const tableName = process.env.MOVIES_TABLE;

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');

    const {
      movieID,
      actorID,
      roleName,
      roleDescription
    } = body;

    if (!movieID || !actorID || !roleName || !roleDescription) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'movieID, actorID, roleName and roleDescription are required'
        })
      };
    }

    const role = {
      pk: `m#${movieID}`,
      sk: `a#${actorID}`,
      movieID: Number(movieID),
      actorID: String(actorID),
      roleName,
      roleDescription
    };

    await dynamodb.send(
      new PutCommand({
        TableName: tableName,
        Item: role,
        ConditionExpression: 'attribute_not_exists(pk) AND attribute_not_exists(sk)'
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify(role)
    };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return {
        statusCode: 409,
        body: JSON.stringify({
          error: 'This movie role already exists'
        })
      };
    }

    if (error instanceof SyntaxError) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Invalid JSON request body'
        })
      };
    }

    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error'
      })
    };
  }
};