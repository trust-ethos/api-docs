# Activities API

## Overview

The Activities API provides endpoints for retrieving activities on the Ethos network. Activities represent various actions users can take, including vouches, reviews, attestations, and invitations. This API allows clients to query individual activities, fetch multiple activities by type and ID, and retrieve activity actors.

## Endpoints

### Get Activity

```
GET /api/v1/activities/:type/:id
```

**Description**: Retrieves a single activity by its type and ID or transaction hash. If a transaction hash is provided, it will process the blockchain event and retrieve the corresponding activity.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | string | Yes | Type of activity (e.g., "vouch", "review", "attestation", "slash") |
| `id` | string | Yes | Activity ID or transaction hash |

##### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `currentUserProfileId` | number | No | Profile ID of the current user (for retrieving user-specific data like votes) |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "type": "vouch",
  "data": {
    "id": 123,
    "authorProfileId": 456,
    "subjectProfileId": 789,
    "comment": "Great contributor!",
    "amount": "0.1",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  "timestamp": "2023-01-01T00:00:00Z",
  "votes": {
    "up": 5,
    "down": 1
  },
  "replySummary": {
    "count": 2
  },
  "author": {
    "profileId": 456,
    "name": "Alice",
    "avatarUrl": "https://example.com/avatar.png"
  },
  "subject": {
    "profileId": 789,
    "name": "Bob",
    "avatarUrl": "https://example.com/avatar2.png"
  },
  "events": [
    {
      "id": 1,
      "txHash": "0x123...",
      "blockNumber": 12345,
      "timestamp": "2023-01-01T00:00:00Z"
    }
  ]
}
```

The response structure varies based on the activity type but follows this general pattern. The `data` field contains activity-specific details.

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "error": "Invalid activity id",
  "code": "BAD_REQUEST"
}
```

**Code**: 404 Not Found

```json
{
  "error": "Activity not found",
  "code": "NOT_FOUND"
}
```

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/activities/vouch/123
```

---

### Get Multiple Activities

```
POST /api/v1/activities
```

**Description**: Retrieves multiple activities by their type and IDs. This is a bulk endpoint that allows querying for various activities at once.

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "review": [1, 2, 3],
  "vouch": [4, 5, 6],
  "attestation": [7, 8, 9],
  "invitation-accepted": [10, 11, 12],
  "currentUserProfileId": 123
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `review` | number[] | No | Array of review activity IDs |
| `vouch` | number[] | No | Array of vouch activity IDs |
| `unvouch` | number[] | No | Array of unvouch activity IDs |
| `attestation` | number[] | No | Array of attestation activity IDs |
| `invitation-accepted` | number[] | No | Array of invitation accepted activity IDs |
| `currentUserProfileId` | number | No | Profile ID of the current user (for retrieving user-specific data like votes) |

At least one activity type array must be provided.

#### Responses

##### Success Response

**Code**: 200 OK

```json
[
  {
    "type": "vouch",
    "data": {
      "id": 4,
      "authorProfileId": 456,
      "subjectProfileId": 789,
      "comment": "Great contributor!",
      "amount": "0.1",
      "createdAt": "2023-01-01T00:00:00Z"
    },
    "timestamp": "2023-01-01T00:00:00Z",
    "votes": {
      "up": 5,
      "down": 1
    },
    "replySummary": {
      "count": 2
    },
    "author": {
      "profileId": 456,
      "name": "Alice",
      "avatarUrl": "https://example.com/avatar.png"
    },
    "subject": {
      "profileId": 789,
      "name": "Bob",
      "avatarUrl": "https://example.com/avatar2.png"
    },
    "events": [
      {
        "id": 1,
        "txHash": "0x123...",
        "blockNumber": 12345,
        "timestamp": "2023-01-01T00:00:00Z"
      }
    ]
  },
  {
    "type": "review",
    "data": {
      "id": 1,
      "authorProfileId": 456,
      "subjectProfileId": 789,
      "comment": "Excellent work!",
      "rating": 5,
      "createdAt": "2023-01-01T00:00:00Z"
    },
    "timestamp": "2023-01-01T00:00:00Z",
    "votes": {
      "up": 3,
      "down": 0
    },
    "replySummary": {
      "count": 1
    },
    "author": {
      "profileId": 456,
      "name": "Alice",
      "avatarUrl": "https://example.com/avatar.png"
    },
    "subject": {
      "profileId": 789,
      "name": "Bob",
      "avatarUrl": "https://example.com/avatar2.png"
    },
    "events": [
      {
        "id": 2,
        "txHash": "0x456...",
        "blockNumber": 12346,
        "timestamp": "2023-01-01T00:00:00Z"
      }
    ]
  }
]
```

The response is an array of activity objects, ordered by timestamp in descending order. Each activity follows the same structure as the single activity response.

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/activities \
  review:='[1, 2, 3]' \
  vouch:='[4, 5, 6]'
```

