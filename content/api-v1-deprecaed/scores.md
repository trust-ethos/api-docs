# Scores API

## Overview

The Scores API allows you to query and analyze credibility scores in the Ethos network. Scores represent a user's trustworthiness and reputation based on their activity, reviews, vouches, and other factors. The API provides endpoints for retrieving individual scores, score history, comparing scores, and even simulating changes to a score.

## Endpoints

### Get Score

```
GET /api/v1/score/:userkey
```

**Description**: Retrieves the credibility score for a specific user.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userkey` | string | Yes | The userkey for the user. Can be in the format of "profileId:123", "address:0x1234...", or "service:x.com:username:vitalii" |

##### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `txHash` | string | No | Transaction hash to retrieve a historical score associated with a specific transaction |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "score": 1711,
    "elements": {
      "Ethereum Address Age": {
        "element": {
          "name": "Ethereum Address Age",
          "type": "LookupInterval",
          "ranges": [
            {"end": 90, "score": 0},
            {"start": 90, "end": 365, "score": 1},
            {"start": 365, "end": 1461, "score": 3},
            {"start": 1461, "end": 2922, "score": 5},
            {"start": 2922, "score": 5}
          ],
          "outOfRangeScore": 0,
          "metadata": {
            "version": 1,
            "versionDate": 978307200,
            "insufficientData": 1
          }
        },
        "raw": 0,
        "weighted": 0,
        "error": false
      },
      "Twitter Account Age": {
        "element": {
          "name": "Twitter Account Age",
          "type": "LookupInterval",
          "ranges": [
            {"start": 0, "end": 90, "score": -250},
            {"start": 90, "end": 365, "score": -50},
            {"start": 365, "end": 730, "score": 0},
            {"start": 1461, "score": 5}
          ],
          "outOfRangeScore": 0,
          "metadata": {
            "version": 1,
            "versionDate": 978307200,
            "oldestAccount": 1641350006000,
            "accountsChecked": 1
          }
        },
        "raw": 1178,
        "weighted": 0,
        "error": false
      },
      "Number of Vouchers Impact": {
        "element": {
          "name": "Number of Vouchers Impact",
          "type": "LookupNumber",
          "range": {"min": 0, "max": 270},
          "metadata": {
            "version": 1,
            "vouches": 14,
            "versionDate": 978307200
          }
        },
        "raw": 94,
        "weighted": 94,
        "error": false
      },
      "Vouched Ethereum Impact": {
        "element": {
          "name": "Vouched Ethereum Impact",
          "type": "LookupNumber",
          "range": {"min": 0, "max": 270},
          "metadata": {
            "version": 1,
            "vouches": 19,
            "stakedEth": 2.3651,
            "versionDate": 978307200,
            "stakedEthDays": 123.8649203457454
          }
        },
        "raw": 223,
        "weighted": 223,
        "error": false
      },
      "Review Impact": {
        "element": {
          "name": "Review Impact",
          "type": "LookupNumber",
          "range": {"min": -800, "max": 270},
          "metadata": {
            "version": 1,
            "versionDate": 978307200,
            "averageAuthorScore": 1371,
            "neutralReviewCount": 5,
            "negativeReviewCount": 1,
            "positiveReviewCount": 209,
            "neutralCoefficientSum": 2.974814814814815,
            "negativeCoefficientSum": 0.6159036968639924,
            "positiveCoefficientSum": 136.4151632981088
          }
        },
        "raw": 193,
        "weighted": 193,
        "error": false
      }
    },
    "metadata": {},
    "errors": []
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | Score data |
| `data.score` | number | Overall credibility score (ranging from 0-2800) |
| `data.elements` | object | Detailed information about each score component |
| `data.elements[elementName]` | object | Information about a specific score element |
| `data.elements[elementName].element` | object | Definition of the score element |
| `data.elements[elementName].element.name` | string | Element name |
| `data.elements[elementName].element.type` | string | Element type (LookupInterval or LookupNumber) |
| `data.elements[elementName].element.ranges` | array | For LookupInterval: ranges with start, end and score values |
| `data.elements[elementName].element.range` | object | For LookupNumber: min and max range values |
| `data.elements[elementName].element.metadata` | object | Metadata about the element calculation |
| `data.elements[elementName].raw` | number | Raw score value for this element |
| `data.elements[elementName].weighted` | number | Weighted contribution to the final score |
| `data.elements[elementName].error` | boolean | Whether there was an error calculating this element |
| `data.metadata` | object | Additional metadata about the score calculation |
| `data.errors` | array | Names of elements that had errors during calculation |

##### Error Responses

**Code**: 404 Not Found

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Score not found"
  }
}
```

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Attestation account not found"
  }
}
```

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Score for transaction not found"
  }
}
```

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/score/profileId:1
```

##### Response

```json
{
  "ok": true,
  "data": {
    "score": 1711,
    "elements": {
      "Ethereum Address Age": {
        "element": {
          "name": "Ethereum Address Age",
          "type": "LookupInterval",
          "ranges": [
            {"end": 90, "score": 0},
            {"start": 90, "end": 365, "score": 1},
            {"start": 365, "end": 1461, "score": 3},
            {"start": 1461, "end": 2922, "score": 5},
            {"start": 2922, "score": 5}
          ],
          "outOfRangeScore": 0,
          "metadata": {
            "version": 1,
            "versionDate": 978307200,
            "insufficientData": 1
          }
        },
        "raw": 0,
        "weighted": 0,
        "error": false
      },
      "Number of Vouchers Impact": {
        "element": {
          "name": "Number of Vouchers Impact",
          "type": "LookupNumber",
          "range": {"min": 0, "max": 270},
          "metadata": {
            "version": 1,
            "vouches": 14,
            "versionDate": 978307200
          }
        },
        "raw": 94,
        "weighted": 94,
        "error": false
      }
    },
    "metadata": {},
    "errors": []
  }
}
```

#### Notes

- Ethos credibility scores range from 0-2800 and are categorized into levels:
  - Untrusted: 0-799
  - Questionable: 800-1199
  - Neutral: 1200-1599
  - Reputable: 1600-1999
  - Exemplary: 2000-2800
- The response includes detailed information about each component that contributes to the final score.
- The `elements` object contains various factors like account age, review impact, voucher count, etc.
- Each element includes its raw score, weighted contribution, and metadata about how it was calculated.
- If a user has no historical data for a particular element, it may show a raw score of 0.

---

### Get Score History

```
GET /api/v1/score/:userkey/history
```

**Description**: Retrieves the history of score changes for a specific user.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userkey` | string | Yes | The userkey for the user. Can be in the format of "profileId:123", "address:0x1234...", or "service:x.com:username:vitalii" |

##### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | number | No | Maximum number of results to return (default: 10, max: 500) |
| `offset` | number | No | Offset for pagination (default: 0) |
| `expanded` | boolean | No | Whether to include detailed score elements in the response (default: false) |
| `duration` | string | Yes | Return score history after this date (e.g., "30d" for last 30 days) |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "createdAt": "2025-03-30T04:35:04.439Z",
        "score": 1711,
        "id": 9162501,
        "target": "profileId:1"
      },
      {
        "createdAt": "2025-03-30T02:00:12.996Z",
        "score": 1711,
        "id": 9156537,
        "target": "profileId:1"
      }
    ],
    "total": 131,
    "limit": 2,
    "offset": 0
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | Response data container |
| `data.values` | array | Array of score history items |
| `data.values[].id` | number | Unique ID for the score history record |
| `data.values[].score` | number | Score value at this point in time |
| `data.values[].createdAt` | string | ISO timestamp of when the score was calculated |
| `data.values[].target` | string | The userkey this score belongs to |
| `data.values[].elements` | object | Detailed score elements (included if expanded=true) |
| `data.total` | number | Total number of score history items for the user |
| `data.limit` | number | Number of results returned |
| `data.offset` | number | Current pagination offset |

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "fields": [
      {
        "code": "invalid_type",
        "expected": "string",
        "received": "undefined",
        "path": ["duration"],
        "message": "Required"
      }
    ],
    "message": "Validation error"
  }
}
```

**Code**: 404 Not Found

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Attestation account not found"
  }
}
```

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/score/profileId:1/history limit==2 duration=="30d"
```

##### Response

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "createdAt": "2025-03-30T04:35:04.439Z",
        "score": 1711,
        "id": 9162501,
        "target": "profileId:1"
      },
      {
        "createdAt": "2025-03-30T02:00:12.996Z",
        "score": 1711,
        "id": 9156537,
        "target": "profileId:1"
      }
    ],
    "total": 131,
    "limit": 2,
    "offset": 0
  }
}
```

