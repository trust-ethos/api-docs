# XP API

## Overview

The XP API provides endpoints for managing experience points (XP) within the Ethos network. It allows users to retrieve their XP history and perform various XP-earning actions such as daily check-ins through the browser extension.

## Endpoints

### Get XP History

```
GET /api/v1/xp/:userkey/history
```

**Description**: Retrieves the XP history for a user, showing all XP-earning activities in chronological order.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userkey` | string | Yes | The userkey for the user. Can be in the format of "profileId:123", "address:0x1234...", or "service:x.com:username:username" |

##### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | number | No | Maximum number of results to return (default: 10) |
| `offset` | number | No | Offset for pagination (default: 0) |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "userkey": "service:x.com:username:ethosuser",
        "type": "EXTENSION_CHECK_IN",
        "points": 100,
        "metadata": {
          "type": "extensionCheckIn",
          "installationId": "abcd1234",
          "multiplier": 1.0
        },
        "createdAt": "2023-07-15T12:30:45Z"
      },
      {
        "id": "123e4567-e89b-12d3-a456-426614174001",
        "userkey": "service:x.com:username:ethosuser",
        "type": "ATTESTATION",
        "points": 500,
        "metadata": {
          "type": "attestation",
          "attestationId": "xyz789"
        },
        "createdAt": "2023-07-14T10:15:30Z"
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 2
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | Response data container |
| `data.values` | array | Array of XP history items |
| `data.values[].id` | string | Unique identifier for the XP history item |
| `data.values[].userkey` | string | The userkey associated with this XP award |
| `data.values[].type` | string | Type of XP earning activity (e.g., "EXTENSION_CHECK_IN", "ATTESTATION", etc.) |
| `data.values[].points` | number | Amount of XP awarded |
| `data.values[].metadata` | object | Additional metadata about the XP award |
| `data.values[].createdAt` | string | ISO 8601 timestamp when the XP was awarded |
| `data.limit` | number | Number of results returned |
| `data.offset` | number | Current pagination offset |
| `data.total` | number | Total number of XP history items for the user |

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/xp/profileId:123/history?limit=10&offset=0
```

#### Notes

- XP history is sorted by creation date in descending order (newest first).
- All userkeys associated with the provided userkey will be included in the search, retrieving XP history across all of a user's linked accounts.
- Some users may be excluded from the XP system and will receive an empty result.

---

### Extension Daily Check-in

```
POST /api/v1/xp/extension-daily-checkin
```

**Description**: Allows users to check in daily via the browser extension to earn XP.

**Authentication Required**: No (Uses cryptographic signature verification)

#### Parameters

##### Body Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `twitterHandle` | string | Yes | The Twitter handle of the user checking in (without the @ symbol) |
| `timestamp` | number | Yes | Current timestamp in milliseconds |
| `installationId` | string | Yes | Unique identifier for the extension installation |
| `signature` | string | Yes | HMAC-SHA256 signature of `twitterHandle:timestamp:installationId` using installationId as the key |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "success": true
  }
}
```

##### Error Response

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": "Already checked in today",
  "code": "ALREADY_CHECKED_IN"
}
```

**Possible error codes**:
- `ALREADY_CHECKED_IN`: User has already checked in today
- `TWITTER_USER_NOT_FOUND`: The provided Twitter handle does not exist or is not registered with Ethos

**Code**: 401 Unauthorized

```json
{
  "ok": false,
  "error": "Invalid signature",
  "code": "INVALID_SIGNATURE"
}
```

**Possible error codes**:
- `INVALID_SIGNATURE`: The provided signature is invalid
- `UNAUTHORIZED`: The timestamp is too old (more than 5 minutes)

#### Example

##### Request

```bash
http POST https://api.ethos.network/api/v1/xp/extension-daily-checkin \
  twitterHandle=ethosuser \
  timestamp=1627318400000 \
  installationId=abcd1234 \
  signature=HMAChdjhdwueGFRkSjdksleiFEIRekjsfndk
```

#### Notes

- Users can only check in once per day (based on UTC date).
- The XP awarded is typically 100 points, but may be adjusted by a multiplier based on the user's score.
- The request must include a valid signature generated by the extension to prevent abuse.
- Timestamp must be within the last 5 minutes to prevent replay attacks.

---

### Get Claim Statistics

```
GET /api/v1/claim/stats
```

**Description**: Retrieves XP claim statistics for the authenticated user.

**Authentication Required**: Yes (Session Cookie)

#### Parameters

None

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "initialBonus": 1000,
    "totalAmount": 2500,
    "acceptedReferralBonus": 500,
    "receivedReferralBonus": 200,
    "referrerName": "Vitalik",
    "referralCount": 5,
    "claimed": true
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | Claim statistics data |
| `data.initialBonus` | number | Initial XP bonus awarded for joining |
| `data.totalAmount` | number | Total XP claimed so far |
| `data.acceptedReferralBonus` | number | XP bonus received from accepting a referral |
| `data.receivedReferralBonus` | number | XP bonus received from referring others |
| `data.referrerName` | string | Name of the user who referred this user |
| `data.referralCount` | number | Number of successful referrals made by this user |
| `data.claimed` | boolean | Whether the user has claimed their initial XP bonus |

##### Error Response

**Code**: 401 Unauthorized

```json
{
  "ok": false,
  "error": "Unauthorized",
  "code": "UNAUTHORIZED"
}
```

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/claim/stats \
  Cookie:"SESSION_COOKIE=your_session_cookie"
```

---

### Get Claim Statistics by User

```
GET /api/v1/claim/stats/:userkey
```

**Description**: Retrieves XP claim statistics for a specific user.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userkey` | string | Yes | The userkey for the user to retrieve stats for |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "initialBonus": 1000,
    "totalAmount": 2500,
    "acceptedReferralBonus": 500,
    "receivedReferralBonus": 200,
    "referrerName": "Vitalik",
    "referralCount": 5,
    "claimed": true
  }
}
```

The response format is identical to the `/api/v1/claim/stats` endpoint.

##### Error Response

**Code**: 404 Not Found

```json
{
  "ok": false,
  "error": "User not found",
  "code": "USER_NOT_FOUND"
}
```

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/claim/stats/profileId:123
```

#### Notes

- This endpoint allows viewing claim statistics for any user in the system.
- It provides transparency into the referral system and helps track XP distribution.
