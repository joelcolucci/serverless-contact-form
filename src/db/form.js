import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

const docClient = new XAWS.DynamoDB.DocumentClient()
const formTable = process.env.FORM_TABLE

export const createForm = async (form) => {
  const params = {
    TableName: formTable,
    Item: form
  }

  await docClient.put(params).promise()
}

export const getForms = async (userId) => {
  const params = {
    ExpressionAttributeValues: {
     ":u": userId
    }, 
    KeyConditionExpression: "userId = :u", 
    TableName: formTable
   };

  const result = await docClient.query(params).promise()

  const items = result.Items

  return items
}

export const updateForm = async(userId, formId, form) => {
  const params = {
    TableName: formTable,
    Key: {
      userId,
      formId
    },
    ExpressionAttributeNames: {
      "#n": "name", 
     }, 
    ExpressionAttributeValues: {
      ":n": form.name,
    },
    UpdateExpression: "SET #n = :n",
    ReturnValues: "UPDATED_NEW"
  };

  await docClient.update(params).promise();
}

export const deleteForm = async (userId, formId) => {
  const params = {
    Key: {
      userId,
      formId
     }, 
    TableName: formTable,
  };

  await docClient.delete(params).promise();
}