# Profile API

## Overview

The Profile API provides endpoints for retrieving and managing user profiles on the Ethos network. Profiles represent users and contain information about their identity, reputation, and on-chain activities.

## Endpoints

### Query Profiles

```
POST /api/v1/profiles
```

**Description**: Queries profiles based on provided criteria such as profile IDs, addresses, or nicknames.

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "profileIds": [1, 2, 3],
  "addresses": ["0x123...", "0x456..."],
  "nicknames": ["alice", "bob"],
  "ensNames": ["alice.eth", "bob.eth"],
  "includeShadowProfiles": false,
  "archived": false,
  "useCache": true,
  "pagination": {
    "limit": 10,
    "offset": 0
  }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `profileIds` | number[] | No* | Array of profile IDs to query (max 100) |
| `addresses` | string[] | No* | Array of Ethereum addresses to query (max 100) |
| `nicknames` | string[] | No | Array of profile nicknames to query |
| `ensNames` | string[] | No | Array of ENS names to query |
| `archived` | boolean | No | Whether to include archived profiles |
| `includeShadowProfiles` | boolean | No | Whether to include shadow profiles (default: false) |
| `useCache` | boolean | No | Whether to use cached results (default: true) |
| `pagination.limit` | number | No | Maximum number of profiles to return (default: 10, max: 100) |
| `pagination.offset` | number | No | Number of profiles to skip (for pagination) |

\* At least one of `profileIds` or `addresses` must be provided.

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "values": [
    {
      "id": 1,
      "address": "0x123...",
      "nickname": "alice",
      "ensName": "alice.eth",
      "avatarUrl": "https://...",
      "bio": "My bio",
      "createdAt": "2022-01-01T00:00:00Z",
      "updatedAt": "2022-01-01T00:00:00Z",
      "score": 85,
      "xp": 1200,
      "isShadowProfile": false
    }
  ],
  "limit": 10,
  "offset": 0,
  "total": 1
}
```

| Property | Type | Description |
|----------|------|-------------|
| `values` | object[] | Array of profile objects |
| `values[].id` | number | Profile ID |
| `values[].address` | string | Ethereum address |
| `values[].nickname` | string | Profile nickname |
| `values[].ensName` | string | ENS name (if registered) |
| `values[].avatarUrl` | string | URL to avatar image |
| `values[].bio` | string | User biography |
| `values[].createdAt` | string | Creation timestamp (ISO format) |
| `values[].updatedAt` | string | Last update timestamp (ISO format) |
| `values[].score` | number | Profile reputation score |
| `values[].xp` | number | Profile experience points |
| `values[].isShadowProfile` | boolean | Whether this is a shadow profile |
| `limit` | number | Requested limit |
| `offset` | number | Requested offset |
| `total` | number | Total number of matching profiles |

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "error": "Must specify either ids or addresses",
  "code": "BAD_REQUEST"
}
```

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/profiles \
  profileIds:='[1, 2, 3]' \
  pagination:='{"limit": 10, "offset": 0}'
```

##### Response

```json
{
  "values": [
    {
      "id": 1,
      "address": "0x1234567890abcdef1234567890abcdef12345678",
      "nickname": "alice",
      "ensName": "alice.eth",
      "avatarUrl": "https://example.com/avatar.png",
      "bio": "Blockchain enthusiast",
      "createdAt": "2022-01-01T00:00:00Z",
      "updatedAt": "2022-01-01T00:00:00Z",
      "score": 85,
      "xp": 1200,
      "isShadowProfile": false
    }
  ],
  "limit": 10,
  "offset": 0,
  "total": 1
}
```

---

### Recent Profiles

```
POST /api/v1/profiles/recent
```

**Description**: Retrieves a list of recently created profiles, ordered by creation date in descending order.

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

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `archived` | boolean | No | Whether to include archived profiles (default: false) |
| `limit` | number | No | Maximum number of profiles to return (default: 10, max: 100) |
| `offset` | number | No | Number of profiles to skip (for pagination) |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "values": [
    {
      "id": 1,
      "address": "0x123...",
      "nickname": "alice",
      "ensName": "alice.eth",
      "avatarUrl": "https://...",
      "bio": "My bio",
      "createdAt": "2022-01-01T00:00:00Z",
      "updatedAt": "2022-01-01T00:00:00Z",
      "score": 85,
      "xp": 1200
    }
  ],
  "limit": 10,
  "offset": 0,
  "total": 150
}
```

| Property | Type | Description |
|----------|------|-------------|
| `values` | object[] | Array of profile objects (see Query Profiles for details) |
| `limit` | number | Requested limit |
| `offset` | number | Requested offset |
| `total` | number | Total number of profiles |

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/profiles/recent \
  limit:=20
