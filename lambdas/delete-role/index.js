const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  DeleteCommand
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

const tableName = process.env.MOVIES_TABLE;

exports.handler = async (event) => {
  try {
    const movieID = event.pathParameters.movieID;
    const actorID = event.pathParameters.actorID;

    const result = await dynamodb.send(
      new DeleteCommand({
        TableName: tableName,
        Key: {
          pk: `m#${movieID}`,
          sk: `a#${actorID}`
        },
        ReturnValues: 'ALL_OLD'
      })
    );

    if (!result.Attributes) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Role not found'
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Role deleted',
        role: result.Attributes
      })
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error'
      })
    };
  }
};