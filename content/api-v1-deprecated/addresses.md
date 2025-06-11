# Addresses

## Overview

The Addresses API allows you to retrieve Ethereum addresses associated with a user in the Ethos network. This API is useful for obtaining both the primary address and all addresses linked to a specific user.

## Endpoints

### Get Addresses by Userkey

```
GET /api/v1/addresses/:userkey
```

**Description**: Retrieves the primary address and all addresses associated with a specific user identified by their userkey.

**Authentication Required**: No

#### Parameters

**Path Parameters**

| Name      | Type   | Required | Description                                                                                                          |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `userkey` | string | Yes      | The userkey for the user. Can be in the format of "profileId:123", "address:0x1234...", or "service:x.com:123456789" |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "profileId": 123,
    "primaryAddress": "0x1234...5678",
    "allAddresses": [
      "0x1234...5678",
      "0x9876...5432"
    ]
  }
}
```

| Property              | Type    | Description                                                                     |
| --------------------- | ------- | ------------------------------------------------------------------------------- |
| `ok`                  | boolean | Success status                                                                  |
| `data`                | object  | Address data                                                                    |
| `data.profileId`      | number  | The profile ID associated with the userkey (may be undefined if not applicable) |
| `data.primaryAddress` | string  | The primary Ethereum address                                                    |
| `data.allAddresses`   | array   | Array of all Ethereum addresses associated with the user                        |

**Error Responses**

**Code**: 404 Not Found

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found"
  }
}
```

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "Invalid userkey format"
  }
}
```

#### Example

**Request**

```bash
http GET https://api.ethos.network/api/v1/addresses/profileId:123
```

**Response**

```json
{
  "ok": true,
  "data": {
    "profileId": 123,
    "primaryAddress": "0x1234567890123456789012345678901234567890",
    "allAddresses": [
      "0x1234567890123456789012345678901234567890",
      "0x0987654321098765432109876543210987654321"
    ]
  }
}
```

#### Notes

* The primary address is always the first address in the `allAddresses` array.
* If a user has no addresses, the API will return an empty array for `allAddresses` and the `primaryAddress` will be undefined.
* If the userkey is an address format (e.g., "address:0x1234..."), the response will include that address and any other addresses associated with the same user.
* When using a service-based userkey (e.g., "service:x.com:username"), if the service account is not associated with a profile, the response will return the zero address (0x0000000000000000000000000000000000000000) for both `primaryAddress` and in the `allAddresses` array.
* Unlike some other endpoints, this endpoint does not return a 404 error for invalid or non-existent userkeys; instead, it returns a 200 OK with default values.
* The `profileId` field might be omitted from the response if the userkey doesn't correspond to an existing profile.
