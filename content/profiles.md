# Profiles API

## Overview

The Profiles API allows you to access user profile information within the Ethos network. It provides endpoints for querying individual profiles, recent profiles, directory listings, and various leaderboards.

## Endpoints

### Query Profiles

```
POST /api/v1/profiles
```

**Description**: Retrieves profile information for the specified profile IDs or addresses.

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "ids": [1, 2, 3],
  "addresses": ["0x1234...5678", "0xabcd...ef12"],
  "archived": false,
  "useCache": true,
  "limit": 10,
  "offset": 0
}
```

| Property    | Type             | Required | Description                                         |
| ----------- | ---------------- | -------- | --------------------------------------------------- |
| `ids`       | array of numbers | No*      | Array of numeric profile IDs to query (maximum 100) |
| `addresses` | array of strings | No*      | Array of Ethereum addresses to query (maximum 100)  |
| `archived`  | boolean          | No       | Whether to include archived profiles                |
| `useCache`  | boolean          | No       | Whether to use cached results (defaults to true)    |
| `limit`     | number           | Yes      | Number of results to return (maximum 100)           |
| `offset`    | number           | Yes      | Offset for pagination                               |

*At least one of `ids` or `addresses` must be provided.

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": 1,
        "archived": false,
        "createdAt": 1737052979,
        "updatedAt": 1743189764,
        "invitesAvailable": 25,
        "invitedBy": 1
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 1
  }
}
```

| Property                         | Type    | Description                                         |
| -------------------------------- | ------- | --------------------------------------------------- |
| `ok`                             | boolean | Success status                                      |
| `data`                           | object  | Response data container                             |
| `data.values`                    | array   | Array of profile objects                            |
| `data.values[].id`               | number  | Unique profile ID                                   |
| `data.values[].archived`         | boolean | Whether the profile is archived                     |
| `data.values[].createdAt`        | number  | Unix timestamp of when the profile was created      |
| `data.values[].updatedAt`        | number  | Unix timestamp of when the profile was last updated |
| `data.values[].invitesAvailable` | number  | Number of invites available to this profile         |
| `data.values[].invitedBy`        | number  | ID of the profile that invited this user            |
| `data.limit`                     | number  | Number of results returned                          |
| `data.offset`                    | number  | Current pagination offset                           |
| `data.total`                     | number  | Total number of results matching the query          |

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "Must specify either ids or addresses",
    "fields": ["ids", "addresses"]
  }
}
```

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/profiles \
  ids:='[1]' \
  limit=10 \
  offset=0
```

##### Response

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": 1,
        "archived": false,
        "createdAt": 1737052979,
        "updatedAt": 1743189764,
        "invitesAvailable": 25,
        "invitedBy": 1
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 1
  }
}
```

#### Notes

- The API enforces a maximum of 100 profiles that can be requested at once.
- Results are returned in descending order by creation date (newest first).
- For performance reasons, it's recommended to use the `useCache` parameter.
- Timestamps are returned in Unix epoch format (seconds since January 1, 1970).

---

### Recent Profiles

```
POST /api/v1/profiles/recent
```

**Description**: Retrieves recently created profiles, ordered by creation date (newest first).

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "archived": false,
  "limit": 10,
  "offset": 0
}
```

| Property   | Type    | Required | Description                                              |
| ---------- | ------- | -------- | -------------------------------------------------------- |
| `archived` | boolean | No       | Whether to include archived profiles (defaults to false) |
| `limit`    | number  | No       | Number of results to return (maximum 5000)               |
| `offset`   | number  | No       | Offset for pagination                                    |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": 6177,
        "archived": false,
        "createdAt": 1743301753,
        "updatedAt": 1743301754,
        "invitesAvailable": 0,
        "invitedBy": 3582
      },
      {
        "id": 6176,
        "archived": false,
        "createdAt": 1743297261,
        "updatedAt": 1743297263,
        "invitesAvailable": 0,
        "invitedBy": 4964
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 6177
  }
}
```

| Property                         | Type    | Description                                         |
| -------------------------------- | ------- | --------------------------------------------------- |
| `ok`                             | boolean | Success status                                      |
| `data`                           | object  | Response data container                             |
| `data.values`                    | array   | Array of profile objects                            |
| `data.values[].id`               | number  | Unique profile ID                                   |
| `data.values[].archived`         | boolean | Whether the profile is archived                     |
| `data.values[].createdAt`        | number  | Unix timestamp of when the profile was created      |
| `data.values[].updatedAt`        | number  | Unix timestamp of when the profile was last updated |
| `data.values[].invitesAvailable` | number  | Number of invites available to this profile         |
| `data.values[].invitedBy`        | number  | ID of the profile that invited this user            |
| `data.limit`                     | number  | Number of results returned                          |
| `data.offset`                    | number  | Current pagination offset                           |
| `data.total`                     | number  | Total number of results matching the query          |

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/profiles/recent limit:=10 offset:=0
```

