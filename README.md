#CRUD with serverless

Hi there,

    The following project is implemented on Nodejs using serverless framework, is using Auth0 for authentication and authorization.

Prerequisites
    AWS SDK, Node

## Getting started

### 1. Clone the repository (or generate a serverless project)

### 2. Install dependencies for both slsbase and auth-service

### 3. Create `secret.pem` file

This file will contain your Auth0 public certificate, used to verify tokens.

Create a `secret.pem` file in the root folder of this project. Simply paste your public certificate in there.

### 4. Create tokenId  (https://auth0.com/docs/flows/call-your-api-using-resource-owner-password-flow)
 One can create Token Id using curl or postman
    
   ```
   curl --request POST \
  --url 'https://YOUR_DOMAIN/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=password \
  --data username=user@example.com \
  --data password=pwd \
  --data audience=YOUR_API_IDENTIFIER \
  --data scope=read:sample \
  --data 'client_id=YOUR_CLIENT_ID' \
  --data client_secret=YOUR_CLIENT_SECRET
  ``` 

### 4. Deploy the stack

We need to deploy the stack in order to consume the private/public testing endpoints.

```sh
sls deploy -v
```

### 5. Final test

You can grab a test token from Auth0. Make sure to provide your token in the headers like so:

```
"Authorization": "Bearer YOUR_TOKEN"
```

You should be good to go!

## Bonus: Cross-stack authorization

This is very useful in a microservices setup. For example, you have an Auth Service (this service) which owns anything auth/user-related, and a bunch of other services that require user authorization.
Fear not, it is very easy to make your authorizer work anywhere else in your AWS account.

When defining your Lambdas in other services, simply define the `authorizer` as well and provide the ARN of your `auth` function (can be found in the AWS Console or via `sls info`).


If everything was set up correctly, all incoming requests to your `someFunction` Lambda will first be authorized. You can find the JWT claims at `event.requestContext.authorizer`.


     

