import 'source-map-support/register'

import { deleteContact } from '../../controllers/contactController'
import { getJwtTokenFromEvent } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('contact')

export const handler = async (event) => {
  logger.info('Processing event: ', event)

  const jwtToken = getJwtTokenFromEvent(event)
  const contactId = event.pathParameters.contactId
  const formId = event.pathParameters.formId

  await deleteContact(formId, contactId, jwtToken)

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}
