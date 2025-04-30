# Reviews API

## Overview

The Reviews API allows you to query and analyze reviews in the Ethos network. Reviews represent evaluations made by users about other users, services, or addresses. The API provides endpoints for retrieving reviews, getting review statistics, and counting reviews based on various filters.

## Endpoints

### Query Reviews

```
POST /api/v1/reviews
```

**Description**: Retrieves reviews based on various filters such as IDs, subjects, authors, attestations, and more.

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "ids": [1, 2, 3],
  "subject": ["profileId:123", "address:0x1234...", "service:x.com:username:vitalii"],
  "author": [456, 789],
  "attestation": [
    {
      "service": "x.com",
      "account": "123456789"
    },
    {
      "service": "x.com",
      "username": "vitalii"
    }
  ],
  "archived": false,
  "score": ["positive", "neutral", "negative"],
  "orderBy": {
    "createdAt": "desc"
  },
  "limit": 10,
  "offset": 0
}
```

| Property                                            | Type             | Required | Description                                                    |
| --------------------------------------------------- | ---------------- | -------- | -------------------------------------------------------------- |
| `ids`                                               | array of numbers | No       | Array of review IDs                                            |
| `subject`                                           | array of strings | No       | Array of userkeys for review subjects                          |
| `author`                                            | array of numbers | No       | Array of profile IDs of review authors                         |
| `attestation`                                       | array of objects | No       | Array of attestation objects                                   |
| `attestation[].service`                             | string           | Yes      | Service name (e.g., "x.com")                                   |
| `attestation[].account` or `attestation[].username` | string           | Yes      | Account ID or username on the service                          |
| `archived`                                          | boolean          | No       | Whether to include archived reviews                            |
| `score`                                             | array of strings | No       | Review scores to filter by ("positive", "neutral", "negative") |
| `orderBy`                                           | object           | No       | Sorting options                                                |
| `orderBy.createdAt` or `orderBy.updatedAt`          | string           | No       | Sort by creation/update date: "asc" or "desc"                  |
| `limit`                                             | number           | Yes      | Number of results to return (maximum 100)                      |
| `offset`                                            | number           | Yes      | Offset for pagination                                          |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": 49786,
        "author": "0xe242479D5C0854C5fD387295CA13E5584528B80c",
        "subject": "0x9E2218375567BB466b81E38E1a8b599b6250408C",
        "attestationDetails": {
          "account": "",
          "service": ""
        },
        "comment": "Good platform for credibility check",
        "score": "positive",
        "createdAt": 1743300009,
        "archived": false,
        "metadata": "{\"description\":\"\"}",
        "events": [
          {
            "id": 872668,
            "txHash": "0xcbef6b0bec01c71e4b64de9ddb2b77e29e57fe3139b01ae43ff06b185f48d453",
            "blockNumber": 28255331,
            "blockIndex": 334,
            "createdAt": 1743300011,
            "updatedAt": 1743300012,
            "contract": "review",
            "processed": true
          }
        ]
      }
    ],
    "limit": 2,
    "offset": 0,
    "total": 245
  }
}
```

| Property                                   | Type    | Description                                      |
| ------------------------------------------ | ------- | ------------------------------------------------ |
| `ok`                                       | boolean | Success status                                   |
| `data`                                     | object  | Response data container                          |
| `data.values`                              | array   | Array of review objects                          |
| `data.values[].id`                         | number  | Review ID                                        |
| `data.values[].author`                     | string  | Ethereum address of the author                   |
| `data.values[].subject`                    | string  | Ethereum address of the subject (if applicable)  |
| `data.values[].attestationDetails`         | object  | Attestation details                              |
| `data.values[].attestationDetails.service` | string  | Service name (if applicable)                     |
| `data.values[].attestationDetails.account` | string  | Account ID on the service (if applicable)        |
| `data.values[].comment`                    | string  | Review message/comment                           |
| `data.values[].score`                      | string  | Review score ("positive", "neutral", "negative") |
| `data.values[].createdAt`                  | number  | Unix timestamp of when the review was created    |
| `data.values[].archived`                   | boolean | Whether the review is archived                   |
| `data.values[].metadata`                   | string  | JSON string containing additional metadata       |
| `data.values[].events`                     | array   | Blockchain events associated with the review     |
| `data.values[].events[].id`                | number  | Event ID                                         |
| `data.values[].events[].txHash`            | string  | Transaction hash                                 |
| `data.values[].events[].blockNumber`       | number  | Block number                                     |
| `data.values[].events[].blockIndex`        | number  | Index within the block                           |
| `data.values[].events[].createdAt`         | number  | Unix timestamp of when the event was created     |
| `data.values[].events[].updatedAt`         | number  | Unix timestamp of when the event was updated     |
| `data.values[].events[].contract`          | string  | Contract name                                    |
| `data.values[].events[].processed`         | boolean | Whether the event has been processed             |
| `data.limit`                               | number  | Number of results returned                       |
| `data.offset`                              | number  | Current pagination offset                        |
| `data.total`                               | number  | Total number of results matching the query       |

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/reviews \
  subject:='["profileId:1"]' \
  limit=2 \
  offset=0
