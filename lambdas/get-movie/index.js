const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.MOVIES_TABLE;

exports.handler = async (event) => {
  try {
    const movieId = event.pathParameters.movieId;
    const pk = `m${movieId}`;

    const result = await dynamodb.get({
      TableName: tableName,
      Key: {
        pk: pk,
        sk: 'xxxx',
      },
    }).promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Movie not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
