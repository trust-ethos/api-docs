# Vouches API

## Overview

The Vouches API provides endpoints for querying and retrieving information about vouches in the Ethos network. Vouches represent endorsements between users and may include ETH deposits.

## Endpoints

### Query Vouches

```
POST /api/v1/vouches
```

Retrieves vouches based on specified filters and pagination parameters.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ids | number[] | No | Array of specific vouch IDs to retrieve |
| authorProfileIds | number[] | No | Array of profile IDs that authored vouches |
| subjectProfileIds | number[] | No | Array of profile IDs that received vouches |
| subjectAddresses | string[] | No | Array of Ethereum addresses that received vouches |
| subjectAttestationHashes | string[] | No | Array of attestation hashes for subjects |
| archived | boolean | No | Whether to include archived vouches |
| duration | string | No | Filter vouches by time period (e.g., "7d", "1w") |
| orderBy | object | No | Sorting criteria (e.g., `{ "vouchedAt": "desc" }`) |
| limit | number | No | Maximum number of results (default: 20, max: 100) |
| offset | number | No | Number of results to skip for pagination |

#### Response

```json
{
  "values": [
    {
      "id": 12345,
      "authorProfileId": 1001,
      "subjectProfileId": 2002,
      "subjectAddress": "0x1234...",
      "attestationHash": "0xabc...",
      "comment": "Great contributor!",
      "amount": "0.1",
      "balance": "0.1",
      "activityCheckpoints": {
        "vouchedAt": "2023-05-01T12:34:56Z",
        "updatedAt": "2023-05-01T12:34:56Z"
      },
      "mutualId": 6789,
      "events": [
        {
          "id": 98765,
          "txHash": "0x5678...",
          "blockNumber": 123456,
          "timestamp": "2023-05-01T12:34:56Z"
        }
      ],
      "attestationDetails": {
        "service": "x.com",
        "account": "username"
      }
    }
  ],
  "limit": 20,
  "offset": 0,
  "total": 150
}
```

### Count Vouches

```
POST /api/v1/vouches/count
```

Counts vouches based on specified filters.

#### Request Parameters

Same filtering parameters as the query endpoint, without pagination.

#### Response

```json
{
  "count": 150
}
```

### Get Vouch Statistics

```
POST /api/v1/vouches/stats
```

Retrieves statistics about vouches for a specific user.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| target | string | Yes | User identifier (address, profile ID, or attestation in format `service:account`) |

#### Response

```json
{
  "staked": {
    "received": 1.5,
    "deposited": 0.8,
    "mutual": 0.5
  },
  "balance": {
    "received": 1.2,
    "deposited": 0.7,
    "mutual": 0.4
  },
  "count": {
    "received": 10,
    "deposited": 5,
    "mutual": 3
  },
  "percentile": {
    "received": 85,
    "deposited": 70,
    "mutual": 60
  }
}
```

### Get Vouched Ethereum

```
POST /api/v1/vouches/vouched-ethereum
```

Retrieves the total amount of ETH vouched for a specific user.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| target | string | Yes | User identifier (address, profile ID, or attestation) |

#### Response

```json
{
  "amount": "1.5"
}
```

### Get Most Credible Vouchers

```
POST /api/v1/vouches/most-credible-vouchers
```

Retrieves the most credible vouchers for a specific user.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| target | string | Yes | User identifier (address, profile ID, or attestation) |
| limit | number | No | Maximum number of results (default: 10) |

#### Response

```json
{
  "vouchers": [
    {
      "profileId": 1001,
      "name": "User Name",
      "avatarUrl": "https://example.com/avatar.jpg",
      "score": 85,
      "amount": "0.5"
    }
  ]
}
```

### Get Mutual Vouchers

```
GET /api/v1/vouches/mutual-vouchers
```

Retrieves users who have mutual vouches with the specified user.

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userkey | string | Yes | User identifier (address, profile ID, or attestation) |
| limit | number | No | Maximum number of results (default: 10) |

#### Response

```json
{
  "mutualVouchers": [
    {
      "profileId": 2002,
      "name": "Another User",
      "avatarUrl": "https://example.com/avatar2.jpg",
      "vouchId": 12345,
      "mutualVouchId": 6789
    }
  ]
}
```

### Get Vouch Rewards

```
POST /api/v1/vouches/rewards
```

Retrieves rewards earned from vouches for specified users.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userkeys | string[] | Yes | Array of user identifiers |

#### Response

```json
{
  "user1": {
    "rewards": 0.1,
    "lifetime": 0.5
  },
  "user2": {
    "rewards": 0.05,
    "lifetime": 0.2
  }
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "error": "Invalid parameters",
  "code": "INVALID_PARAMETERS"
}
```

### 404 Not Found

```json
{
  "error": "User not found",
  "code": "NOT_FOUND"
}
```

### 500 Internal Server Error

```json
{
  "error": "An unexpected error occurred",
  "code": "INTERNAL_SERVER_ERROR"
}
```
