import 'source-map-support/register'
import * as jwksClient from "jwks-rsa";

import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'

const logger = createLogger('auth')

// TODO: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
const jwksUrl = 'https://dev-y9y-2a0g.us.auth0.com/.well-known/jwks.json'

export const handler = async (event) => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

// TODO: Implement token verification
// You should implement it similarly to how it was implemented for the exercise for the lesson 5
// You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
async function verifyToken(authHeader){
  const token = getToken(authHeader)
  const decodedToken = decode(token, { complete: true })

  // Only RS256 is supported.
  if (!decodedToken.header || decodedToken.header.alg !== 'RS256') {
    throw new Error()
  }

  var client = jwksClient({
    jwksUri: jwksUrl
  });

  const key = await client.getSigningKeyAsync(decodedToken.header.kid);
  const signingKey = key.getPublicKey()
   
  const decoded = verify(token, signingKey, { algorithms: ['RS256']});

  return decoded;
}

function getToken(authHeader) {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