---

### Get Unified Activities

```
POST /api/v1/activities/unified
```

**Description**: Retrieves a unified paginated list of activities based on various filters. This endpoint provides more advanced filtering and pagination options than the regular activities endpoint.

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "filter": ["vouch", "review", "attestation"],
  "target": "alice.eth",
  "direction": "author",
  "dayRange": 30,
  "currentUserProfileId": 123,
  "orderBy": {
    "field": "timestamp",
    "direction": "desc"
  },
  "pagination": {
    "limit": 10,
    "cursors": {
      "vouch": "next_cursor_token",
      "review": "next_cursor_token"
    }
  },
  "excludeHistorical": false,
  "cache": true
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `filter` | string[] | No | Array of activity types to include (defaults to all types) |
| `target` | string | No | User key (address, profile ID, nickname, ENS) to filter activities by |
| `direction` | string | No | Direction of activities to retrieve: "author" (activities by the target) or "subject" (activities about the target) |
| `dayRange` | number | No | Filter activities to those created in the last N days (1-90) |
| `currentUserProfileId` | number | No | Profile ID of the current user (for retrieving user-specific data like votes) |
| `orderBy` | object | Yes | Sorting options |
| `orderBy.field` | string | Yes | Field to sort by: "timestamp", "votes", "controversial", "hot", "rising" |
| `orderBy.direction` | string | Yes | Sort direction: "asc" or "desc" |
| `pagination` | object | Yes | Pagination options |
| `pagination.limit` | number | Yes | Maximum number of activities to return per type |
| `pagination.cursors` | object | No | Cursor tokens for pagination (keyed by activity type) |
| `excludeHistorical` | boolean | No | Whether to exclude historical activities (default: false) |
| `cache` | boolean | No | Whether to use cached results (default: false) |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "values": [
    {
      "type": "vouch",
      "data": {
        "id": 123,
        "authorProfileId": 456,
        "subjectProfileId": 789,
        "comment": "Great contributor!",
        "amount": "0.1",
        "createdAt": "2023-01-01T00:00:00Z"
      },
      "timestamp": "2023-01-01T00:00:00Z",
      "votes": {
        "up": 5,
        "down": 1
      },
      "replySummary": {
        "count": 2
      },
      "author": {
        "profileId": 456,
        "name": "Alice",
        "avatarUrl": "https://example.com/avatar.png"
      },
      "subject": {
        "profileId": 789,
        "name": "Bob",
        "avatarUrl": "https://example.com/avatar2.png"
      },
      "events": [
        {
          "id": 1,
          "txHash": "0x123...",
          "blockNumber": 12345,
          "timestamp": "2023-01-01T00:00:00Z"
        }
      ]
    }
  ],
  "pagination": {
    "cursors": {
      "vouch": "next_cursor_token",
      "review": "next_cursor_token"
    },
    "hasMore": {
      "vouch": true,
      "review": false
    }
  }
}
```

The response includes an array of activity objects in the `values` field, ordered according to the specified criteria. The `pagination` field contains cursor tokens for the next page of each activity type and indicates if there are more activities available.

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/activities/unified \
  filter:='["vouch", "review"]' \
  target="alice.eth" \
  direction="author" \
  orderBy:='{"field": "timestamp", "direction": "desc"}' \
  pagination:='{"limit": 10}'
```

---

### Get Activity Actor

```
GET /api/v1/activities/actor/:userkey
```

**Description**: Retrieves actor information for a specific user. Actors represent users in the context of activities.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userkey` | string | Yes | User identifier (address, profile ID, nickname, or ENS name) |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "profileId": 123,
  "name": "Alice",
  "avatarUrl": "https://example.com/avatar.png",
  "score": 85,
  "xp": 1200,
  "address": "0x123..."
}
```

