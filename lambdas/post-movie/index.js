const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.MOVIES_TABLE;

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { movieId, title, releaseDate, overview } = body;

    if (!movieId || !title) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: movieId, title' }),
      };
    }

    const pk = `m${movieId}`;
    const item = {
      pk: pk,
      sk: 'xxxx',
      title: title,
      releaseDate: releaseDate || '',
      overview: overview || '',
    };

    await dynamodb.put({
      TableName: tableName,
      Item: item,
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
