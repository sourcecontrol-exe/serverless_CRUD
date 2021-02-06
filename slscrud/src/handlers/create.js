import AWS from 'aws-sdk';
import createError from 'http-errors';
import {v4 as uuid} from "uuid";
import commonMiddleware from "../lib/commonMiddleware";
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function create(event, context) {
  const {username} = event.body;
  const now = new Date();
  const user= {
    id : uuid(),
    username,
    createdAt: now.toISOString(),
    status:"Active",
  };
  try{
    await dynamodb.put({
       TableName: process.env.TABLE_NAME,
       Item: user,
    }).promise();
  }
  catch(error){
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return{
    statusCode:201,
    body: JSON.stringify(user)
  };
}

export const handler = commonMiddleware(create);


