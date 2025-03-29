# Users API

## Overview

The Users API provides endpoints for searching users on the Ethos network and retrieving comprehensive user statistics. These endpoints enable applications to find users and display their reputation and activity metrics.

## Endpoints

### Search Users

```
GET /api/v1/users/search
```

Searches for users by name, username, or address. Results are sorted by credibility score in descending order, followed by display name alphabetically.

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Search query for finding users (min: 2 chars, max: 100 chars) |
| limit | integer | No | Maximum number of results to return (default: 20, max: 100) |
| offset | integer | No | Number of results to skip for pagination (default: 0) |

#### Example Request

```
GET /api/v1/users/search?query=ethos&limit=5&offset=0
```

#### Success Response (200 OK)

```json
{
  "values": [
    {
      "id": 1234,
      "username": "ethosfoundation",
      "displayName": "Ethos Foundation",
      "userkeys": [
        "0x1234567890abcdef1234567890abcdef12345678",
        "ethosfoundation@twitter"
      ]
    },
    {
      "id": 5678,
      "username": "ethos_dev",
      "displayName": "Ethos Developer",
      "userkeys": [
        "0xabcdef1234567890abcdef1234567890abcdef12",
        "ethos_dev@twitter"
      ]
    }
  ],
  "total": 15,
  "limit": 5,
  "offset": 0
}
```

#### Error Response (400 Bad Request)

```json
{
  "error": "Search query must be at least 2 characters long",
  "code": "INVALID_PARAMETERS"
}
```

### Get User Stats

```
GET /api/v1/users/:userkey/stats
```

Retrieves comprehensive statistics for a specific user, including review and vouch metrics. Optionally, you can filter the statistics by a date range.

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userkey | string | Yes | User identifier (profile ID, address, or username) |

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| startDate | string (date) | No | Start date for filtering stats (format: YYYY-MM-DD) |
| endDate | string (date) | No | End date for filtering stats (format: YYYY-MM-DD) |

#### Example Request

```
GET /api/v1/users/0x1234567890abcdef1234567890abcdef12345678/stats?startDate=2023-01-01&endDate=2023-12-31
```

#### Success Response (200 OK)

```json
{
  "reviews": {
    "received": 42,
    "positiveReviewPercentage": 95.2,
    "percentile": 87.5,
    "positiveReviewCount": 40,
    "negativeReviewCount": 2,
    "neutralReviewCount": 0
  },
  "vouches": {
    "staked": {
      "received": 15.75,
      "deposited": 10.5,
      "mutual": 8.25
    },
    "balance": {
      "received": 14.25,
      "deposited": 9.0,
      "mutual": 7.5
    },
    "count": {
      "received": 18,
      "deposited": 12,
      "mutual": 6
    },
    "percentile": {
      "received": 92.3,
      "deposited": 85.7,
      "mutual": 78.1
    }
  }
}
```

#### Error Responses

**400 Bad Request**
```json
{
  "error": "Invalid userkey format",
  "code": "INVALID_PARAMETERS"
}
```

**404 Not Found**
```json
{
  "error": "User not found",
  "code": "NOT_FOUND"
}
```

### Get Twitter User Info (Extension) [Deprecated]

```
GET /api/v1/extension/user/:twitterUsername/info
```

Retrieves comprehensive information about a Twitter user for the browser extension. This endpoint is primarily used by the Ethos browser extension and is considered deprecated. New applications should use the individual endpoints for specific information.

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| twitterUsername | string | Yes | Twitter (X) username to look up information for |

#### Example Request

```
GET /api/v1/extension/user/ethosfoundation/info
```

#### Success Response (200 OK)

```json
{
  "actor": {
    "profileId": 1234,
    "name": "Ethos Foundation",
    "avatarUrl": "https://pbs.twimg.com/profile_images/...",
    "score": 95.5,
    "xp": 1500,
    "address": "0x1234567890abcdef1234567890abcdef12345678"
  },
  "vouchStats": {
    "subject": {
      "count": 45,
      "amount_staked": "12.75",
      "balance": "11.25",
      "percentile": 0.92
    },
    "author": {
      "count": 23,
      "amount_staked": "8.5",
      "balance": "7.25",
      "percentile": 0.85
    },
    "mutual": {
      "count": 12,
      "amount_staked": "6.5",
      "balance": "5.75",
      "percentile": 0.78
    }
  },
  "reviewStats": {
    "count": 38,
    "score": 4.7,
    "positive": 35,
    "negative": 1,
    "neutral": 2,
    "percentile": 0.88
  },
  "openSlash": null,
  "market": {
    "price": 0.00123,
    "marketCap": 123000,
    "supply": 100000000,
    "holders": 357
  }
}
```

#### Error Responses

**400 Bad Request**
```json
{
  "error": "Invalid Twitter username",
  "code": "INVALID_PARAMETERS"
}
```

**404 Not Found**
```json
{
  "error": "Twitter user not found",
  "code": "NOT_FOUND"
}
```

## Data Models

### User

| Field | Type | Description |
|-------|------|-------------|
| id | integer | Unique user ID |
| username | string | Username |
| displayName | string | Display name |
| userkeys | array of strings | List of user identifiers (addresses, social handles, etc.) |

### User Stats

#### Reviews Section

| Field | Type | Description |
|-------|------|-------------|
| received | integer | Total number of reviews received |
| positiveReviewPercentage | number | Percentage of positive reviews out of all non-neutral reviews |
| percentile | number | User's percentile rank based on reviews (0-100) |
| positiveReviewCount | integer | Number of positive reviews received |
| negativeReviewCount | integer | Number of negative reviews received |
| neutralReviewCount | integer | Number of neutral reviews received |

#### Vouches Section

The vouches section includes four subsections:

**Staked:** The total amount staked in ETH
- received: Amount staked in vouches received
- deposited: Amount staked in vouches given
- mutual: Amount staked in mutual vouches

**Balance:** The current balance in ETH
- received: Current balance in vouches received
- deposited: Current balance in vouches given
- mutual: Current balance in mutual vouches

**Count:** The number of vouches
- received: Number of vouches received
- deposited: Number of vouches given
- mutual: Number of mutual vouches

**Percentile:** The percentile rank (0-100)
- received: Percentile rank for vouches received
- deposited: Percentile rank for vouches given
- mutual: Percentile rank for mutual vouches