##### Response

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": 6177,
        "archived": false,
        "createdAt": 1743301753,
        "updatedAt": 1743301754,
        "invitesAvailable": 0,
        "invitedBy": 3582
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 6177
  }
}
```

#### Notes

- The API returns profiles in descending order by creation date (newest first).
- Timestamps are returned in Unix epoch format (seconds since January 1, 1970).

---

### Directory

```
GET /api/v1/profiles/directory
```

**Description**: Returns a directory listing of profiles with additional actor information.

**Authentication Required**: No

#### Parameters

##### Query Parameters

| Name            | Type    | Required | Description                                                                   |
| --------------- | ------- | -------- | ----------------------------------------------------------------------------- |
| `archived`      | boolean | No       | Whether to include archived profiles (defaults to false)                      |
| `sortField`     | string  | No       | Field to sort by: 'createdAt' or 'invitesAvailable' (defaults to 'createdAt') |
| `sortDirection` | string  | No       | Direction to sort: 'asc' or 'desc' (defaults to 'desc')                       |
| `inviteFilter`  | string  | No       | Filter by invite status: 'hasInvites' or 'noInvites'                          |
| `limit`         | number  | No       | Number of results to return (maximum 100)                                     |
| `offset`        | number  | No       | Offset for pagination                                                         |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": 6177,
        "archived": false,
        "createdAt": 1743301753,
        "updatedAt": 1743301754,
        "invitesAvailable": 0,
        "invitedBy": 3582,
        "actor": {
          "userkey": "profileId:6177",
          "avatar": "https://ipfs.io/ipfs/QmUsRdYdcA9HfgEyBp1ghtx3KYTEf5yHauwBnrrrGWEUNC/121.png",
          "name": "stray-cat.eth",
          "username": null,
          "description": null,
          "score": 1214,
          "scoreXpMultiplier": 1,
          "profileId": 6177,
          "primaryAddress": "0x1c72bDc0F2C9bc581A71cA629412FEA85457c45A"
        },
        "inviterActor": {
          "userkey": "profileId:3582",
          "avatar": "https://pbs.twimg.com/profile_images/1895139264335110144/htoLwApK.jpg",
          "name": "Elia |",
          "username": "Eliacc88",
          "description": "@0xAlphaGEMs",
          "score": 1431,
          "scoreXpMultiplier": 1,
          "profileId": 3582,
          "primaryAddress": "0x5A57adBaAaC4eE78B624E4D9c063927d9Ed60e1A"
        }
      }
    ],
    "limit": 5,
    "offset": 0,
    "total": 6177
  }
}
```