#### Notes

- The `duration` parameter is required and must be specified to limit the timeframe of the history.
- Timestamps are returned in ISO format rather than Unix timestamps.
- Use the `expanded` parameter set to `true` to include detailed element scores if needed.
- If there are no score history records within the specified duration, an empty array will be returned.

---

### Get Highest Scoring Actors

```
GET /api/v1/score/actors/highest-scores
```

**Description**: Retrieves the actors with the highest credibility scores in the network.

**Authentication Required**: No

#### Parameters

##### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | number | No | Maximum number of results to return (default: 10, max: 100) |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": [
    {
      "score": 2157,
      "profileActor": {
        "userkey": "profileId:8",
        "avatar": "https://pbs.twimg.com/profile_images/1700729497065037824/huYFFzHU.jpg",
        "name": "Serpin Taxt",
        "username": "0x5f_eth",
        "description": "Punk #3983\nRunning 0x5f Capital, liquid hedge fund\nBuilding @ethos_network",
        "score": 2157,
        "scoreXpMultiplier": 1.5,
        "profileId": 8,
        "primaryAddress": "0x937EC42DDfEC2059BB64D613F99547a62cda6c01"
      },
      "inviterActor": {
        "userkey": "profileId:1",
        "avatar": "https://pbs.twimg.com/profile_images/1797826077194096640/d_YEoB8n.jpg",
        "name": "Ethos",
        "username": "ethos_network",
        "description": "Reputation & credibility for crypto, driven by peer-to-peer reviews & secured by staked eth\n\nEthos → https://t.co/NiTdo0XxHb\nMarkets → https://t.co/uXVuVANvbq",
        "score": 1711,
        "scoreXpMultiplier": 1.25,
        "profileId": 1,
        "primaryAddress": "0x9E2218375567BB466b81E38E1a8b599b6250408C"
      }
    }
  ]
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | array | Array of highest scoring actors |
| `data[].score` | number | Actor's credibility score |
| `data[].profileActor` | object | Information about the actor |
| `data[].profileActor.userkey` | string | Actor's userkey |
| `data[].profileActor.avatar` | string | URL to the actor's avatar |
| `data[].profileActor.name` | string | Actor's display name |
| `data[].profileActor.username` | string | Actor's username |
| `data[].profileActor.description` | string | Actor's description |
| `data[].profileActor.score` | number | Actor's credibility score |
| `data[].profileActor.scoreXpMultiplier` | number | Actor's XP multiplier based on score |
| `data[].profileActor.profileId` | number | Actor's profile ID |
| `data[].profileActor.primaryAddress` | string | Actor's primary Ethereum address |
| `data[].inviterActor` | object | Information about the person who invited this actor (if available) |

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/score/actors/highest-scores limit==1
```

##### Response

```json
{
  "ok": true,
  "data": [
    {
      "score": 2157,
      "profileActor": {
        "userkey": "profileId:8",
        "avatar": "https://pbs.twimg.com/profile_images/1700729497065037824/huYFFzHU.jpg",
        "name": "Serpin Taxt",
        "username": "0x5f_eth",
        "description": "Punk #3983\nRunning 0x5f Capital, liquid hedge fund\nBuilding @ethos_network",
        "score": 2157,
        "scoreXpMultiplier": 1.5,
        "profileId": 8,
        "primaryAddress": "0x937EC42DDfEC2059BB64D613F99547a62cda6c01"
      },
      "inviterActor": {
        "userkey": "profileId:1",
        "avatar": "https://pbs.twimg.com/profile_images/1797826077194096640/d_YEoB8n.jpg",
        "name": "Ethos",
        "username": "ethos_network",
        "description": "Reputation & credibility for crypto, driven by peer-to-peer reviews & secured by staked eth",
        "score": 1711,
        "scoreXpMultiplier": 1.25,
        "profileId": 1,
        "primaryAddress": "0x9E2218375567BB466b81E38E1a8b599b6250408C"
      }
    }
  ]
}
```

#### Notes

- Returns profiles sorted by credibility score in descending order (highest first).
- Each profile includes information about both the user and the person who invited them.
- The `scoreXpMultiplier` field indicates the XP multiplier based on the user's credibility score.
- This endpoint is useful for identifying the most trusted and reputable users in the network.
- Some highly-trusted users may have scores in the "Exemplary" range (2000-2800).

---

### Get Bulk Scores

```
POST /api/v1/score/bulk
```

**Description**: Retrieves scores for multiple users in a single request.

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "userkeys": ["profileId:123", "address:0x1234...", "service:x.com:username:vitalii"]
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `userkeys` | array of strings | Yes | Array of userkeys to get scores for (max 500) |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "profileId:123": 1711,
    "address:0x1234...": 1580,
    "service:x.com:username:vitalii": 1890
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | Map of userkeys to their scores |

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/score/bulk \
  userkeys:='["profileId:1", "profileId:2"]'
```

