const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.MOVIES_TABLE;

exports.handler = async (event) => {
  try {
    const movie = event.queryStringParameters?.movie;
    const actor = event.queryStringParameters?.actor;
    const awardBody = event.queryStringParameters?.awardBody;

    let results = [];

    // Query awards based on parameters
    if (movie) {
      const pk = `w${movie}`;
      const result = await dynamodb.query({
        TableName: tableName,
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: {
          ':pk': pk,
        },
      }).promise();
      results = result.Items || [];

      // Filter by award body if provided
      if (awardBody) {
        results = results.filter(item => item.sk === awardBody);
      }
    } else if (actor) {
      const pk = `w${actor}`;
      const result = await dynamodb.query({
        TableName: tableName,
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: {
          ':pk': pk,
        },
      }).promise();
      results = result.Items || [];

      // Filter by award body if provided
      if (awardBody) {
        results = results.filter(item => item.sk === awardBody);
      }
    } else {
      // Scan all awards if no parameters
      const result = await dynamodb.scan({
        TableName: tableName,
        FilterExpression: 'begins_with(pk, :prefix)',
        ExpressionAttributeValues: {
          ':prefix': 'w',
        },
      }).promise();
      results = result.Items || [];
    }

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
