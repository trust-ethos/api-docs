# Twitter API

## Overview

The Twitter API provides endpoints for retrieving user information based on Twitter usernames and handling Twitter authentication for claiming XP in the Ethos network. These endpoints facilitate the integration of Twitter functionality into the Ethos ecosystem.

## Endpoints

### Twitter Login

```
GET /api/v1/claim/twitter/login
```

**Description**: Initiates the Twitter OAuth2 flow for authentication in order to claim XP or use Twitter as an identity provider in the Ethos network.

**Authentication Required**: No

#### Parameters

##### Query Parameters

| Name          | Type   | Required | Description                                            |
| ------------- | ------ | -------- | ------------------------------------------------------ |
| `redirectUri` | string | No       | The URI to redirect to after successful authentication |
| `referrer`    | string | No       | The referrer ID for tracking referrals                 |

#### Responses

This endpoint redirects the user to Twitter's OAuth authorization page. Upon successful authentication, the user is redirected back to the Ethos application with appropriate session cookies set.

#### Example

##### Request

```bash
http GET "https://api.ethos.network/api/v1/claim/twitter/login?redirectUri=https://app.ethos.network/dashboard&referrer=123"
```

#### Notes

- This endpoint sets cookies to maintain the user's session and track referrals.
- After successful authentication, users can claim XP and participate in Ethos's referral program.
- The referrer parameter allows for tracking who referred the user for bonus distribution.
- This endpoint is part of the user onboarding flow in the Ethos application.