| Property                                | Type    | Description                                         |
| --------------------------------------- | ------- | --------------------------------------------------- |
| `ok`                                    | boolean | Success status                                      |
| `data`                                  | object  | Response data container                             |
| `data.values`                           | array   | Array of profile objects                            |
| `data.values[].id`                      | number  | Unique profile ID                                   |
| `data.values[].archived`                | boolean | Whether the profile is archived                     |
| `data.values[].createdAt`               | number  | Unix timestamp of when the profile was created      |
| `data.values[].updatedAt`               | number  | Unix timestamp of when the profile was last updated |
| `data.values[].invitesAvailable`        | number  | Number of invites available to this profile         |
| `data.values[].invitedBy`               | number  | ID of the profile that invited this user            |
| `data.values[].actor`                   | object  | Actor information for the profile                   |
| `data.values[].actor.userkey`           | string  | Unique user key                                     |
| `data.values[].actor.avatar`            | string  | URL to the user's avatar                            |
| `data.values[].actor.name`              | string  | User's display name                                 |
| `data.values[].actor.username`          | string  | User's username (may be null)                       |
| `data.values[].actor.description`       | string  | User's description (may be null)                    |
| `data.values[].actor.score`             | number  | User's score                                        |
| `data.values[].actor.scoreXpMultiplier` | number  | User's score XP multiplier                          |
| `data.values[].actor.profileId`         | number  | User's profile ID                                   |
| `data.values[].actor.primaryAddress`    | string  | User's primary Ethereum address                     |
| `data.values[].inviterActor`            | object  | Actor information for the inviter profile           |
| `data.limit`                            | number  | Number of results returned                          |
| `data.offset`                           | number  | Current pagination offset                           |
| `data.total`                            | number  | Total number of results matching the query          |

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/profiles/directory limit:=5 offset:=0
```

##### Response

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": 6177,
        "archived": false,
        "createdAt": 1743301753,
        "updatedAt": 1743301754,
        "invitesAvailable": 0,
        "invitedBy": 3582,
        "actor": {
          "userkey": "profileId:6177",
          "avatar": "https://ipfs.io/ipfs/QmUsRdYdcA9HfgEyBp1ghtx3KYTEf5yHauwBnrrrGWEUNC/121.png",
          "name": "stray-cat.eth",
          "username": null,
          "description": null,
          "score": 1214,
          "scoreXpMultiplier": 1,
          "profileId": 6177,
          "primaryAddress": "0x1c72bDc0F2C9bc581A71cA629412FEA85457c45A"
        },
        "inviterActor": {
          "userkey": "profileId:3582",
          "avatar": "https://pbs.twimg.com/profile_images/1895139264335110144/htoLwApK.jpg",
          "name": "Elia |",
          "username": "Eliacc88",
          "description": "@0xAlphaGEMs",
          "score": 1431,
          "scoreXpMultiplier": 1,
          "profileId": 3582,
          "primaryAddress": "0x5A57adBaAaC4eE78B624E4D9c063927d9Ed60e1A"
        }
      }
    ],
    "limit": 5,
    "offset": 0,
    "total": 6177
  }
}
```

#### Notes

- By default, results are sorted by creation date in descending order (newest first).
- You can sort by invite availability using the `sortField` parameter.
- You can filter to only show profiles with or without invites using the `inviteFilter` parameter.
- Timestamps are returned in Unix epoch format (seconds since January 1, 1970).

---

### Credibility Leaderboard

```
GET /api/v1/profiles/credibility-leaderboard
```

**Description**: Returns profiles ranked by credibility score in descending order.

**Authentication Required**: No

#### Parameters

##### Query Parameters

| Name    | Type   | Required | Description                                             |
| ------- | ------ | -------- | ------------------------------------------------------- |
| `order` | string | No       | Direction to sort: 'asc' or 'desc' (defaults to 'desc') |
| `limit` | number | No       | Number of results to return (defaults to 50)            |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": [
    {
      "id": 4678,
      "profileId": 2116,
      "displayName": "Abhi",
      "username": "0xAbhiP",
      "avatarUrl": "https://pbs.twimg.com/profile_images/1862162587976445952/30wBtaB0.jpg",
      "description": "founder @apcollectiveio | growing crypto companies | leading narratives | nothing i tweet is financial advice",
      "score": 2061,
      "status": "ACTIVE",
      "userkeys": [
        "address:0xA52f64a3A87a5Df0763526594c792543AE83DC1b",
        "profileId:2116",
        "address:0x089C6634ba6754F6406bE19edA335F2d86553d28",
        "service:x.com:1517008053614555137"
      ]
    },
    {
      "id": 24918,
      "profileId": 3029,
      "displayName": "Sanjay",
      "username": "SanjayWeb3",
      "avatarUrl": "https://pbs.twimg.com/profile_images/1808961844045910016/145Ib6Vs.jpg",
      "description": "Forbes Web3 Content Creator of the year 🎥 Founder @SpectrumSP_ 👨🏻‍💻",
      "score": 2030,
      "status": "ACTIVE",
      "userkeys": [
        "address:0x4D22A9E60678C3852B09874db45718DDcDe2685E",
        "address:0x68e33A587f1d697c5e0f8b8794cFA304B41a61e2",
        "service:x.com:790706675011297280",
        "profileId:3029"
      ]
    }
  ]
}
```

| Property             | Type    | Description                                 |
| -------------------- | ------- | ------------------------------------------- |
| `ok`                 | boolean | Success status                              |
| `data`               | array   | Array of user objects                       |
| `data[].id`          | number  | Unique user ID                              |
| `data[].profileId`   | number  | Profile ID (may be null for inactive users) |
| `data[].displayName` | string  | User's display name                         |
| `data[].username`    | string  | User's username                             |
| `data[].avatarUrl`   | string  | URL to the user's avatar                    |
| `data[].description` | string  | User's description                          |
| `data[].score`       | number  | User's credibility score                    |
| `data[].status`      | string  | User's status (ACTIVE or INACTIVE)          |
| `data[].userkeys`    | array   | Array of userkeys associated with the user  |

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/profiles/credibility-leaderboard limit:=2
```