```

##### Response

```json
{
  "ok": true,
  "data": {
    "limit": 2,
    "offset": 0,
    "total": 245,
    "values": [
      {
        "archived": false,
        "attestationDetails": {
          "account": "",
          "service": ""
        },
        "author": "0xe242479D5C0854C5fD387295CA13E5584528B80c",
        "comment": "Good platform for credibility check",
        "createdAt": 1743300009,
        "events": [
          {
            "blockIndex": 334,
            "blockNumber": 28255331,
            "contract": "review",
            "createdAt": 1743300011,
            "id": 872668,
            "processed": true,
            "txHash": "0xcbef6b0bec01c71e4b64de9ddb2b77e29e57fe3139b01ae43ff06b185f48d453",
            "updatedAt": 1743300012
          }
        ],
        "id": 49786,
        "metadata": "{\"description\":\"\"}",
        "score": "positive",
        "subject": "0x9E2218375567BB466b81E38E1a8b599b6250408C"
      },
      {
        "archived": false,
        "attestationDetails": {
          "account": "",
          "service": ""
        },
        "author": "0xF7Aa8AF74bf1C50966876d85027447D2ffb6f568",
        "comment": "Great initiative",
        "createdAt": 1743269421,
        "events": [
          {
            "blockIndex": 809,
            "blockNumber": 28240037,
            "contract": "review",
            "createdAt": 1743269423,
            "id": 864046,
            "processed": true,
            "txHash": "0x368fdb203567e53fb7d1c93d2f08b5192a52abb6d5dad5c6ae89fe1a3358d835",
            "updatedAt": 1743269423
          }
        ],
        "id": 49422,
        "metadata": "{\"description\":\"After the bloodbath of the scores and listening to the AMA I think this was a smart move . \\n\\nEveryone wants the best score which is normal but if people need to know how people think abaout you they dont need that only the reviews.\\n\\nSo it changed my perspective how i looked at it the first time.\"}",
        "score": "positive",
        "subject": "0x9E2218375567BB466b81E38E1a8b599b6250408C"
      }
    ]
  }
}
```

#### Notes

- By default, results are sorted by creation date in descending order (newest first).
- The API enforces a maximum of 100 reviews that can be requested at once.
- When searching by `subject` with a `profileId`, the API finds reviews for all addresses and attestations linked to that profile.
- The `score` field in the response is returned as a string ("positive", "neutral", "negative") rather than a number (2, 1, 0).
- The `metadata` field typically contains a JSON string with a "description" field that provides additional context for the review.
- Reviews can be filtered by score type using the `score` parameter, which accepts an array of score types.
- If no filters are provided, the endpoint will return the most recent reviews across all subjects.

---

### Get Bulk Review Statistics

```
```

### Get Review Statistics for Multiple Targets

```
POST /api/v1/reviews/stats/bulk
```

**Description**: Retrieves review statistics for multiple targets (users, addresses, or service accounts) in a single request.

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "userkeys": ["profileId:1", "profileId:2"],
  "timeRange": {
    "startDate": "2023-01-01",
    "endDate": "2023-12-31"
  }
}
```

