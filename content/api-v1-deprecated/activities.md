# Activities

## Overview

The Activities API allows you to access various types of user activities on the Ethos network, including vouches, reviews, attestations, slashes, invitations, and more. It provides endpoints for querying individual activities, bulk activities, activity actors, and activity votes.

## Endpoints

### Get Activity by Type and ID

```
GET /api/v1/activities/:type/:id
```

**Description**: Retrieves a specific activity by its type and ID. The ID can be either an activity ID or a transaction hash for on-chain activities.

**Authentication Required**: No

#### Parameters

**Path Parameters**

| Name   | Type   | Required | Description                                                                                                                  |
| ------ | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `type` | string | Yes      | Type of activity ('review', 'vouch', 'slash', 'attestation', 'invitation-accepted', 'unvouch', 'open-slash', 'closed-slash') |
| `id`   | string | Yes      | Activity ID or transaction hash                                                                                              |

**Query Parameters**

| Name                   | Type   | Required | Description                                                      |
| ---------------------- | ------ | -------- | ---------------------------------------------------------------- |
| `currentUserProfileId` | number | No       | Optional profile ID of the requesting user for personalized data |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "id": 123,
    "type": "vouch",
    "timestamp": 1735689600,
    "metadata": {
      "author": {
        "userkey": "profileId:456",
        "avatar": "https://example.com/avatar.jpg",
        "name": "Author Name",
        "username": "author_username",
        "description": "Author description",
        "score": 1711,
        "scoreXpMultiplier": 1.25,
        "profileId": 456,
        "primaryAddress": "0x1234...5678"
      },
      "subject": {
        "userkey": "profileId:789",
        "avatar": "https://example.com/avatar.jpg",
        "name": "Subject Name",
        "username": "subject_username",
        "description": "Subject description",
        "score": 1890,
        "scoreXpMultiplier": 1.25,
        "profileId": 789,
        "primaryAddress": "0x9876...5432"
      },
      "message": "Activity message",
      "archived": false,
      "voterProfileId": null,
      "voteDirection": null
    },
    "sortWeight": 1735689600
  }
}
```

| Property                       | Type    | Description                                                   |
| ------------------------------ | ------- | ------------------------------------------------------------- |
| `ok`                           | boolean | Success status                                                |
| `data`                         | object  | Activity data                                                 |
| `data.id`                      | number  | Activity ID                                                   |
| `data.type`                    | string  | Activity type                                                 |
| `data.timestamp`               | number  | Unix timestamp of when the activity occurred                  |
| `data.metadata`                | object  | Activity metadata                                             |
| `data.metadata.author`         | object  | Information about the author of the activity                  |
| `data.metadata.subject`        | object  | Information about the subject of the activity (if applicable) |
| `data.metadata.message`        | string  | Activity message (if applicable)                              |
| `data.metadata.archived`       | boolean | Whether the activity is archived                              |
| `data.metadata.voterProfileId` | number  | Profile ID of the voter (if the activity is a vote)           |
| `data.metadata.voteDirection`  | string  | Direction of the vote (if the activity is a vote)             |
| `data.sortWeight`              | number  | Weight used for sorting (usually same as timestamp)           |

**Error Responses**

**Code**: 404 Not Found

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Activity not found"
  }
}
```

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "fields": [
      {
        "code": "invalid_type",
        "expected": "number",
        "message": "Expected number, received nan",
        "path": [
          "currentUserProfileId"
        ],
        "received": "nan"
      }
    ],
    "message": "Validation error"
  }
}
```

**Code**: 500 Internal Server Error

```json
{
  "ok": false,
  "error": {
    "code": "UNEXPECTED_ERROR",
    "message": "Something went wrong! Please try again later.",
    "reqId": "edf49e09-8ce0-4b9c-b89f-ca2d1e4392c3"
  }
}
```

#### Example

**Request**

```bash
http GET https://api.ethos.network/api/v1/activities/vouch/123
```

**Response**

```json
{
  "ok": true,
  "data": {
    "author": {
      "avatar": "https://pbs.twimg.com/profile_images/1823010959268442112/4rPgdqnT.jpg",
      "description": "10x Founder / Bitcoin Miner / Advisor and Investor in 20+ Bitcoin and Web3 Start-Ups / Building @theMathTeam",
      "name": "workhorse.btc | ian 🧙‍♂️",
      "primaryAddress": "0x8f8B90Fd3f24e78Bd6E2e7106A7f0E56F2978512",
      "profileId": 3,
      "score": 1421,
      "scoreXpMultiplier": 1,
      "userkey": "profileId:3",
      "username": "0xWorkhorse"
    },
    "data": {
      "activityCheckpoints": {
        "unhealthyAt": 0,
        "unvouchedAt": 0,
        "vouchedAt": 1737569381
      },
      "archived": false,
      "attestationHash": null,
      "authorAddress": "0x8f8B90Fd3f24e78Bd6E2e7106A7f0E56F2978512",
      "authorProfileId": 3,
      "balance": "102247577637077388n",
      "comment": "Big Fan",
      "deposited": "50000000000000000n",
      "id": 1,
      "metadata": "{\"description\":\"Trustworthy, kind, and all around good dude.\"}",
      "staked": "51000000000000000n",
      "subjectAddress": null,
      "subjectProfileId": 8,
      "unhealthy": false,
      "withdrawn": "0n"
    },
    "events": [
      {
        "blockIndex": 344,
        "blockNumber": 25390017,
        "contract": "vouch",
        "createdAt": 1737569383,
        "id": 325,
        "processed": true,
        "txHash": "0xffa6fbab94687feb1ca698679928c86be7cb068acdcbcd11069ffc704c83c150",
        "updatedAt": 1737569383
      }
    ],
    "replySummary": {
      "count": 0,
      "participated": false
    },
    "subject": {
      "avatar": "https://pbs.twimg.com/profile_images/1700729497065037824/huYFFzHU.jpg",
      "description": "Punk #3983\nRunning 0x5f Capital, liquid hedge fund\nBuilding @ethos_network",
      "name": "Serpin Taxt",
      "primaryAddress": "0x937EC42DDfEC2059BB64D613F99547a62cda6c01",
      "profileId": 8,
      "score": 2157,
      "scoreXpMultiplier": 1.5,
      "userkey": "profileId:8",
      "username": "0x5f_eth"
    },
    "timestamp": 1737569381,
    "type": "vouch",
    "votes": {
      "downvotes": 0,
      "upvotes": 1
    }
  },
  "ok": true
}
```

#### Notes

* If a transaction hash is provided as the ID, the API will first process the blockchain event and then retrieve the corresponding activity.
* Only review, vouch, and slash activities are currently supported for transaction hash lookups.
* Ethos credibility scores range from 0-2800 and are categorized into levels:
  * Untrusted: 0-799
  * Questionable: 800-1199
  * Neutral: 1200-1599
  * Reputable: 1600-1999
  * Exemplary: 2000-2800
* The response structure may vary slightly depending on the activity type, with different fields in the data object.
* The currentUserProfileId query parameter can be used to personalize certain aspects of the response, such as whether the current user has voted or participated in replies.

***

### Get Actor by Userkey

```
GET /api/v1/activities/actor/:userkey
```

**Description**: Retrieves actor information for a given userkey. Actors represent users in the context of activities.

**Authentication Required**: No

#### Parameters

**Path Parameters**

| Name      | Type   | Required | Description                                                            |
| --------- | ------ | -------- | ---------------------------------------------------------------------- |
| `userkey` | string | Yes      | The userkey for the actor (e.g., "profileId:123", "address:0x1234...") |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "userkey": "profileId:123",
    "avatar": "https://example.com/avatar.jpg",
    "name": "Actor Name",
    "username": "actor_username",
    "description": "Actor description",
    "score": 1711,
    "scoreXpMultiplier": 1.25,
    "profileId": 123,
    "primaryAddress": "0x1234...5678"
  }
}
```