##### Response

```json
{
  "ok": true,
  "data": {
    "profileId:1": 1711,
    "profileId:2": 1931
  }
}
```

#### Notes

- If a userkey is not found, it will return a default starting score (1200).
- The API enforces a maximum of 500 userkeys per request.
- Ethos credibility scores range from 0-2800 and are categorized into levels:
  - Untrusted: 0-799
  - Questionable: 800-1199
  - Neutral: 1200-1599
  - Reputable: 1600-1999
  - Exemplary: 2000-2800

---

### Simulate Score Changes

```
POST /api/v1/score/simulate
```

**Description**: Simulates how various actions would affect a user's credibility score.

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "subjectKey": "profileId:1",
  "vouchAmount": 1.5,
  "numberOfVouchers": 2
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `subjectKey` | string | Yes | Userkey of the subject to simulate the score for |
| `twitterUserId` | string | No | Twitter user ID to simulate account age impact |
| `reviews` | array of objects | No | Array of reviews to simulate |
| `reviews[].author` | string | Yes | Address of the review author |
| `reviews[].score` | string | Yes | Review score: "positive", "neutral", or "negative" |
| `vouchAmount` | number | No | Amount of ETH to simulate being vouched |
| `vouchedDays` | number | No | Number of days to simulate the vouch for (default: maximum allowed) |
| `numberOfVouchers` | number | No | Number of vouchers to simulate |
| `votes` | object | No | Votes to simulate |
| `votes.review` | object | No | Votes on reviews |
| `votes.review.upvotes` | number | Yes | Number of upvotes on reviews |
| `votes.review.downvotes` | number | Yes | Number of downvotes on reviews |
| `votes.vouch` | object | No | Votes on vouches |
| `votes.vouch.upvotes` | number | Yes | Number of upvotes on vouches |
| `votes.vouch.downvotes` | number | Yes | Number of downvotes on vouches |
| `slashes` | array of objects | No | Slashes to simulate |
| `slashes[].type` | string | Yes | Type of slash: "SOCIAL" or "FINANCIAL" |
| `slashes[].amount` | number | Yes | Amount of the slash |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "simulation": {
      "value": 38.70023504412825,
      "relativeValue": 38.70023504412825,
      "impact": "POSITIVE",
      "adjustedRecipientScore": 1749.7002350441282
    },
    "calculationResults": {
      "score": 1749.7002350441282,
      "elements": {
        "Ethereum Address Age": {
          "element": {
            "name": "Ethereum Address Age",
            "type": "LookupInterval",
            "ranges": [
              {"end": 90, "score": 0},
              {"start": 90, "end": 365, "score": 1},
              {"start": 365, "end": 1461, "score": 3},
              {"start": 1461, "end": 2922, "score": 5},
              {"start": 2922, "score": 5}
            ],
            "outOfRangeScore": 0
          },
          "raw": 0,
          "weighted": 0,
          "error": false
        },
        "Twitter Account Age": {
          "element": {
            "name": "Twitter Account Age",
            "type": "LookupInterval",
            "ranges": [
              {"start": 0, "end": 90, "score": -250},
              {"start": 90, "end": 365, "score": -50},
              {"start": 365, "end": 730, "score": 0},
              {"start": 1461, "score": 5}
            ],
            "outOfRangeScore": 0
          },
          "raw": 463,
          "weighted": 0,
          "error": false
        },
        "Vouched Ethereum Impact": {
          "element": {
            "name": "Vouched Ethereum Impact",
            "type": "LookupNumber",
            "range": {"min": 0, "max": 270}
          },
          "raw": 253.3720080769059,
          "weighted": 253.3720080769059,
          "error": false
        },
        "Number of Vouchers Impact": {
          "element": {
            "name": "Number of Vouchers Impact",
            "type": "LookupNumber",
            "range": {"min": 0, "max": 270}
          },
          "raw": 102.85714285714285,
          "weighted": 102.85714285714285,
          "error": false
        }
      },
      "metadata": {},
      "errors": []
    },
    "errors": []
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | Simulation results |
| `data.simulation` | object | Score change information |
| `data.simulation.value` | number | Absolute point change in score |
| `data.simulation.relativeValue` | number | Relative point change in score |
| `data.simulation.impact` | string | Impact type (e.g., "POSITIVE") |
| `data.simulation.adjustedRecipientScore` | number | New simulated score |
| `data.calculationResults` | object | Detailed calculation results |
| `data.calculationResults.score` | number | Total simulated score |
| `data.calculationResults.elements` | object | Detailed breakdown of score elements |
| `data.errors` | array | Names of elements that had errors during calculation |