```

---

### Profile Directory

```
GET /api/v1/profiles/directory
```

**Description**: Retrieves a paginated directory of non-archived profiles with various sorting options.

**Authentication Required**: No

#### Parameters

##### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | number | No | Maximum number of profiles to return (default: 10, max: 100) |
| `offset` | number | No | Number of profiles to skip (for pagination) |
| `sortField` | string | No | Field to sort by (default: "score", options: "score", "xp", "createdAt") |
| `sortDirection` | string | No | Sort direction (default: "desc", options: "asc", "desc") |
| `archived` | boolean | No | Whether to include archived profiles (default: false) |
| `inviteFilter` | string | No | Filter by invite availability (options: "hasInvites", "noInvites") |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "values": [
    {
      "id": 1,
      "address": "0x123...",
      "nickname": "alice",
      "ensName": "alice.eth",
      "avatarUrl": "https://...",
      "bio": "My bio",
      "createdAt": "2022-01-01T00:00:00Z",
      "score": 85,
      "xp": 1200,
      "invitedBy": 2,
      "actor": {
        "profileId": 1,
        "name": "Alice",
        "avatarUrl": "https://..."
      },
      "inviterActor": {
        "profileId": 2,
        "name": "Bob",
        "avatarUrl": "https://..."
      }
    }
  ],
  "limit": 10,
  "offset": 0,
  "total": 150
}
```

| Property | Type | Description |
|----------|------|-------------|
| `values` | object[] | Array of enhanced profile objects |
| `values[].id` | number | Profile ID |
| `values[].address` | string | Ethereum address |
| `values[].nickname` | string | Profile nickname |
| `values[].ensName` | string | ENS name (if registered) |
| `values[].avatarUrl` | string | URL to avatar image |
| `values[].bio` | string | User biography |
| `values[].createdAt` | string | Creation timestamp (ISO format) |
| `values[].score` | number | Profile reputation score |
| `values[].xp` | number | Profile experience points |
| `values[].invitedBy` | number | Profile ID of the user who invited this profile |
| `values[].actor` | object | Activity actor details for this profile |
| `values[].inviterActor` | object | Activity actor details for the inviter |
| `limit` | number | Requested limit |
| `offset` | number | Requested offset |
| `total` | number | Total number of profiles matching criteria |

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/profiles/directory \
  limit==20 \
  sortField==xp \
  sortDirection==desc \
  inviteFilter==hasInvites
```

---

### Credibility Leaderboard

```
GET /api/v1/profiles/credibility-leaderboard
```

**Description**: Retrieves a leaderboard of profiles sorted by credibility score, with optional ordering.

**Authentication Required**: No

#### Parameters

##### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `order` | string | No | Sort order (default: "desc", options: "asc", "desc") |
| `limit` | number | No | Maximum number of profiles to return (default: 50) |

#### Responses

##### Success Response

**Code**: 200 OK

```json
[
  {
    "id": 1,
    "address": "0x123...",
    "nickname": "alice",
    "ensName": "alice.eth",
    "avatarUrl": "https://...",
    "score": 95
  }
]
```

The response is an array of profile objects with reputation scores, sorted by score in the requested order. Certain internal or system profiles may be excluded from results.

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/profiles/credibility-leaderboard \
  order==desc \
  limit==20
```

---

### Profile Stats

```
GET /api/v1/profiles/stats
```

**Description**: Retrieves aggregate statistics about profiles on the network.

**Authentication Required**: No

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "activeProfiles": 1500,
  "invitesAvailable": 450
}
```

| Property | Type | Description |
|----------|------|-------------|
| `activeProfiles` | number | Total number of active (non-archived) profiles |
| `invitesAvailable` | number | Total number of available invites across all profiles |

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/profiles/stats
```

---

### XP Leaderboard

```
GET /api/v1/profiles/xp-leaderboard
```

**Description**: Retrieves a leaderboard of profiles sorted by XP (experience points), with optional time filtering.

**Authentication Required**: No

#### Parameters

##### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `since` | string | No | ISO date string to filter XP earned since a specific date |

#### Responses

##### Success Response

**Code**: 200 OK

```json
[
  {
    "id": 1,
    "address": "0x123...",
    "nickname": "alice",
    "ensName": "alice.eth",
    "avatarUrl": "https://...",
    "totalXp": 5000
  }
]
```

The response is an array of profile objects with their accumulated XP, sorted by XP in descending order. If the `since` parameter is provided, only XP earned since that date will be counted. Certain internal or system profiles may be excluded from results.

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/profiles/xp-leaderboard \
  since==2023-01-01T00:00:00Z
```

---

### Profiles with Attestation

```
GET /api/v1/profiles/with-x-attestation
```

**Description**: Retrieves profiles that have a specific X (Twitter) attestation.

**Authentication Required**: No

#### Parameters

##### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | number | No | Maximum number of profiles to return (default: 10, max: 1000) |
| `offset` | number | No | Number of profiles to skip (for pagination) |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "values": [
    {
      "profileId": 1,
      "twitterUserId": "12345",
      "twitterUsername": "alice_twitter",
      "address": "0x123..."
    }
  ],
  "limit": 10,
  "offset": 0,
  "total": 150
}
```

| Property | Type | Description |
|----------|------|-------------|
| `values` | object[] | Array of profiles with X attestations |
| `values[].profileId` | number | Profile ID |
| `values[].twitterUserId` | string | X (Twitter) user ID |
| `values[].twitterUsername` | string | X (Twitter) username |
| `values[].address` | string | Ethereum address associated with the profile |
| `limit` | number | Requested limit |
| `offset` | number | Requested offset |
| `total` | number | Total number of profiles with X attestations |

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/profiles/with-x-attestation \
  limit==20 \
  offset==0
```
