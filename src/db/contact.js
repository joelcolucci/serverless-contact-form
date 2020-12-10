import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

const docClient = new XAWS.DynamoDB.DocumentClient()
const contactTable = process.env.CONTACT_TABLE

export const createContact = async (contact) => {
  const params = {
    TableName: contactTable,
    Item: contact
  }

  await docClient.put(params).promise()
}

export const getContacts = async (formId) => {
  const params = {
    ExpressionAttributeValues: {
     ":f": formId
    }, 
    KeyConditionExpression: "formId = :f", 
    TableName: contactTable
   };

  const result = await docClient.query(params).promise()

  const items = result.Items

  return items
}

export const updateContact = async(formId, contactId, contact) => {
  const params = {
    TableName: contactTable,
    Key: {
      formId,
      contactId
    },
    ExpressionAttributeNames: {
      "#e": "email", 
      "#m": "message"
     }, 
    ExpressionAttributeValues: {
      ":e": contact.email,
      ":m": contact.message,
    },
    UpdateExpression: "SET #e = :e, #m = :m",
    ReturnValues: "UPDATED_NEW"
  };

  await docClient.update(params).promise();
}

export const deleteContact = async (formId, contactId) => {
  const params = {
    Key: {
      formId,
      contactId
     }, 
    TableName: contactTable,
  };

  await docClient.delete(params).promise();
}