| Property                 | Type    | Description                              |
| ------------------------ | ------- | ---------------------------------------- |
| `ok`                     | boolean | Success status                           |
| `data`                   | object  | Actor data                               |
| `data.userkey`           | string  | The userkey for the actor                |
| `data.avatar`            | string  | URL to the actor's avatar                |
| `data.name`              | string  | Actor's display name                     |
| `data.username`          | string  | Actor's username                         |
| `data.description`       | string  | Actor's description                      |
| `data.score`             | number  | Actor's credibility score (0-2800 range) |
| `data.scoreXpMultiplier` | number  | Actor's score XP multiplier              |
| `data.profileId`         | number  | Actor's profile ID                       |
| `data.primaryAddress`    | string  | Actor's primary Ethereum address         |

#### Example

**Request**

```bash
http GET https://api.ethos.network/api/v1/activities/actor/profileId:1
```

**Response**

```json
{
  "ok": true,
  "data": {
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
```

#### Notes

* The API supports three userkey formats: profileId-based (e.g., "profileId:123"), address-based (e.g., "address:0x1234..."), and service-based (e.g., "service:x.com:username:username").
* For service-based userkeys, the returned userkey may use the service's account ID instead of the username (e.g., "service:x.com:1234567890" instead of "service:x.com:username:username").
* For non-existent userkeys, the API returns a 200 OK response with default values (empty strings, null values, zero score) rather than a 404 error.
* Ethos credibility scores range from 0-2800 and are categorized into levels:
  * Untrusted: 0-799
  * Questionable: 800-1199
  * Neutral: 1200-1599
  * Reputable: 1600-1999
  * Exemplary: 2000-2800

