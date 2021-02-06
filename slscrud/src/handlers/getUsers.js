import AWS from 'aws-sdk';
import commonMiddleware from "../lib/commonMiddleware";
import createError from 'http-errors';
import validator from '@middy/validator';
import getUserSchema from '../lib/schemas/getUserSchema';
const  dynamodb = new AWS.DynamoDB.DocumentClient();

async function getUsers(event, context) {
    let users;
    let {status} = event.queryStringParameters;
    let params ={
      TableName:process.env.TABLE_NAME,
      IndexName: 'statusAndcreatedAt',
      KeyConditionExpression: '#status =:status',
      ExpressionAttributeValues: {
        ":status": status,
      },
      ExpressionAttributeNames:{
            "#status" : 'status',
       },
    };
    try{
        const result = await dynamodb.query(params).promise();
        users=result.Items;
    }
    catch(error){
        console.error(error);
        throw new createError.InternalServerError(error);
    }
  return {
    statusCode: 200,
    body: JSON.stringify(users)
  };
}

export const handler = commonMiddleware(getUsers)
.use(validator({inputSchema : getUserSchema, useDefaults:true}));