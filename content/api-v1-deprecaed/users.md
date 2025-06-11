# Users

## Overview

The Users API allows you to retrieve user information and search for users in the Ethos network. It provides endpoints for getting detailed user statistics including reviews and vouches, as well as searching for users by name, username, or userkey.

## Endpoints

### Get User Statistics

```
GET /api/v1/users/:userkey/stats
```

**Description**: Retrieves comprehensive statistics about a user, including review and vouch information.

**Authentication Required**: No

#### Parameters

**Path Parameters**

| Name      | Type   | Required | Description                                                                                                                  |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `userkey` | string | Yes      | The userkey for the user. Can be in the format of "profileId:123", "address:0x1234...", or "service:x.com:username:username" |

**Query Parameters**

| Name        | Type   | Required | Description                                             |
| ----------- | ------ | -------- | ------------------------------------------------------- |
| `startDate` | string | No       | Filter statistics to data after this date (ISO format)  |
| `endDate`   | string | No       | Filter statistics to data before this date (ISO format) |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "reviews": {
      "received": 10,
      "positiveReviewPercentage": 90,
      "percentile": 85.5,
      "positiveReviewCount": 9,
      "negativeReviewCount": 1,
      "neutralReviewCount": 0
    },
    "vouches": {
      "staked": {
        "received": 5.0,
        "deposited": 2.0,
        "mutual": 1.5
      },
      "balance": {
        "received": 5.0,
        "deposited": 2.0,
        "mutual": 1.5
      },
      "count": {
        "received": 3,
        "deposited": 2,
        "mutual": 1
      },
      "percentile": {
        "received": 85.5,
        "deposited": 75.2,
        "mutual": 65.3
      }
    }
  }
}
```

| Property                                | Type    | Description                                                  |
| --------------------------------------- | ------- | ------------------------------------------------------------ |
| `ok`                                    | boolean | Success status                                               |
| `data`                                  | object  | User statistics data                                         |
| `data.reviews`                          | object  | Review statistics                                            |
| `data.reviews.received`                 | number  | Total number of reviews received                             |
| `data.reviews.positiveReviewPercentage` | number  | Percentage of positive reviews (excluding neutral reviews)   |
| `data.reviews.percentile`               | number  | Percentile ranking for reviews compared to all users (0-100) |
| `data.reviews.positiveReviewCount`      | number  | Number of positive reviews                                   |
| `data.reviews.negativeReviewCount`      | number  | Number of negative reviews                                   |
| `data.reviews.neutralReviewCount`       | number  | Number of neutral reviews                                    |
| `data.vouches`                          | object  | Vouch statistics                                             |
| `data.vouches.staked`                   | object  | Statistics about the amount of ETH staked                    |
| `data.vouches.staked.received`          | number  | Total ETH received as vouches                                |
| `data.vouches.staked.deposited`         | number  | Total ETH deposited as vouches                               |
| `data.vouches.staked.mutual`            | number  | Total ETH in mutual vouches                                  |
| `data.vouches.balance`                  | object  | Statistics about the current balance of vouches              |
| `data.vouches.balance.received`         | number  | Current balance of received vouches                          |
| `data.vouches.balance.deposited`        | number  | Current balance of deposited vouches                         |
| `data.vouches.balance.mutual`           | number  | Current balance of mutual vouches                            |
| `data.vouches.count`                    | object  | Statistics about the number of vouches                       |
| `data.vouches.count.received`           | number  | Number of vouches received                                   |
| `data.vouches.count.deposited`          | number  | Number of vouches deposited                                  |
| `data.vouches.count.mutual`             | number  | Number of mutual vouches                                     |
| `data.vouches.percentile`               | object  | Percentile rankings compared to all users                    |
| `data.vouches.percentile.received`      | number  | Percentile for received vouches (0-100)                      |
| `data.vouches.percentile.deposited`     | number  | Percentile for deposited vouches (0-100)                     |
| `data.vouches.percentile.mutual`        | number  | Percentile for mutual vouches (0-100)                        |

#### Example

**Request**

```bash
http GET https://api.ethos.network/api/v1/users/profileId:123/stats
```

**Request with Date Filters**

```bash
http GET https://api.ethos.network/api/v1/users/profileId:123/stats \
  startDate=2023-01-01 \
  endDate=2023-12-31
```

#### Notes

* The percentile values indicate how the user's stats compare to other users. Higher percentiles indicate better performance.
* If a user has multiple userkeys (e.g., multiple addresses or social accounts), the statistics are aggregated across all of them.
* For reviews, the positive review percentage excludes neutral reviews from the calculation.
* For vouches, the "received" statistics represent vouches made to the user, "deposited" statistics represent vouches made by the user, and "mutual" statistics represent cases where both users have vouched for each other.

***

### Search Users

```
GET /api/v1/users/search
```

**Description**: Searches for users in the Ethos network based on a query string. The search looks across display names, usernames, and userkeys.

**Authentication Required**: No

#### Parameters

**Query Parameters**

| Name     | Type   | Required | Description                                       |
| -------- | ------ | -------- | ------------------------------------------------- |
| `query`  | string | Yes      | Search query (2-100 characters)                   |
| `limit`  | number | No       | Maximum number of results to return (default: 10) |
| `offset` | number | No       | Offset for pagination (default: 0)                |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": 1,
        "displayName": "Vitalik Buterin",
        "username": "vitalik",
        "bio": "Ethereum co-founder",
        "avatar": "https://example.com/avatar.jpg",
        "score": 95,
        "userkeys": [
          "profileId:123",
          "address:0x1234567890123456789012345678901234567890",
          "service:x.com:123456789"
        ]
      },
      {
        "id": 2,
        "displayName": "Vitalik Fan",
        "username": "vitalik_fan",
        "bio": "Big fan of Ethereum",
        "avatar": "https://example.com/avatar2.jpg",
        "score": 80,
        "userkeys": [
          "profileId:124",
          "address:0x9876543210987654321098765432109876543210"
        ]
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 2
  }
}
```

| Property                    | Type    | Description                                |
| --------------------------- | ------- | ------------------------------------------ |
| `ok`                        | boolean | Success status                             |
| `data`                      | object  | Response data container                    |
| `data.values`               | array   | Array of user objects matching the search  |
| `data.values[].id`          | number  | User ID                                    |
| `data.values[].displayName` | string  | User's display name                        |
| `data.values[].username`    | string  | User's username                            |
| `data.values[].bio`         | string  | User's biography or description            |
| `data.values[].avatar`      | string  | URL to the user's avatar                   |
| `data.values[].score`       | number  | User's credibility score                   |
| `data.values[].userkeys`    | array   | Array of userkeys associated with the user |
| `data.limit`                | number  | Number of results returned                 |
| `data.offset`               | number  | Current pagination offset                  |
| `data.total`                | number  | Total number of results matching the query |

#### Example

**Request**

```bash
http GET "https://api.ethos.network/api/v1/users/search?query=vitalik&limit=10&offset=0"
```

#### Notes

* The search is case-insensitive and will match partial strings.
* Results are sorted by score in descending order, then by display name in ascending order.
* Merged users (those that have been combined with other user accounts) are excluded from search results.
