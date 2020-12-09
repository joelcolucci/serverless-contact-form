import 'source-map-support/register'

import { getJwtTokenFromEvent } from '../utils'
import { updateForm } from '../../controllers/formController'
import { createLogger } from '../../utils/logger'

const logger = createLogger('form')

export const handler = async (event) => {
  logger.info('Processing event: ', event)

  const jwtToken = getJwtTokenFromEvent(event)
  const formId = event.pathParameters.formId
  const updatedForm = JSON.parse(event.body)

  await updateForm(formId, updatedForm, jwtToken)

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}