| Property | Type | Description |
|----------|------|-------------|
| `profileId` | number | Profile ID of the actor |
| `name` | string | Display name of the actor |
| `avatarUrl` | string | URL to the actor's avatar image |
| `score` | number | Reputation score of the actor |
| `xp` | number | Experience points of the actor |
| `address` | string | Ethereum address of the actor |

##### Error Responses

**Code**: 404 Not Found

```json
{
  "error": "Actor not found",
  "code": "NOT_FOUND"
}
```

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/activities/actor/alice.eth
```

---

### Get Bulk Actors

```
POST /api/v1/activities/actors
```

**Description**: Retrieves actor information for multiple users. This is a bulk endpoint that allows querying for various actors at once.

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "userkeys": ["alice.eth", "0x123...", "bob"]
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `userkeys` | string[] | Yes | Array of user identifiers (addresses, profile IDs, nicknames, or ENS names) |

#### Responses

##### Success Response

**Code**: 200 OK

```json
[
  {
    "profileId": 123,
    "name": "Alice",
    "avatarUrl": "https://example.com/avatar.png",
    "score": 85,
    "xp": 1200,
    "address": "0x123..."
  },
  {
    "profileId": 456,
    "name": "Bob",
    "avatarUrl": "https://example.com/avatar2.png",
    "score": 92,
    "xp": 1500,
    "address": "0x456..."
  }
]
```

The response is an array of actor objects with the same structure as the single actor response.

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/activities/actors \
  userkeys:='["alice.eth", "bob"]'
```

---

### Get Votes

```
POST /api/v1/activities/votes
```

**Description**: Retrieves vote information for multiple activities. This endpoint allows clients to fetch both the vote counts and the current user's votes for various activities.

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "review": [1, 2, 3],
  "vouch": [4, 5, 6],
  "discussion": [7, 8, 9],
  "attestation": [10, 11, 12],
  "slash": [13, 14, 15],
  "connectedProfile": 123,
  "includeArchived": false
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `review` | number[] | No | Array of review activity IDs |
| `vouch` | number[] | No | Array of vouch activity IDs |
| `discussion` | number[] | No | Array of discussion activity IDs |
| `attestation` | number[] | No | Array of attestation activity IDs |
| `slash` | number[] | No | Array of slash activity IDs |
| `connectedProfile` | number | No | Profile ID of the connected user (to get their votes) |
| `includeArchived` | boolean | No | Whether to include archived activities (default: false) |

At least one activity type array must be provided.

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "review": {
    "1": {
      "userVote": "up",
      "counts": {
        "up": 5,
        "down": 1
      }
    },
    "2": {
      "userVote": null,
      "counts": {
        "up": 3,
        "down": 2
      }
    }
  },
  "vouch": {
    "4": {
      "userVote": "down",
      "counts": {
        "up": 2,
        "down": 3
      }
    }
  }
}
```

The response is an object with activity types as keys. Each activity type has an object with activity IDs as keys, containing vote information for that activity:
- `userVote`: The connected user's vote ("up", "down", or null if no vote)
- `counts`: The total counts of up and down votes

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/activities/votes \
  review:='[1, 2, 3]' \
  vouch:='[4, 5, 6]' \
  connectedProfile:=123
```

---

### Get Invites Accepted By

```
GET /api/v1/activities/invite/accepted-by/:profileId
```

**Description**: Retrieves a list of users who have accepted invitations from a specific profile.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `profileId` | number | Yes | Profile ID to get accepted invites for |

##### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | number | No | Maximum number of results to return |

#### Responses

##### Success Response

**Code**: 200 OK

```json
[
  {
    "profileId": 123,
    "name": "Alice",
    "avatarUrl": "https://example.com/avatar.png",
    "score": 85,
    "xp": 1200,
    "address": "0x123..."
  },
  {
    "profileId": 456,
    "name": "Bob",
    "avatarUrl": "https://example.com/avatar2.png",
    "score": 92,
    "xp": 1500,
    "address": "0x456..."
  }
]
```

The response is an array of actor objects representing users who have accepted invitations from the specified profile.

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/activities/invite/accepted-by/123 \
  limit==10
```
