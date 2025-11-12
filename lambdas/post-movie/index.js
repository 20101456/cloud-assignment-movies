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
      if (awardBody) {\n        results = results.filter(item => item.sk === awardBody);\n      }\n    } else if (actor) {\n      const pk = `w${actor}`;\n      const result = await dynamodb.query({\n        TableName: tableName,\n        KeyConditionExpression: 'pk = :pk',\n        ExpressionAttributeValues: {\n          ':pk': pk,\n        },\n      }).promise();\n      results = result.Items || [];\n\n      // Filter by award body if provided\n      if (awardBody) {\n        results = results.filter(item => item.sk === awardBody);\n      }\n    } else {\n      // Scan all awards if no parameters\n      const result = await dynamodb.scan({\n        TableName: tableName,\n        FilterExpression: 'begins_with(pk, :prefix)',\n        ExpressionAttributeValues: {\n          ':prefix': 'w',\n        },\n      }).promise();\n      results = result.Items || [];\n    }\n\n    return {\n      statusCode: 200,\n      body: JSON.stringify(results),\n    };\n  } catch (error) {\n    console.error('Error:', error);\n    return {\n      statusCode: 500,\n      body: JSON.stringify({ error: 'Internal server error' }),\n    };\n  }\n};", "filePath": "d:\\Github\\cloud-assignment-movies\\lambdas\\get-awards\\index.js"
</invoke>
<invoke name="create_file">
<parameter name="content">const AWS = require('aws-sdk');
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
