# Slashes API

## Overview

The Slashes API provides endpoints for interacting with slash events, which are community moderation actions within the Ethos network. It allows retrieving slash details, checking potential slash validity, and determining user roles in relation to a specific slash.

## Endpoints

### List Slashes

```
GET /api/v1/slashes
```

**Description**: Retrieves a list of slashes (community moderation actions), optionally filtered by author, subject, and status.

**Authentication Required**: No

#### Parameters

##### Query Parameters

```typescript
{
  author?: string;      // Optional: Filter by author's userkey (e.g., eth:0x..., did:privy:...)
  subject?: string;     // Optional: Filter by subject's userkey
  status?: 'open' | 'closed'; // Optional: Filter by slash status (defaults to all)
  limit?: number;       // Optional: Pagination limit (default: 50, max: 100)
  offset?: number;      // Optional: Pagination offset (default: 0)
}
```

| Parameter | Type                  | Required | Default | Description                                                     |
|-----------|-----------------------|----------|---------|-----------------------------------------------------------------|
| `author`  | string (Userkey)      | No       | -       | Filter slashes created by this author.                          |
| `subject` | string (Userkey)      | No       | -       | Filter slashes targeting this subject.                          |
| `status`  | `'open'` \| `'closed'` | No       | all     | Filter slashes by their status (`open` or `closed`).            |
| `limit`   | number                | No       | 50      | Maximum number of slashes to return. Max 100.                 |
| `offset`  | number                | No       | 0       | Number of slashes to skip for pagination.                       |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": number,              // Slash ID (from contract event)
        "authorProfileId": number, // Author's profile ID
        "subject": "string | null",    // Subject's address if applicable, otherwise null
        "attestationDetails": {     // Subject's attestation details if applicable, otherwise null
          "service": "string",
          "account": "string"
        } | null,
        "slashType": "SCORE" | "FINANCIAL", // Note: Enum value casing confirmed
        "amount": number,           // Amount slashed (Number)
        "duration": number,          // Duration in seconds
        "comment": string,
        "metadata": string,          // Additional metadata (often JSON string)
        "createdAt": number,         // Unix timestamp (seconds)
        "closedAt": number,          // Unix timestamp (seconds) when slash closed (expiration or cancellation)
        "cancelledAt": number        // Unix timestamp (seconds) if cancelled, otherwise 0
        // "expiresAt": number | null // Unix timestamp (seconds) - Likely only present for open slashes
      }
    ],
    "total": number,           // Total number of slashes matching the query
    "limit": number,           // The limit used for this response
    "offset": number           // The offset used for this response
  }
}
```

*Note: The exact structure of the `subject` object and other fields within the `values` array depends on the `convert.toSlash` function and needs confirmation via testing.* 

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters", // Example message
    "details": { /* Zod error details */ }
  }
}
```

#### Example

##### Request

```bash
# Get the 5 most recent open slashes
http GET https://api.ethos.network/api/v1/slashes status==open limit==5

# Get slashes authored by a specific profile (using DID)
http GET https://api.ethos.network/api/v1/slashes author=="did:privy:user123"
```

##### Response

```json
# Example Response (Structure Confirmed, Values Illustrative)
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": 28,
        "authorProfileId": 1017,
        "subject": null,
        "attestationDetails": {
          "service": "x.com",
          "account": "1142606887"
        },
        "slashType": "SCORE",
        "amount": 210,
        "duration": 172800,
        "comment": "Ran one of the biggest and most unreported FRAUDS ever in Crypto",
        "metadata": "{\"description\":\"Somehow he is still walking free...\"}",
        "createdAt": 1743130149,
        "closedAt": 1743302949,
        "cancelledAt": 0
      }
      // ... more slashes up to limit
    ],
    "total": 50, // Example total
    "limit": 50,
    "offset": 0
  }
}
```

#### Notes

- Returns slashes ordered by creation date descending.
- Uses standard pagination (`limit`, `offset`).
- Supports filtering by author, subject (using userkey format), and status.

### Get Slash Roles

```
GET /api/v1/slashes/:id/roles
```

**Description**: Retrieves the roles of specified profiles related to a specific slash (e.g., slasher, defender, voter).

**Authentication Required**: No (Assumed, needs verification)

#### Parameters

##### Path Parameters

| Parameter | Type   | Description        |
|-----------|--------|--------------------|
| `id`      | number | The ID of the slash. |

##### Query Parameters

```typescript
{
  profileId: number | number[]; // Profile ID(s) to check roles for
}
```

| Parameter   | Type           | Required | Description                                      |
|-------------|----------------|----------|--------------------------------------------------|
| `profileId` | number | number[] | Yes      | One or more profile IDs to get the roles for. |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "<profileId>": "slasher" | "defender" | "voted_slash" | "voted_defend"
    // ... more profileId: role pairs
  }
}
```

| Role          | Description                                           |
|---------------|-------------------------------------------------------|
| `slasher`     | The profile authored the slash.                     |
| `defender`    | The profile is the subject of the slash.              |
| `voted_slash` | The profile upvoted the slash (supported slasher).    |
| `voted_defend`| The profile downvoted the slash (supported defender). |

##### Error Responses

**Code**: 400 Bad Request (Example: Missing profileId)

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input: profileId is required"
  }
}
```

**Code**: 404 Not Found (Example: Slash ID not found)

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Slash not found"
  }
}
```

#### Example

##### Request

```bash
# Get roles for profile 123 and 456 regarding slash 28
http GET https://api.ethos.network/api/v1/slashes/28/roles profileId==123 profileId==456
```

##### Response

```json
{
  "ok": true,
  "data": {}
}
```

#### Notes

- Used to determine relationship of specific users to a slash.
- Requires the numerical slash ID and at least one profile ID.

### Check Slash Validity

// ... existing code ...