| Property              | Type             | Required | Description                                       |
| --------------------- | ---------------- | -------- | ------------------------------------------------- |
| `userkeys`            | array of strings | Yes      | Array of userkeys to get statistics for (max 500) |
| `timeRange`           | object           | No       | Optional time range for filtering reviews         |
| `timeRange.startDate` | string           | No       | Start date in ISO format                          |
| `timeRange.endDate`   | string           | No       | End date in ISO format                            |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "profileId:1": {
      "byAddress": {
        "0x9E2218375567BB466b81E38E1a8b599b6250408C": {
          "received": 220,
          "averageReviewForUser": 0.9727272727272728,
          "positiveReviewPercentage": 99.53703703703704,
          "percentile": 20.87293206617388,
          "positiveReviewCount": 215,
          "negativeReviewCount": 1,
          "neutralReviewCount": 4
        }
      },
      "byAttestation": {
        "x.com": {
          "1738066467558395904": {
            "received": 17,
            "averageReviewForUser": 0.5294117647058824,
            "positiveReviewPercentage": 100,
            "percentile": 13.657162970784936,
            "positiveReviewCount": 9,
            "negativeReviewCount": 0,
            "neutralReviewCount": 8
          }
        }
      },
      "total": {
        "received": 237,
        "averageReviewForUser": 0.9409282700421941,
        "positiveReviewPercentage": 99.55555555555556,
        "percentile": 20.87293206617388,
        "positiveReviewCount": 224,
        "negativeReviewCount": 1,
        "neutralReviewCount": 12
      }
    },
    "profileId:2": {
      "byAddress": {
        "0x2B9A677752998AfbC99f1eED6e4B684AD5C6765a": {
          "received": 34,
          "averageReviewForUser": 1,
          "positiveReviewPercentage": 100,
          "percentile": 100,
          "positiveReviewCount": 34,
          "negativeReviewCount": 0,
          "neutralReviewCount": 0
        }
      },
      "byAttestation": {
        "x.com": {
          "122810186": {
            "received": 4,
            "averageReviewForUser": 1,
            "positiveReviewPercentage": 100,
            "percentile": 100,
            "positiveReviewCount": 4,
            "negativeReviewCount": 0,
            "neutralReviewCount": 0
          }
        }
      },
      "total": {
        "received": 38,
        "averageReviewForUser": 1,
        "positiveReviewPercentage": 100,
        "percentile": 100,
        "positiveReviewCount": 38,
        "negativeReviewCount": 0,
        "neutralReviewCount": 0
      }
    }
  }
}
```

| Property        | Type    | Description                                                        |
| --------------- | ------- | ------------------------------------------------------------------ |
| `ok`            | boolean | Success status                                                     |
| `data`          | object  | Map of userkeys to their statistics                                |
| `data[userkey]` | object  | Statistics for a specific userkey (same structure as single stats) |

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/reviews/stats/bulk \
  userkeys:='["profileId:1", "profileId:2"]'
```

#### Notes

- If a userkey is not found, it will be omitted from the results rather than causing an error.
- The API enforces a maximum of 500 userkeys per request.
- When using the `timeRange` parameter, reviews outside of the specified time range are excluded from the statistics.
- If there are no reviews for a specific userkey in the specified time range, the `averageReviewForUser` and `percentile` fields may be null and `positiveReviewPercentage` will be 0.
- The data structure for each userkey follows the same format as the single stats endpoint.

---

### Count Reviews

```
POST /api/v1/reviews/count
```

**Description**: Counts the number of reviews matching the specified filters.

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "subject": ["profileId:1"],
  "author": [456],
  "score": ["positive"]
}
```

The parameters are the same as for the "Query Reviews" endpoint, except pagination and orderBy are not used.

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "count": 231
  }
}
```

| Property     | Type    | Description                            |
| ------------ | ------- | -------------------------------------- |
| `ok`         | boolean | Success status                         |
| `data`       | object  | Response data                          |
| `data.count` | number  | Number of reviews matching the filters |

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/reviews/count \
  subject:='["profileId:1"]' \
  score:='["positive"]'
```

##### Response

```json
{
  "ok": true,
  "data": {
    "count": 231
  }
}
```

#### Notes

- This endpoint is useful for efficiently getting count information without retrieving the actual review data.
- The count reflects the total number of reviews that match the specified filters.
- When using the `score` filter, reviews are counted based on their score value:
  "positive", "neutral", or "negative".
