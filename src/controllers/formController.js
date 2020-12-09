import * as uuid from 'uuid'

import * as db from '../db'
import { parseUserId } from '../auth/utils'

export async function createForm(
  newForm,
  jwtToken
) {
  const userId = parseUserId(jwtToken)
  const formId = uuid.v4()

  const form = {
    userId,
    formId,
    name: newForm.name,
    createdAt: new Date().toISOString(),
  }

  await db.createForm(form)

  return form
}

export const getForms = async (jwtToken) => {
  const userId = parseUserId(jwtToken)

  const forms = await db.getForms(userId)

  return forms
}

export async function updateForm(
  formId,
  updatedForm,
  jwtToken
) {
  const userId = parseUserId(jwtToken)

  await db.updateForm(userId, formId, updatedForm)
}

export const deleteForm = async (formId, jwtToken) => {
  const userId = parseUserId(jwtToken)

  await db.deleteForm(userId, formId)
}