##### Error Responses

**Code**: 404 Not Found

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Failed to calculate subject score"
  }
}
```

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Twitter Profile not found"
  }
}
```

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/score/simulate \
  subjectKey="profileId:1" \
  vouchAmount:=1.5 \
  numberOfVouchers:=2
```

##### Response

```json
{
  "ok": true,
  "data": {
    "simulation": {
      "value": 38.70023504412825,
      "relativeValue": 38.70023504412825,
      "impact": "POSITIVE",
      "adjustedRecipientScore": 1749.7002350441282
    },
    "calculationResults": {
      "score": 1749.7002350441282,
      "elements": {
        "Ethereum Address Age": {
          "element": {
            "name": "Ethereum Address Age",
            "type": "LookupInterval",
            "ranges": [
              {"end": 90, "score": 0},
              {"start": 90, "end": 365, "score": 1},
              {"start": 365, "end": 1461, "score": 3},
              {"start": 1461, "end": 2922, "score": 5},
              {"start": 2922, "score": 5}
            ],
            "outOfRangeScore": 0
          },
          "raw": 0,
          "weighted": 0,
          "error": false
        },
        "Number of Vouchers Impact": {
          "element": {
            "name": "Number of Vouchers Impact",
            "type": "LookupNumber",
            "range": {"min": 0, "max": 270}
          },
          "raw": 102.85714285714285,
          "weighted": 102.85714285714285,
          "error": false
        }
      },
      "metadata": {},
      "errors": []
    },
    "errors": []
  }
}
```

#### Notes

- You can simulate changes to a user's score by providing different parameters.
- The response includes both the projected score and a detailed breakdown of how each element contributed.
- The `impact` field indicates whether the changes would have a positive, negative, or neutral effect.
- Only include the parameters you want to simulate; omit others to keep them at their current values.
- The simulation doesn't affect the actual user's score - it's only a preview of potential changes.