***

### Get Bulk Activities

```
POST /api/v1/activities
```

**Description**: Retrieves multiple activities by their IDs and types.

**Authentication Required**: No

#### Parameters

**Request Body**

```json
{
  "review": [1, 2, 3],
  "vouch": [4, 5, 6],
  "unvouch": [7],
  "attestation": [8],
  "invitation-accepted": [9],
  "currentUserProfileId": null
}
```

| Property               | Type             | Required | Description                                             |
| ---------------------- | ---------------- | -------- | ------------------------------------------------------- |
| `review`               | array of numbers | No       | Array of review activity IDs                            |
| `vouch`                | array of numbers | No       | Array of vouch activity IDs                             |
| `unvouch`              | array of numbers | No       | Array of unvouch activity IDs                           |
| `attestation`          | array of numbers | No       | Array of attestation activity IDs                       |
| `invitation-accepted`  | array of numbers | No       | Array of invitation acceptance activity IDs             |
| `currentUserProfileId` | number           | No       | Profile ID of the requesting user for personalized data |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": [
    {
      "author": {
        "avatar": "https://pbs.twimg.com/profile_images/1838414217977741313/ZQzWzwfq.jpg",
        "description": "retail onboarding expert @travelswap_xyz @coin_voyage",
        "name": "soup",
        "primaryAddress": "0x532b2e0752Ec5c145509Ab586Da102a114C79Ac0",
        "profileId": 6179,
        "score": 1214,
        "scoreXpMultiplier": 1,
        "userkey": "profileId:6179",
        "username": "soupxyz"
      },
      "data": {
        "account": "1395154870932541446",
        "archived": false,
        "createdAt": 1743304123,
        "hash": "0xee0369b84a795db01c7601df7fef61f5097e29144d6d2be3341df7d4c56c6095",
        "id": 2543,
        "profileId": 6179,
        "service": "x.com",
        "username": "soupxyz"
      },
      "events": [
        {
          "blockIndex": 29,
          "blockNumber": 28257388,
          "contract": "attestation",
          "createdAt": 1743304125,
          "id": 873453,
          "processed": true,
          "txHash": "0x2fd09c99521be6ba1fc4b68d6003fe9c6e5c5981ce333690091bde7d2928b43c",
          "updatedAt": 1743304126
        }
      ],
      "replySummary": {
        "count": 0,
        "participated": false
      },
      "subject": {
        "avatar": "https://pbs.twimg.com/profile_images/1838414217977741313/ZQzWzwfq.jpg",
        "description": "retail onboarding expert @travelswap_xyz @coin_voyage",
        "name": "soup",
        "primaryAddress": "0x532b2e0752Ec5c145509Ab586Da102a114C79Ac0",
        "profileId": 6179,
        "score": 1214,
        "scoreXpMultiplier": 1,
        "userkey": "profileId:6179",
        "username": "soupxyz"
      },
      "timestamp": 1743304123,
      "type": "attestation",
      "votes": {
        "downvotes": 0,
        "upvotes": 0
      }
    }
  ]
}
```

**Error Responses**

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "fields": [
      {
        "code": "invalid_type",
        "expected": "number",
        "message": "Expected number, received nan",
        "path": [
          "currentUserProfileId"
        ],
        "received": "nan"
      }
    ],
    "message": "Validation error"
  }
}
```

