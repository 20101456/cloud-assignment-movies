const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.MOVIES_TABLE;

exports.handler = async (event) => {
  try {
    const movieId = event.pathParameters.movieId;
    const pk = `c${movieId}`;

    // Query all cast members for this movie
    const result = await dynamodb.query({
      TableName: tableName,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': pk,
      },
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items || []),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
