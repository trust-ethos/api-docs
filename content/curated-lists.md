# Curated Lists API

## Overview

The Curated Lists API provides access to predefined lists of users maintained within the Ethos network, such as lists for highlighted users or those in contributor mode.

## Endpoints

### Get Curated List Userkeys

```
GET /api/v1/curated-lists/:list
```

**Description**: Retrieves a list of userkeys from a specific public curated list, returned in random order.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Parameter | Type   | Description                                                                          |
|-----------|--------|--------------------------------------------------------------------------------------|
| `list`    | string | The identifier of the curated list (e.g., `'contributor_mode'`, `'highlights'`). |

##### Query Parameters

```typescript
{
  limit: number;  // Required: Max userkeys to return (max 1000)
}
```

| Parameter | Type   | Required | Description                                  |
|-----------|--------|----------|----------------------------------------------|
| `limit`   | number | Yes      | Maximum number of userkeys to return (max 1000). |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "userkeys": [
       "string" // e.g., "profileId:123", "did:privy:abc..."
       // ... more userkeys up to the limit
    ]
  }
}
```

##### Error Responses

**Code**: 400 Bad Request (Example: Missing/invalid list or limit)

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": { /* Zod error details */ }
  }
}
```

#### Example

##### Request

```bash
# Get up to 10 random userkeys from the 'highlights' list
http GET https://api.ethos.network/api/v1/curated-lists/highlights limit==10
```

##### Response

```json
{
  "ok": true,
  "data": {
    "userkeys": [
      "profileId:50",
      "did:privy:user456",
      "profileId:22"
      // ... up to 10 random userkeys
    ]
  }
}
```

#### Notes

- Retrieves a list of userkeys from a named public curated list.
- The `list` parameter must be one of the predefined list names (e.g., `contributor_mode`, `highlights`).
- The `limit` parameter is required.
- Returns userkeys in a random order.
- Does not support pagination offsets or return total counts.
