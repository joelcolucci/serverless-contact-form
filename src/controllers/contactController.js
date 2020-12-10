import * as uuid from 'uuid'

import db from '../db'

export async function createContact(
  newContact,
  formId
) {
  const contactId = uuid.v4()

  const contact = {
    contactId,
    formId,
    email: newContact.email,
    message: newContact.message,
    createdAt: new Date().toISOString(),
  }

  await db.createContact(contact)

  return contact
}

export const getContacts = async (formId, jwtToken) => {
  const contacts = await db.getContacts(formId)

  return contacts
}

export async function updateContact(
  formId,
  contactId,
  updatedContact,
  jwtToken
) {
  await db.updateContact(formId, contactId, updatedContact)
}

export const deleteContact = async (formId, contactId, jwtToken) => {
  await db.deleteContact(formId, contactId)
}