#### Example

**Request**

```bash
http POST https://api.ethos.network/api/v1/activities review:='[1, 2, 3]' vouch:='[4, 5, 6]' currentUserProfileId:=null
```

#### Notes

* The results are ordered by timestamp in descending order (newest first).
* At least one of the activity type arrays must be provided.

***

### Get Unified Activities

```
POST /api/v1/activities/unified
```

**Description**: Retrieves activities with advanced filtering and pagination options.

**Authentication Required**: No

#### Parameters

**Request Body**

```json
{
  "filter": ["review", "vouch", "attestation"],
  "ids": {
    "review": [1, 2, 3],
    "vouch": [4, 5, 6]
  },
  "cache": true,
  "orderBy": {
    "field": "timestamp",
    "direction": "desc"
  },
  "pagination": {
    "limit": 10,
    "offsets": {
      "review": 0,
      "vouch": 0,
      "attestation": 0
    }
  },
  "currentUserProfileId": null,
  "authorProfileIds": [456],
  "subjectProfileIds": [789],
  "authorServiceAccounts": [{"service": "x.com", "account": "123456789"}],
  "subjectServiceAccounts": [{"service": "x.com", "account": "987654321"}],
  "activityByAuthorAddresses": ["0x1234...5678"],
  "activityForSubjectAddresses": ["0x9876...5432"]
}
```

