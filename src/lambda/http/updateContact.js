import 'source-map-support/register'

import { getJwtTokenFromEvent } from '../utils'
import { updateContact } from '../../controllers/contactController'
import { createLogger } from '../../utils/logger'

const logger = createLogger('contact')

export const handler = async (event) => {
  logger.info('Processing event: ', event)

  const jwtToken = getJwtTokenFromEvent(event)
  const formId = event.pathParameters.formId
  const contactId = event.pathParameters.contactId
  const updatedContact = JSON.parse(event.body)

  await updateContact(formId,
    contactId, updatedContact, jwtToken)

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}
