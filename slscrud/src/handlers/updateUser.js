import AWS from 'aws-sdk';
import commonMiddleware from "../lib/commonMiddleware";
import createError from 'http-errors';
import {getUserById} from "./getUser";
const  dynamodb = new AWS.DynamoDB.DocumentClient();

async function updateUser(event, context) {

    const {id} = event.pathParameters;
    const {username} = event.body;
    await getUserById(id);

    const params = {
        TableName:process.env.TABLE_NAME,
        Key:{id},
        UpdateExpression: 'set username = :username',
        ExpressionAttributeValues:{
            ":username": username,
        },
        ReturnValues : 'ALL_NEW'
    };

    let updatedUser;
    try{
        const result = await dynamodb.update(params).promise();
        updatedUser= result.Attributes;
    }
    catch(error){
        console.error(error);
        throw new createError.InternalServerError(error);
    }
  return {
    statusCode: 200,
    body: JSON.stringify(updatedUser)
  };
}

export const handler = commonMiddleware(updateUser);