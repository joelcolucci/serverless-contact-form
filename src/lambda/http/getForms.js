import 'source-map-support/register'

import { getJwtTokenFromEvent } from '../utils'
import { getForms } from '../../controllers/formController'
import { createLogger } from '../../utils/logger'

const logger = createLogger('form')

export const handler = async (event) => {
  logger.info('Processing event: ', event)

  const jwtToken = getJwtTokenFromEvent(event)

  const forms = await getForms(jwtToken)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items: forms
    })
  }
}
