# Twitter API

## Overview

The Twitter API provides endpoints for retrieving user information based on Twitter usernames and handling Twitter authentication for claiming XP in the Ethos network. These endpoints facilitate the integration of Twitter functionality into the Ethos ecosystem.

## Endpoints

### Get Twitter User Information

```
GET /api/v1/extension/user/:twitterUsername/info
```

**Description**: Retrieves user information for a specific Twitter username. This endpoint is designed for use with browser extensions to provide Ethos information about Twitter users.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `twitterUsername` | string | Yes | The Twitter username to look up information for (without the @ symbol) |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "actor": {
      "userkey": "service:x.com:1738066467558395904",
      "avatar": "https://pbs.twimg.com/profile_images/1797826077194096640/d_YEoB8n.jpg",
      "name": "Ethos",
      "username": "ethos_network",
      "description": "Reputation & credibility for crypto, driven by peer-to-peer reviews & secured by staked eth\n\nEthos → https://t.co/NiTdo0XxHb\nMarkets → https://t.co/uXVuVANvbq",
      "score": 1711,
      "scoreXpMultiplier": 1.25,
      "profileId": 1,
      "primaryAddress": "0x9E2218375567BB466b81E38E1a8b599b6250408C"
    },
    "vouchStats": {
      "staked": {
        "received": 2.43124,
        "deposited": 0,
        "mutual": 0
      },
      "balance": {
        "received": 2.407843559416359,
        "deposited": 0,
        "mutual": 0
      },
      "count": {
        "received": 14,
        "deposited": 0,
        "mutual": 0
      },
      "percentile": {
        "received": 100,
        "deposited": 0,
        "mutual": 0
      }
    },
    "reviewStats": {
      "received": 238,
      "averageReviewForUser": 0.9411764705882353,
      "positiveReviewPercentage": 99.5575221238938,
      "percentile": 20.87293206617388,
      "positiveReviewCount": 225,
      "negativeReviewCount": 1,
      "neutralReviewCount": 12
    },
    "openSlash": null,
    "market": null
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | User information container |
| `data.actor` | object | Basic user profile information |
| `data.actor.userkey` | string | User's Twitter userkey in the format "service:x.com:[twitter_id]" |
| `data.actor.avatar` | string | URL to the user's avatar |
| `data.actor.name` | string | User's display name |
| `data.actor.username` | string | User's Twitter username |
| `data.actor.description` | string | User's Twitter bio or description |
| `data.actor.score` | number | User's Ethos credibility score |
| `data.actor.scoreXpMultiplier` | number | User's XP multiplier based on their score |
| `data.actor.profileId` | number | User's Ethos profile ID |
| `data.actor.primaryAddress` | string | User's primary Ethereum address |
| `data.vouchStats` | object | Vouch statistics |
| `data.vouchStats.staked` | object | Statistics about staked ETH |
| `data.vouchStats.staked.received` | number | Total ETH received as vouches |
| `data.vouchStats.staked.deposited` | number | Total ETH deposited as vouches |
| `data.vouchStats.staked.mutual` | number | Total ETH in mutual vouches |
| `data.vouchStats.balance` | object | Current balance of vouches |
| `data.vouchStats.count` | object | Count of vouches |
| `data.vouchStats.percentile` | object | Percentile rankings for vouches |
| `data.reviewStats` | object | Review statistics |
| `data.reviewStats.received` | number | Total number of reviews received |
| `data.reviewStats.averageReviewForUser` | number | Average review score |
| `data.reviewStats.positiveReviewPercentage` | number | Percentage of positive reviews |
| `data.reviewStats.percentile` | number | Percentile ranking for reviews |
| `data.reviewStats.positiveReviewCount` | number | Number of positive reviews |
| `data.reviewStats.negativeReviewCount` | number | Number of negative reviews |
| `data.reviewStats.neutralReviewCount` | number | Number of neutral reviews |
| `data.openSlash` | object | Information about any open slashes (null if none) |
| `data.market` | object | Information about the user's market (null if none) |

##### Error Response

**Code**: 404 Not Found

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found"
  }
}
```

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/extension/user/ethos_network/info
```

##### Response

```json
{
  "ok": true,
  "data": {
    "actor": {
      "userkey": "service:x.com:1738066467558395904",
      "avatar": "https://pbs.twimg.com/profile_images/1797826077194096640/d_YEoB8n.jpg",
      "name": "Ethos",
      "username": "ethos_network",
      "description": "Reputation & credibility for crypto, driven by peer-to-peer reviews & secured by staked eth",
      "score": 1711,
      "scoreXpMultiplier": 1.25,
      "profileId": 1,
      "primaryAddress": "0x9E2218375567BB466b81E38E1a8b599b6250408C"
    },
    "vouchStats": {
      "staked": {
        "received": 2.43124,
        "deposited": 0,
        "mutual": 0
      },
      "balance": {
        "received": 2.407843559416359,
        "deposited": 0,
        "mutual": 0
      },
      "count": {
        "received": 14,
        "deposited": 0,
        "mutual": 0
      },
      "percentile": {
        "received": 100,
        "deposited": 0,
        "mutual": 0
      }
    },
    "reviewStats": {
      "received": 238,
      "averageReviewForUser": 0.9411764705882353,
      "positiveReviewPercentage": 99.5575221238938,
      "percentile": 20.87293206617388,
      "positiveReviewCount": 225,
      "negativeReviewCount": 1,
      "neutralReviewCount": 12
    },
    "openSlash": null,
    "market": null
  }
}
```

#### Notes

- This endpoint is primarily designed for browser extensions to display Ethos information on Twitter profiles.
- If the Twitter user is not registered with Ethos, a 404 error will be returned.
- The `scoreXpMultiplier` indicates how XP rewards are multiplied based on the user's credibility score.
- The `openSlash` field will contain details about any open slash proposals against the user.
- The `market` field will contain details about the user's Ethos market if one exists.

---

### Twitter Login

```
GET /api/v1/claim/twitter/login
```

**Description**: Initiates the Twitter OAuth2 flow for authentication in order to claim XP or use Twitter as an identity provider in the Ethos network.

**Authentication Required**: No

#### Parameters

##### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `redirectUri` | string | No | The URI to redirect to after successful authentication |
| `referrer` | string | No | The referrer ID for tracking referrals |

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
