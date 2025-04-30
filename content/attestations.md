# Attestations API

## Overview

The Attestations API allows you to query service verifications and attestations in the Ethos network. Attestations are proofs that a user owns a particular service account (like a Twitter account) or has verified a specific claim.

## Endpoints

### Query Attestations

```
POST /api/v1/attestations
```

**Description**: Retrieves attestations based on profile IDs, attestation hashes, or both.

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "profileIds": [1, 2, 3],
  "attestationHashes": ["0x1234...", "0x5678..."],
  "archived": false,
  "orderBy": {
    "createdAt": "desc"
  },
  "limit": 10,
  "offset": 0
}
```

| Property            | Type             | Required | Description                               |
| ------------------- | ---------------- | -------- | ----------------------------------------- |
| `profileIds`        | array of numbers | No*      | Array of profile IDs to filter by         |
| `attestationHashes` | array of strings | No*      | Array of attestation hashes to filter by  |
| `archived`          | boolean          | No       | Whether to include archived attestations  |
| `orderBy`           | object           | No       | Sorting options                           |
| `orderBy.createdAt` | string           | No       | Sort by creation date: "asc" or "desc"    |
| `orderBy.updatedAt` | string           | No       | Sort by update date: "asc" or "desc"      |
| `limit`             | number           | Yes      | Number of results to return (maximum 100) |
| `offset`            | number           | Yes      | Offset for pagination                     |

*At least one of `profileIds` or `attestationHashes` must be provided.

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "hash": "0x1234...",
        "profileId": 1,
        "service": "x.com",
        "account": "123456789",
        "createdAt": 1735689600,
        "updatedAt": 1735689600,
        "archived": false
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 1
  }
}
```

| Property                  | Type    | Description                                             |
| ------------------------- | ------- | ------------------------------------------------------- |
| `ok`                      | boolean | Success status                                          |
| `data`                    | object  | Response data container                                 |
| `data.values`             | array   | Array of attestation objects                            |
| `data.values[].hash`      | string  | Attestation hash                                        |
| `data.values[].profileId` | number  | Profile ID                                              |
| `data.values[].service`   | string  | Service name (e.g., "x.com")                            |
| `data.values[].account`   | string  | Account ID on the service                               |
| `data.values[].createdAt` | number  | Unix timestamp of when the attestation was created      |
| `data.values[].updatedAt` | number  | Unix timestamp of when the attestation was last updated |
| `data.values[].archived`  | boolean | Whether the attestation is archived                     |
| `data.limit`              | number  | Number of results returned                              |
| `data.offset`             | number  | Current pagination offset                               |
| `data.total`              | number  | Total number of results matching the query              |

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "Must specify either attestationHashes or profileIds",
    "fields": ["attestationHashes", "profileIds"]
  }
}
```

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/attestations \
  profileIds:='[1]' \
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
        "hash": "0x1234567890123456789012345678901234567890123456789012345678901234",
        "profileId": 1,
        "service": "x.com",
        "account": "123456789",
        "createdAt": 1735689600,
        "updatedAt": 1735689600,
        "archived": false
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 1
  }
}
```

#### Notes

- By default, results are sorted by creation date in descending order (newest first).
- The API enforces a maximum of 100 attestations that can be requested at once.

---

### Query Extended Attestations

```
POST /api/v1/attestations/extended
```

**Description**: Retrieves attestations with extended information. Currently, this endpoint is optimized for X (Twitter) attestations by including additional Twitter profile information.

**Authentication Required**: No

#### Parameters

##### Request Body

```json
{
  "profileIds": [1, 2, 3],
  "attestationHashes": ["0x1234...", "0x5678..."],
  "archived": false,
  "orderBy": {
    "createdAt": "desc"
  },
  "limit": 10,
  "offset": 0
}
```

| Property            | Type             | Required | Description                               |
| ------------------- | ---------------- | -------- | ----------------------------------------- |
| `profileIds`        | array of numbers | No*      | Array of profile IDs to filter by         |
| `attestationHashes` | array of strings | No*      | Array of attestation hashes to filter by  |
| `archived`          | boolean          | No       | Whether to include archived attestations  |
| `orderBy`           | object           | No       | Sorting options                           |
| `orderBy.createdAt` | string           | No       | Sort by creation date: "asc" or "desc"    |
| `orderBy.updatedAt` | string           | No       | Sort by update date: "asc" or "desc"      |
| `limit`             | number           | Yes      | Number of results to return (maximum 100) |
| `offset`            | number           | Yes      | Offset for pagination                     |

