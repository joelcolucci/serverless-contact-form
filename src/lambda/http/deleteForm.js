import 'source-map-support/register'

import { deleteForm } from '../../controllers/formController'
import { getJwtTokenFromEvent } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('form')

export const handler = async (event) => {
  logger.info('Processing event: ', event)

  const jwtToken = getJwtTokenFromEvent(event)
  const formId = event.pathParameters.formId

  await deleteForm(formId, jwtToken)

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}