##### Response

```json
{
  "ok": true,
  "data": [
    {
      "id": 4678,
      "profileId": 2116,
      "displayName": "Abhi",
      "username": "0xAbhiP",
      "avatarUrl": "https://pbs.twimg.com/profile_images/1862162587976445952/30wBtaB0.jpg",
      "description": "founder @apcollectiveio | growing crypto companies | leading narratives | nothing i tweet is financial advice",
      "score": 2061,
      "status": "ACTIVE",
      "userkeys": [
        "address:0xA52f64a3A87a5Df0763526594c792543AE83DC1b",
        "profileId:2116",
        "address:0x089C6634ba6754F6406bE19edA335F2d86553d28",
        "service:x.com:1517008053614555137"
      ]
    },
    {
      "id": 24918,
      "profileId": 3029,
      "displayName": "Sanjay",
      "username": "SanjayWeb3",
      "avatarUrl": "https://pbs.twimg.com/profile_images/1808961844045910016/145Ib6Vs.jpg",
      "description": "Forbes Web3 Content Creator of the year 🎥 Founder @SpectrumSP_ 👨🏻‍💻",
      "score": 2030,
      "status": "ACTIVE",
      "userkeys": [
        "address:0x4D22A9E60678C3852B09874db45718DDcDe2685E",
        "address:0x68e33A587f1d697c5e0f8b8794cFA304B41a61e2",
        "service:x.com:790706675011297280",
        "profileId:3029"
      ]
    }
  ]
}
```

#### Notes

- Certain profiles, such as the main Ethos Network profile and administrative profiles, are excluded from the leaderboard.
- By default, results are sorted by credibility score in descending order (highest first).

---

### Profile Stats

```
GET /api/v1/profiles/stats
```

**Description**: Returns aggregate statistics about profiles on the platform.

**Authentication Required**: No

#### Parameters

None.

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "activeProfiles": 6177,
    "invitesAvailable": 12453
  }
}
```

| Property                | Type    | Description                                           |
| ----------------------- | ------- | ----------------------------------------------------- |
| `ok`                    | boolean | Success status                                        |
| `data`                  | object  | Stats data                                            |
| `data.activeProfiles`   | number  | Total number of active (non-archived) profiles        |
| `data.invitesAvailable` | number  | Total number of invites available across all profiles |

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/profiles/stats
```

##### Response

```json
{
  "ok": true,
  "data": {
    "activeProfiles": 6177,
    "invitesAvailable": 12453
  }
}
```

---

### XP Leaderboard

```
GET /api/v1/profiles/xp-leaderboard
```

**Description**: Returns profiles ranked by XP points in descending order.

**Authentication Required**: No

#### Parameters

##### Query Parameters

| Name    | Type   | Required | Description                                                                                                      |
| ------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `since` | string | No       | Only include XP earned since this date/time (ISO date format like '2023-01-01' or duration string like '1month') |
| `limit` | number | No       | Number of results to return (defaults to 50)                                                                     |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": [
    {
      "id": 19867,
      "profileId": 17,
      "displayName": "sketch",
      "username": "eskacie",
      "avatarUrl": "https://pbs.twimg.com/profile_images/1874244830190329858/IcrIFc6L.jpg",
      "description": "Design / Code / Create / Collect",
      "score": 1964,
      "status": "ACTIVE",
      "totalXp": 3521336,
      "userkeys": [
        "profileId:17",
        "address:0x5586d438BE5920143c0f9B179835778fa81a544a",
        "address:0x6f95934abc01eedA154C832dF4a4E210cAF877eb",
        "service:x.com:1461538142217912326"
      ]
    }
  ]
}
```

| Property             | Type    | Description                                |
| -------------------- | ------- | ------------------------------------------ |
| `ok`                 | boolean | Success status                             |
| `data`               | array   | Array of user objects                      |
| `data[].id`          | number  | Unique user ID                             |
| `data[].profileId`   | number  | Profile ID                                 |
| `data[].displayName` | string  | User's display name                        |
| `data[].username`    | string  | User's username                            |
| `data[].avatarUrl`   | string  | URL to the user's avatar                   |
| `data[].description` | string  | User's description                         |
| `data[].score`       | number  | User's credibility score                   |
| `data[].status`      | string  | User's status (ACTIVE or INACTIVE)         |
| `data[].userkeys`    | array   | Array of userkeys associated with the user |
| `data[].totalXp`     | number  | Total XP points accumulated                |

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/profiles/xp-leaderboard since:='2023-01-01' limit:=5
```