*At least one of `profileIds` or `attestationHashes` must be provided.

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "attestation": {
          "hash": "0x1234...",
          "id": 1,
          "profileId": 1,
          "service": "x.com",
          "account": "123456789",
          "createdAt": 1735689600,
          "updatedAt": 1735689600,
          "archived": false
        },
        "extra": {
          "attestationHash": "0x1234...",
          "id": "123456789",
          "username": "twitterusername",
          "name": "Twitter Display Name",
          "biography": "Twitter bio",
          "avatar": "https://pbs.twimg.com/profile_images/1234567890/image.jpg",
          "followersCount": 1000,
          "isBlueVerified": true,
          "joinedAt": 1703222331000,
          "website": "https://example.com"
        }
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 1
  }
}
```

| Property                              | Type    | Description                                             |
| ------------------------------------- | ------- | ------------------------------------------------------- |
| `ok`                                  | boolean | Success status                                          |
| `data`                                | object  | Response data container                                 |
| `data.values`                         | array   | Array of extended attestation objects                   |
| `data.values[].attestation`           | object  | Attestation object (same as in the basic query)         |
| `data.values[].attestation.id`        | number  | Internal attestation ID                                 |
| `data.values[].attestation.hash`      | string  | Attestation hash                                        |
| `data.values[].attestation.profileId` | number  | Profile ID                                              |
| `data.values[].attestation.service`   | string  | Service name (e.g., "x.com")                            |
| `data.values[].attestation.account`   | string  | Account ID on the service                               |
| `data.values[].attestation.createdAt` | number  | Unix timestamp of when the attestation was created      |
| `data.values[].attestation.updatedAt` | number  | Unix timestamp of when the attestation was last updated |
| `data.values[].attestation.archived`  | boolean | Whether the attestation is archived                     |
| `data.values[].extra`                 | object  | Additional information about the attestation            |
| `data.values[].extra.attestationHash` | string  | Hash of the attestation                                 |
| `data.values[].extra.id`              | string  | Twitter user ID                                         |
| `data.values[].extra.username`        | string  | Twitter username                                        |
| `data.values[].extra.name`            | string  | Twitter display name                                    |
| `data.values[].extra.biography`       | string  | Twitter bio                                             |
| `data.values[].extra.avatar`          | string  | URL to the Twitter profile image                        |
| `data.values[].extra.followersCount`  | number  | Number of followers                                     |
| `data.values[].extra.isBlueVerified`  | boolean | Whether the account is Twitter Blue verified            |
| `data.values[].extra.joinedAt`        | number  | Unix timestamp of when the account joined Twitter       |
| `data.values[].extra.website`         | string  | Website URL from Twitter profile                        |
| `data.limit`                          | number  | Number of results returned                              |
| `data.offset`                         | number  | Current pagination offset                               |
| `data.total`                          | number  | Total number of results matching the query              |

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "Must specify either attestationHashes or profileIds",
    "fields": ["attestationHashes", "profileIds"]
  }
}
```

**Code**: 404 Not Found

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Attestation details not found"
  }
}
```

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/attestations/extended \
  profileIds:='[1]' \
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
        "attestation": {
          "hash": "0x1234567890123456789012345678901234567890123456789012345678901234",
          "id": 1,
          "profileId": 1,
          "service": "x.com",
          "account": "123456789",
          "createdAt": 1735689600,
          "updatedAt": 1735689600,
          "archived": false
        },
        "extra": {
          "attestationHash": "0x1234567890123456789012345678901234567890123456789012345678901234",
          "id": "123456789",
          "username": "twitterusername",
          "name": "Twitter Display Name",
          "biography": "Twitter bio",
          "avatar": "https://pbs.twimg.com/profile_images/1234567890/image.jpg",
          "followersCount": 1000,
          "isBlueVerified": true,
          "joinedAt": 1703222331000,
          "website": "https://example.com"
        }
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 1
  }
}
```

#### Notes

- Currently, this endpoint only provides extended information for X (Twitter) attestations.
- For non-Twitter attestations, the extended information may be limited or not available.
- The extended information includes the Twitter username, display name, bio, and profile image URL.
