import 'source-map-support/register'

import { createForm } from '../../controllers/formController';
import { getJwtTokenFromEvent } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('form')

export const handler = async (event) => {
  logger.info('Processing event: ', event)

  const jwtToken = getJwtTokenFromEvent(event)
  const newForm = JSON.parse(event.body)

  const form = await createForm(newForm, jwtToken)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: form
    })
  }
}
