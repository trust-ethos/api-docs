# Attestations API

The Attestations API provides endpoints for managing verified connections between Ethos profiles and external service accounts such as X (Twitter). Attestations serve as verifiable proof of ownership of external social media accounts.

## Overview

Attestations in the Ethos ecosystem are cryptographically verifiable claims that connect a user's Ethos profile with their identity on other platforms. These attestations are typically stored on-chain, providing a transparent and immutable record of verified connections.

Currently, the main supported service for attestations is X (formerly Twitter), but the API is designed to be extensible to other services in the future.

## Endpoints

### Query Attestations

```
POST /api/v1/attestations
```

This endpoint retrieves attestations based on specified filters.

#### Request Body

| Field               | Type    | Required | Description                                    |
|---------------------|---------|----------|------------------------------------------------|
| profileIds          | integer[]| No*      | List of profile IDs to filter attestations by  |
| attestationHashes   | string[]| No*      | List of attestation hashes to retrieve         |
| archived            | boolean | No       | Whether to include archived attestations       |
| orderBy             | object  | No       | Sorting options for the results                |
| orderBy.createdAt   | string  | No       | Sort by creation time (asc, desc)              |
| orderBy.updatedAt   | string  | No       | Sort by update time (asc, desc)                |
| pagination          | object  | Yes      | Pagination parameters                          |
| pagination.limit    | integer | Yes      | Maximum number of attestations to return       |
| pagination.offset   | integer | Yes      | Number of attestations to skip                 |

\* Either `profileIds` or `attestationHashes` must be provided.

#### Response

**Success (200 OK)**

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": 123,
        "hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        "service": "x.com",
        "account": "12345678",
        "profileId": 456,
        "createdAt": 1625097600,
        "archived": false
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 1
  }
}
```

**Error Responses**

- `400 Bad Request`: Missing required parameters
- `500 Internal Server Error`: Unexpected error

#### Example Request

```bash
curl -X POST https://api.ethos.io/api/v1/attestations \
  -H "Content-Type: application/json" \
  -d '{
    "profileIds": [456],
    "pagination": {
      "limit": 10,
      "offset": 0
    }
  }'
```

### Query Extended Attestations

```
POST /api/v1/attestations/extended
```

This endpoint retrieves attestations with extended information, such as usernames, display names, and avatar URLs for social media accounts.

#### Request Body

Same as Query Attestations endpoint.

#### Response

**Success (200 OK)**

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "attestation": {
          "id": 123,
          "hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          "service": "x.com",
          "account": "12345678",
          "profileId": 456,
          "createdAt": 1625097600,
          "archived": false
        },
        "extra": {
          "username": "alice_twitter",
          "name": "Alice",
          "avatar": "https://pbs.twimg.com/profile_images/1234567890/avatar.jpg"
        }
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 1
  }
}
```

**Error Responses**

- `400 Bad Request`: Missing required parameters
- `404 Not Found`: Attestation details not found
- `500 Internal Server Error`: Unexpected error

#### Example Request

```bash
curl -X POST https://api.ethos.io/api/v1/attestations/extended \
  -H "Content-Type: application/json" \
  -d '{
    "profileIds": [456],
    "pagination": {
      "limit": 10,
      "offset": 0
    }
  }'
```

### Create Attestation Signature

```
POST /api/v1/signatures/create-attestation
```

Creates a cryptographic signature that can be used to register an attestation on-chain. This endpoint allows users to verify ownership of social accounts like X (Twitter).

#### Security

This endpoint requires authentication with a valid Privy session and profile.

#### Request Body

| Field            | Type    | Required | Description                                 |
|------------------|---------|----------|---------------------------------------------|
| service          | string  | Yes      | The service to create an attestation for (e.g., x.com) |
| connectedAddress | string  | Yes      | The wallet address of the connected user    |

#### Response

**Success (200 OK)**

```json
{
  "ok": true,
  "data": {
    "randValue": 1234567890,
    "signature": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "account": "12345678",
    "evidence": "{\"source\":\"privy\",\"type\":\"OAuth2\",\"id\":\"user-123\",\"approver\":\"ethos.network\"}"
  }
}
```

**Error Responses**

- `400 Bad Request`: Social account already connected
- `401 Unauthorized`: Invalid Privy session
- `403 Forbidden`: No Twitter account connected
- `500 Internal Server Error`: Unexpected error

#### Example Request

```bash
curl -X POST https://api.ethos.io/api/v1/signatures/create-attestation \
  -H "Authorization: <privy-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "service": "x.com",
    "connectedAddress": "0x1234567890abcdef1234567890abcdef12345678"
  }'
```

## Attestation Flow

1. User connects their social account (e.g., X/Twitter) via Privy OAuth
2. The application calls the `Create Attestation Signature` endpoint to generate a signature
3. The signature is used to submit an on-chain transaction to the Ethos Attestation contract
4. Once the transaction is confirmed, the attestation is permanently recorded on-chain
5. The attestation can be queried using the `Query Attestations` endpoints

## Data Model

### Attestation

| Field     | Type    | Description                                           |
|-----------|---------|-------------------------------------------------------|
| id        | integer | Unique identifier for the attestation                 |
| hash      | string  | Unique hash of the attestation (service+account)      |
| service   | string  | The service being attested to (e.g., x.com)           |
| account   | string  | The account ID on the service                         |
| profileId | integer | Profile ID that owns this attestation                 |
| createdAt | integer | Unix timestamp of when the attestation was created    |
| archived  | boolean | Whether this attestation is archived                  |

### Extended Attestation

| Field                 | Type    | Description                                           |
|-----------------------|---------|-------------------------------------------------------|
| attestation           | object  | The basic attestation information                     |
| extra                 | object  | Additional information related to the attestation     |
| extra.username        | string  | Username on the service                               |
| extra.name            | string  | Display name on the service                           |
| extra.avatar          | string  | URL to the profile image                              |