##### Response

```json
{
  "ok": true,
  "data": [
    {
      "id": 19867,
      "profileId": 17,
      "displayName": "sketch",
      "username": "eskacie",
      "avatarUrl": "https://pbs.twimg.com/profile_images/1874244830190329858/IcrIFc6L.jpg",
      "description": "Design / Code / Create / Collect",
      "score": 1964,
      "status": "ACTIVE",
      "totalXp": 3521336,
      "userkeys": [
        "profileId:17",
        "address:0x5586d438BE5920143c0f9B179835778fa81a544a",
        "address:0x6f95934abc01eedA154C832dF4a4E210cAF877eb",
        "service:x.com:1461538142217912326"
      ]
    }
  ]
}
```

#### Notes

- By default, results are sorted by total XP in descending order (highest first).
- Limited to the top 50 profiles by default.
- The `since` parameter can be specified either as an ISO date string (e.g., '2023-01-01') or as a duration string (e.g., '1month', '1week').
- When using the `since` parameter, the API returns only users who have earned XP during the specified period. If no users have earned XP in that period, an empty array is returned.
- Results are cached for 5 minutes for better performance.
- Certain profiles, such as the main Ethos Network profile and administrative profiles, are excluded from the leaderboard.

---

### Profiles with Attestation

```
GET /api/v1/profiles/with-x-attestation
```

**Description**: Returns profiles that have a valid X (Twitter) attestation, paginated and ordered by profile ID.

**Authentication Required**: No

#### Parameters

##### Query Parameters

| Name     | Type   | Required | Description                                               |
| -------- | ------ | -------- | --------------------------------------------------------- |
| `limit`  | number | No       | Number of results to return (default: 100, maximum: 1000) |
| `offset` | number | No       | Offset for pagination (default: 0)                        |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "profileId": 1,
        "twitterUserId": "1738066467558395904",
        "twitterUsername": "ethos_network",
        "address": "0x9E2218375567BB466b81E38E1a8b599b6250408C"
      },
      {
        "profileId": 2,
        "twitterUserId": "122810186",
        "twitterUsername": "porkbus",
        "address": "0x2B9A677752998AfbC99f1eED6e4B684AD5C6765a"
      }
    ],
    "limit": 2,
    "offset": 0,
    "total": 2533
  }
}
```

| Property                        | Type    | Description                                          |
| ------------------------------- | ------- | ---------------------------------------------------- |
| `ok`                            | boolean | Success status                                       |
| `data`                          | object  | Response data container                              |
| `data.values`                   | array   | Array of profile objects                             |
| `data.values[].profileId`       | number  | Profile ID                                           |
| `data.values[].twitterUserId`   | string  | X (Twitter) user ID                                  |
| `data.values[].twitterUsername` | string  | X (Twitter) username                                 |
| `data.values[].address`         | string  | Primary Ethereum address associated with the profile |
| `data.limit`                    | number  | Number of results returned                           |
| `data.offset`                   | number  | Current pagination offset                            |
| `data.total`                    | number  | Total number of results matching the query           |

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/profiles/with-x-attestation limit:=2 offset:=0
```

##### Response

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "profileId": 1,
        "twitterUserId": "1738066467558395904",
        "twitterUsername": "ethos_network",
        "address": "0x9E2218375567BB466b81E38E1a8b599b6250408C"
      },
      {
        "profileId": 2,
        "twitterUserId": "122810186",
        "twitterUsername": "porkbus",
        "address": "0x2B9A677752998AfbC99f1eED6e4B684AD5C6765a"
      }
    ],
    "limit": 2,
    "offset": 0,
    "total": 2533
  }
}
```

#### Notes

- Results are sorted by profile ID in ascending order.
- Only non-archived attestations are included.
- For each profile, only the first (primary) address is returned.
- The limit parameter has a maximum value of 1000.
- This endpoint is useful for querying which profiles have connected their X (Twitter) accounts.
