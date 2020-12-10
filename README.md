# Serverless Contact Forms
Serverless Contact Form leverages the serverless framework
and AWS to implement a backend API for a website contact form
product.

Users can create and manage contact forms for their websites.
For each form a public endpoint is created that allows website
visitors to submit a request to be contacted.

## API
If you would like to explore this API via Postman, a collection
is available within this repo.

### Authentication
This backend API uses Oauth/Auth0. To generate an authorization
JWT, configure Postman with the following Oauth2 settings
(these settings are also available in the postman collection):

```
useBrowser: true,
redirect_uri: http://localhost:3000/callback"
scope: "openid"
clientId: "fVQowIBQxGqCtSMlzjkBqFue1MvhCbmF"
authUrl: "https://dev-y9y-2a0g.us.auth0.com/authorize",
accessTokenUrl: "https://dev-y9y-2a0g.us.auth0.com/oauth/token",
```

After generating a token in postman you must copy and paste
the auth token to the Postman environment variable {{authToken}}

#### Required postman environment variables
```
apiId: psr12lxhgl
authToken: USE_JWT_FROM_ABOVE_STEP
formId: Create a form via Postman and copy formId to this envvar
```

### Forms
#### POST `/forms`
- Create a new form for a user
- Requires authentication

#### GET `/forms`
- View all forms for a user
- Requires authentication

#### PATCH `/forms/{formId}`
- Update a new form for a user
- Requires authentication

#### DELETE `/forms/{formId}`
- Delete a new form for a user
- Requires authentication


### Contacts
#### POST `/forms/{formsId}/contacts
- Create a new contact submission for a form
- This endpoint can be used in a forms ACTION attriute
- Public

#### GET `/forms/{formId}/contacts
- View all contact submissions for a form
- Requires authentication

#### PATCH `/forms/{formId}/contacts/{contactId}`
- Update a contact submission for a form
- Requires authentication

#### DELETE `/forms/{formId}/contacts/{contactId}`
- Delete a contact submission for a form
- Requires authentication