| Property                      | Type             | Required | Description                                                                                             |
| ----------------------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `filter`                      | array of strings | No       | Types of activities to include (defaults to all types)                                                  |
| `ids`                         | object           | No       | Specific activity IDs by type                                                                           |
| `cache`                       | boolean          | No       | Whether to use cached results (defaults to false)                                                       |
| `orderBy`                     | object           | Yes      | Sorting options                                                                                         |
| `orderBy.field`               | string           | Yes      | Field to sort by (defaults to "timestamp")                                                              |
| `orderBy.direction`           | string           | Yes      | Sort direction: "asc" or "desc" (defaults to "desc")                                                    |
| `pagination`                  | object           | Yes      | Pagination parameters                                                                                   |
| `pagination.limit`            | number           | Yes      | Number of results to return                                                                             |
| `pagination.offsets`          | object           | No       | Offset for each activity type                                                                           |
| `currentUserProfileId`        | number or null   | No       | Profile ID of the requesting user for personalized data; must be explicitly set to null if not provided |
| `authorProfileIds`            | array of numbers | No       | Filter by author profile IDs                                                                            |
| `subjectProfileIds`           | array of numbers | No       | Filter by subject profile IDs                                                                           |
| `authorServiceAccounts`       | array of objects | No       | Filter by author service accounts                                                                       |
| `subjectServiceAccounts`      | array of objects | No       | Filter by subject service accounts                                                                      |
| `activityByAuthorAddresses`   | array of strings | No       | Filter by author addresses                                                                              |
| `activityForSubjectAddresses` | array of strings | No       | Filter by subject addresses                                                                             |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "author": {
          "avatar": "https://pbs.twimg.com/profile_images/1742225898521182213/th4rllwL.jpg",
          "description": "Creative Engineer directing brands since 2012 | Cryptopunk 4745 | Artist",
          "name": "PENN",
          "primaryAddress": "0xAd8D22b89E55490e72bB5b06971F47C4B329e8b2",
          "profileId": 2006,
          "score": 1405,
          "scoreXpMultiplier": 1,
          "userkey": "address:0x92Cc6f95bdB9DcB70Ea1263c7F8B23E5D645C5c9",
          "username": "jeremypenn"
        },
        "data": {
          "archived": false,
          "attestationDetails": {
            "account": "3278906401",
            "service": "x.com"
          },
          "author": "0x92Cc6f95bdB9DcB70Ea1263c7F8B23E5D645C5c9",
          "comment": "The Gold Standard in Crypto",
          "createdAt": 1743306055,
          "id": 49815,
          "metadata": "{\"description\":\"they have been here and never left\"}",
          "score": "positive",
          "subject": "0x0000000000000000000000000000000000000000"
        },
        "events": [
          {
            "blockIndex": 285,
            "blockNumber": 28258354,
            "contract": "review",
            "createdAt": 1743306057,
            "id": 873762,
            "processed": true,
            "txHash": "0x8885b5d6c640c9e6cfa37a811f75d34682a5229eab2be2b318aa6cc65f3183ef",
            "updatedAt": 1743306058
          }
        ],
        "replySummary": {
          "count": 0,
          "participated": false
        },
        "subject": {
          "avatar": "https://pbs.twimg.com/profile_images/1895186503443316736/EaIM9RTY.jpg",
          "description": "🦊 The world's leading crypto wallet.\n \nNeed help? https://t.co/gIVYDT65Ls | @MetaMaskSupport 🧡",
          "name": "MetaMask.eth 🦊",
          "primaryAddress": "0x0000000000000000000000000000000000000000",
          "score": 1622,
          "scoreXpMultiplier": 1.25,
          "userkey": "service:x.com:3278906401",
          "username": "MetaMask"
        },
        "timestamp": 1743306055,
        "type": "review",
        "votes": {
          "downvotes": 0,
          "upvotes": 0
        }
      }
    ],
    "limit": 10,
    "offsets": {
      "review": 0,
      "vouch": 0
    },
    "total": 58976,
    "counts": {
      "review": 2
    }
  }
}
```

| Property       | Type    | Description                                |
| -------------- | ------- | ------------------------------------------ |
| `ok`           | boolean | Success status                             |
| `data`         | object  | Response data container                    |
| `data.values`  | array   | Array of activity objects                  |
| `data.limit`   | number  | Number of results returned                 |
| `data.offsets` | object  | Current pagination offsets                 |
| `data.total`   | number  | Total number of results matching the query |
| `data.counts`  | object  | Count of results by activity type          |

**Error Responses**

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "fields": [
      {
        "code": "invalid_type",
        "expected": "object",
        "message": "Required",
        "path": [
          "orderBy"
        ],
        "received": "undefined"
      }
    ],
    "message": "Validation error"
  }
}
```

#### Example

**Request**

```bash
http POST https://api.ethos.network/api/v1/activities/unified \
  filter:='["review", "vouch"]' \
  pagination:='{"limit": 2}' \
  orderBy:='{"field": "timestamp", "direction": "desc"}' \
  currentUserProfileId:=null
```

#### Notes

* The `orderBy` parameter is required, and must include both `field` and `direction`.
* The `currentUserProfileId` parameter must be explicitly set to `null` if not provided, otherwise a validation error might occur.
* The default activity filter includes review, vouch, attestation, invitation-accepted, unvouch, and slash activities.
* Results can be paginated using the `offsets` field in the pagination object, which allows specifying different offsets for each activity type.
* Activity scores use raw numbers (e.g., 1405) rather than the normalized 0-100 range mentioned in other parts of the documentation.
* The response includes detailed information for each activity, including author and subject details, event information, voting counts, and timestamps.
* The `data.counts` field provides a count of results by activity type.
* The `data.total` field indicates the total number of results matching the query across all activity types.

***

### Get Bulk Actors

```
POST /api/v1/activities/actors
```

**Description**: Retrieves multiple actors by their userkeys.

**Authentication Required**: No

#### Parameters

**Request Body**

```json
{
  "userkeys": ["profileId:123", "address:0x1234...5678", "service:x.com:123456789"]
}
```

