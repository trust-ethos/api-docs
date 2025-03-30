# Claim API

## Overview

The Claim API provides endpoints related to user XP claims, referral bonuses, and associated statistics within the Ethos network. It also handles the Twitter OAuth flow for linking accounts during the claim process.

## Endpoints

### Get Claim Statistics for Authenticated User

```
GET /api/v1/claim/stats
```

**Description**: Retrieves XP claim statistics for the authenticated user.

**Authentication Required**: Yes (Session Cookie)

### Parameters

None

### Responses

#### Success Response

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

#### Error Response

**Code**: 401 Unauthorized

```json
{
  "ok": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Unauthorized"
  }
}
```

### Example

#### Request

```bash
http GET https://api.ethos.network/api/v1/claim/stats \
  Cookie:"SESSION_COOKIE=your_session_cookie"
```

### Get Claim Statistics by User

```
GET /api/v1/claim/stats/:userkey
```

**Description**: Retrieves XP claim statistics for a specific user.

**Authentication Required**: No

### Parameters

#### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userkey` | string | Yes | The userkey for the user to retrieve stats for (supports profileId, address, or service-based keys) |

### Responses

#### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "initialBonus": 275000,
    "totalAmount": 412000,
    "acceptedReferralBonus": 60000,
    "receivedReferralBonus": 77000,
    "referrerName": "sketch",
    "referralCount": 7,
    "claimed": true
  }
}
```

The response format is identical to the `/api/v1/claim/stats` endpoint.

#### Error Response

The endpoint does not return a 404 error for non-existent users. Instead, it returns a successful response with zero values.

```json
{
  "ok": true,
  "data": {
    "initialBonus": 0,
    "totalAmount": 0,
    "acceptedReferralBonus": 0,
    "receivedReferralBonus": 0,
    "referralCount": 0,
    "claimed": false
  }
}
```

### Example

#### Request

```bash
http GET https://api.ethos.network/api/v1/claim/stats/profileId:2
```

```bash
http GET https://api.ethos.network/api/v1/claim/stats/service:twitter:ethos_network
```

### Notes

- This endpoint allows viewing claim statistics for any user in the system
- It works with multiple userkey formats: profileId, address, or service-based keys (e.g., Twitter)
- For users without claim data, the endpoint returns zeros rather than an error
- The endpoint retrieves data based on the user's Twitter ID, either directly (if using a Twitter service key) or by looking up the Twitter attestation associated with the provided userkey

### Get Accepted Referrals

```
GET /api/v1/claim/accepted-referrals
```

**Description**: Retrieves a list of users who have accepted the authenticated user's referrals.

**Authentication Required**: Yes (Session Cookie)

### Parameters

None

### Responses

#### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": [
    {
      "username": "user1",
      "name": "User One",
      "profilePictureUrl": "https://example.com/pic1.jpg",
      "acceptedAt": "2023-10-15T12:00:00.000Z"
    },
    {
      "username": "user2",
      "name": "User Two",
      "profilePictureUrl": "https://example.com/pic2.jpg",
      "acceptedAt": "2023-10-16T14:30:00.000Z"
    }
  ]
}
```

#### Error Response

**Code**: 401 Unauthorized

```json
{
  "ok": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Unauthorized"
  }
}
```

### Example

#### Request

```bash
http GET https://api.ethos.network/api/v1/claim/accepted-referrals \
  Cookie:"SESSION_COOKIE=your_session_cookie"
```

### Twitter Login (OAuth)

```
GET /api/v1/claim/twitter/login
```

**Description**: Initiates the Twitter OAuth2 login flow for claiming XP. Redirects the user to Twitter for authentication.

**Authentication Required**: No
