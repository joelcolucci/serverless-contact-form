import 'source-map-support/register'

import { createContact } from '../../controllers/contactController';
import { getJwtTokenFromEvent } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('contact')

export const handler = async (event) => {
  logger.info('Processing event: ', event)

  const formId = event.pathParameters.formId
  const newContact = JSON.parse(event.body)

  const contact = await createContact(newContact, formId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: contact
    })
  }
}
