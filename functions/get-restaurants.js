const AWSXRay = require('aws-xray-sdk-core');
const AWS = process.env.LAMBDA_RUNTIME_DIR
    ? AWSXRay.captureAWS(require('aws-sdk'))
    : require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const wrap = require('../lib/wrapper');
const Log = require('../lib/log');

const defaultResults = process.env.defaultResults || 8;
const tableName = process.env.restaurants_table;

const getRestaurants = async (count) => {
  const req = {
    TableName: tableName,
    Limit: count
  };

  const resp = await dynamodb.scan(req).promise();
  return resp.Items
};

module.exports.handler = wrap(async (event, context) => {
  const restaurants = await getRestaurants(defaultResults);
  Log.debug(`fetched ${restaurants.length} restaurants`);
  const response = {
    statusCode: 200,
    body: JSON.stringify(restaurants)
  };

  return response
});