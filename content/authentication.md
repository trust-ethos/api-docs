# Authentication API

The Authentication API provides endpoints for managing user authentication on the Ethos network using Privy as the authentication provider.

## Overview

Ethos uses [Privy](https://www.privy.io/) as the authentication provider for user sessions. The Authentication API facilitates the process of maintaining the authentication state between the Privy service and the Ethos backend, ensuring that user sessions are properly synchronized.

Authentication in Ethos is primarily handled through Privy tokens, which are passed in the `Authorization` header of API requests. For endpoints that require a valid user session, the API validates the Privy token and retrieves the user's information from the database.

## Endpoints

### Create Privy Login

```
POST /api/v1/privy-logins
```

Creates or updates a Privy login record in the database. This endpoint is used to synchronize Privy authentication state with the Ethos backend.

#### Headers

| Name              | Type   | Required | Description                                 |
|-------------------|--------|----------|---------------------------------------------|
| Authorization     | string | Yes      | Privy authentication token                  |
| X-Privy-Id-Token  | string | Yes      | Privy ID token for the authenticated user   |

#### Response

**Success (200 OK)**

```json
{
  "ok": true,
  "data": null
}
```

**Error Responses**

- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid Privy token or ID token
- `403 Forbidden`: Invalid user or linked accounts

#### Example Request

```bash
curl -X POST https://api.ethos.io/api/v1/privy-logins \
  -H "Authorization: <privy-token>" \
  -H "X-Privy-Id-Token: <privy-id-token>"
```

### Save OAuth2 Tokens

```
POST /api/v1/privy-logins/tokens
```

Saves OAuth2 tokens for the current authenticated Privy user. This is used to store tokens for external providers (e.g., Twitter) that can be used for API calls on behalf of the user.

#### Headers

| Name          | Type   | Required | Description                |
|---------------|--------|----------|----------------------------|
| Authorization | string | Yes      | Privy authentication token |

#### Request Body

| Name         | Type   | Required | Description                              |
|--------------|--------|----------|------------------------------------------|
| provider     | string | Yes      | The OAuth provider (e.g., 'twitter')     |
| accessToken  | string | Yes      | The OAuth access token                   |
| refreshToken | string | Yes      | The OAuth refresh token                  |
| scopes       | array  | Yes      | List of scopes granted by the user       |

#### Response

**Success (200 OK)**

```json
{
  "ok": true,
  "data": null
}
```

**Error Responses**

- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid Privy token

#### Example Request

```bash
curl -X POST https://api.ethos.io/api/v1/privy-logins/tokens \
  -H "Authorization: <privy-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "twitter",
    "accessToken": "your-access-token",
    "refreshToken": "your-refresh-token",
    "scopes": ["tweet.read", "users.read"]
  }'
```

## Authentication Flow

1. The client application initializes Privy using the Privy client library.
2. When a user logs in with Privy (typically through a social login like Twitter), Privy handles the authentication and returns authentication tokens.
3. The client calls the `Create Privy Login` endpoint to register the Privy session with the Ethos backend.
4. If OAuth tokens were granted (e.g., for Twitter), the client calls the `Save OAuth2 Tokens` endpoint to store these tokens.
5. For subsequent API requests, the client includes the Privy token in the `Authorization` header.
6. The Ethos API validates the token and identifies the user for each request that requires authentication.

## Error Handling

Authentication errors are returned with appropriate HTTP status codes and error messages. Common error codes include:

- `UNAUTHORIZED`: The user is not authenticated or the authentication token is invalid.
- `FORBIDDEN`: The user does not have sufficient permissions for the requested action.
- `BAD_PARAMETERS`: The request contains invalid parameters.

## Security Considerations

- Privy tokens should always be transmitted securely over HTTPS.
- Tokens have expiration times and need to be refreshed periodically.
- The application should handle token expiration gracefully by redirecting the user to re-authenticate when necessary.
