# Categories API

## Overview

The Categories API allows for the management and retrieval of user categories and the users within them. Categories can be created, updated, deleted, and queried. Users can be added to or removed from specific categories.

## Endpoints

### Get Users in Category

```
GET /api/v1/categories/:id/users
```

**Description**: Retrieves a list of users (actors) belonging to a specific category, optionally filtered by search text.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Parameter | Type   | Description                       |
|-----------|--------|-----------------------------------|
| `id`      | number | The ID of the category.           |

##### Query Parameters

```typescript
{
  searchText?: string; // Optional: Filter users by name or username
  limit?: number;     // Optional: Pagination limit (default 50, max 100)
  offset?: number;    // Optional: Pagination offset (default 0)
}
```

| Parameter    | Type   | Required | Default | Description                                         |
|--------------|--------|----------|---------|-----------------------------------------------------|
| `searchText` | string | No       | -       | Filter users by `displayName` or `username`.        |
| `limit`      | number | No       | 50      | Maximum number of users to return (max 100).        |
| `offset`     | number | No       | 0       | Number of users to skip for pagination.             |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        // Based on observed response for category 1 + ActivityActor fields
        "id": number,               // User ID
        "profileId": number | null,
        "displayName": "string | null", // User display name
        "username": "string | null",   // User username (e.g., Twitter handle)
        "avatarUrl": "string | null",   // URL of the user's avatar
        "description": "string | null", // User description/bio
        "score": number | null,
        "status": "string | null",     // User status (e.g., "ACTIVE", "INACTIVE")
        "userkeys": ["string"],      // Array of userkeys associated with the user
        "addedAt": "string",        // ISO 8601 timestamp when user was added to category
        // Note: primaryAddress, scoreXpMultiplier may also be present but were null/absent in test
      }
      // ... more user objects
    ],
    "total": number,
    "limit": number,
    "offset": number
  }
}
```

##### Error Responses

**Code**: 400 Bad Request (Example: Invalid pagination or ID)

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters"
    // details may contain Zod error info
  }
}
```

**Code**: 404 Not Found (Potentially, if category ID does not exist - needs testing confirmation)

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Category not found" // Example message
  }
}
```

#### Example

##### Request

```bash
# Get the first 10 users containing "dev" in category 5
http GET https://api.ethos.network/api/v1/categories/5/users limit==10 searchText==dev
```

##### Response

```json
# Example response for category ID 1
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": 983154,
        "profileId": null,
        "displayName": "Spearbit",
        "username": "SpearbitDAO",
        "avatarUrl": "https://pbs.twimg.com/profile_images/1884611103335788544/kYEAPIka.jpg",
        "description": "Spearbit has now moved to @spearbit",
        "score": 1200,
        "status": "INACTIVE",
        "userkeys": [
          "service:x.com:1629597939944378376"
        ],
        "addedAt": "2025-03-28T22:20:11.165Z"
      }
    ],
    "total": 1,
    "limit": 50,
    "offset": 0
  }
}
```

#### Notes

- Retrieves users belonging to a specific category ID.
- The structure of the returned user object includes basic user info, status, userkeys, and when they were added to the category.
