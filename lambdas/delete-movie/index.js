const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.MOVIES_TABLE;

exports.handler = async (event) => {
  try {
    const movieId = event.pathParameters.movieId;
    const pk = `m${movieId}`;

    await dynamodb.delete({
      TableName: tableName,
      Key: {
        pk: pk,
        sk: 'xxxx',
      },
    }).promise();

    return {
      statusCode: 204,
      body: '',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
