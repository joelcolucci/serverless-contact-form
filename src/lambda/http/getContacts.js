import 'source-map-support/register'

import { getJwtTokenFromEvent } from '../utils'
import { getContacts } from '../../controllers/contactController'
import { createLogger } from '../../utils/logger'

const logger = createLogger('contact')

export const handler = async (event) => {
  logger.info('Processing event: ', event)

  const jwtToken = getJwtTokenFromEvent(event)
  const formId = event.pathParameters.formId

  const contacts = await getContacts(formId, jwtToken)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items: contacts
    })
  }
}