| Property   | Type             | Required | Description       |
| ---------- | ---------------- | -------- | ----------------- |
| `userkeys` | array of strings | Yes      | Array of userkeys |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": [
    {
      "userkey": "profileId:123",
      "avatar": "https://example.com/avatar.jpg",
      "name": "Actor Name",
      "username": "actor_username",
      "description": "Actor description",
      "score": 95,
      "scoreXpMultiplier": 1,
      "profileId": 123,
      "primaryAddress": "0x1234...5678"
    }
  ]
}
```

#### Example

**Request**

```bash
http POST https://api.ethos.network/api/v1/activities/actors \
  userkeys:='["profileId:123", "address:0x1234...5678"]'
```

***

### Get Activity Votes

```
POST /api/v1/activities/votes
```

**Description**: Retrieves votes for multiple activities.

**Authentication Required**: No

#### Parameters

**Request Body**

```json
{
  "activities": [
    {"type": "review", "id": 1},
    {"type": "vouch", "id": 2}
  ],
  "voterProfileId": 123
}
```

| Property            | Type             | Required | Description                         |
| ------------------- | ---------------- | -------- | ----------------------------------- |
| `activities`        | array of objects | Yes      | Array of activity type and ID pairs |
| `activities[].type` | string           | Yes      | Activity type                       |
| `activities[].id`   | number           | Yes      | Activity ID                         |
| `voterProfileId`    | number           | Yes      | Profile ID of the voter             |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "attestation": {},
    "discussion": {},
    "review": {},
    "slash": {},
    "vouch": {}
  }
}
```

| Property           | Type    | Description                              |
| ------------------ | ------- | ---------------------------------------- |
| `ok`               | boolean | Success status                           |
| `data`             | object  | Container for vote data by activity type |
| `data.attestation` | object  | Votes for attestation activities         |
| `data.discussion`  | object  | Votes for discussion activities          |
| `data.review`      | object  | Votes for review activities              |
| `data.slash`       | object  | Votes for slash activities               |
| `data.vouch`       | object  | Votes for vouch activities               |

#### Example

**Request**

```bash
http POST https://api.ethos.network/api/v1/activities/votes \
  activities:='[{"type": "review", "id": 49815}, {"type": "vouch", "id": 1}]' \
  voterProfileId:=123
```

#### Notes

* If there are no votes from the specified voter for the requested activities, the endpoint returns empty objects for each activity type as shown in the example response.
* When votes exist for a requested activity, the response would include the activity ID as a key in the corresponding activity type object, with vote details as the value.
*   For example, if the user with profile ID 123 had voted on a review with ID 1, the structure would look like:

    ```json
    {
      "ok": true,
      "data": {
        "attestation": {},
        "discussion": {},
        "review": {
          "1": {
            "userVote": {
              "direction": "up",
              "voter": 123,
              "timestamp": 1735603200
            },
            "counts": {
              "upvotes": 5,
              "downvotes": 2
            }
          }
        },
        "slash": {},
        "vouch": {}
      }
    }
    ```
* The `userVote` field contains information about the user's own vote, including the vote direction ("up" or "down").
* The `counts` field shows the total upvotes and downvotes for the activity.
* The supported activity types in the response are: attestation, discussion, review, slash, and vouch.

***

### Get Invites Accepted By Profile

```
GET /api/v1/activities/invite/accepted-by/:profileId
```

**Description**: Retrieves actors who have accepted invitations from the specified profile.

**Authentication Required**: No

#### Parameters

**Path Parameters**

| Name        | Type   | Required | Description                                         |
| ----------- | ------ | -------- | --------------------------------------------------- |
| `profileId` | number | Yes      | The profile ID of the user who sent the invitations |

**Query Parameters**

| Name    | Type   | Required | Description                         |
| ------- | ------ | -------- | ----------------------------------- |
| `limit` | number | No       | Maximum number of results to return |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": [
    {
      "userkey": "profileId:123",
      "avatar": "https://example.com/avatar.jpg",
      "name": "Actor Name",
      "username": "actor_username",
      "description": "Actor description",
      "score": 95,
      "scoreXpMultiplier": 1,
      "profileId": 123,
      "primaryAddress": "0x1234...5678"
    }
  ]
}
```

#### Example

**Request**

```bash
http GET https://api.ethos.network/api/v1/activities/invite/accepted-by/456 limit==10
```
