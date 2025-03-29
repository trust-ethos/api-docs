# Replies API

## Overview

The Replies API allows developers to retrieve and manage replies to various content across the Ethos platform. This API provides endpoints for querying replies based on specific criteria and fetching summaries of reply activity.

## Endpoints

### Query Replies

```
POST /api/v1/replies/query
```

Retrieves replies based on specified filters and pagination parameters.

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| targetContract | string | Yes | The contract address of the target item |
| parentIds | string[] | Yes | Array of parent IDs to fetch replies for |
| currentUserProfileId | string | No | Profile ID of the current user to determine participation |
| pageSize | number | No | Number of replies to return per page (default: 10) |
| pageNumber | number | No | Page number for pagination (default: 1) |
| sortBy | string | No | Field to sort by (default: 'createdAt') |
| sortDirection | string | No | Direction to sort ('asc' or 'desc', default: 'desc') |

#### Example Request

```json
{
  "targetContract": "0x1234567890abcdef1234567890abcdef12345678",
  "parentIds": ["123", "456"],
  "currentUserProfileId": "789",
  "pageSize": 5,
  "pageNumber": 1,
  "sortBy": "createdAt",
  "sortDirection": "desc"
}
```

#### Success Response (200 OK)

```json
{
  "replies": [
    {
      "id": "reply-123",
      "parentId": "123",
      "authorProfileId": "user-456",
      "content": "This is a reply to the original content.",
      "parentIsOriginalComment": true,
      "targetContract": "0x1234567890abcdef1234567890abcdef12345678",
      "createdAt": "2023-04-15T10:30:00Z",
      "metadata": {
        "editedAt": "2023-04-15T11:15:00Z"
      }
    },
    {
      "id": "reply-124",
      "parentId": "123",
      "authorProfileId": "user-789",
      "content": "Another reply to the discussion.",
      "parentIsOriginalComment": true,
      "targetContract": "0x1234567890abcdef1234567890abcdef12345678",
      "createdAt": "2023-04-15T11:00:00Z"
    }
  ],
  "totalCount": 15,
  "pageSize": 5,
  "pageNumber": 1,
  "totalPages": 3
}
```

#### Error Response (400 Bad Request)

```json
{
  "error": "Invalid parameters. Missing required field 'parentIds'."
}
```

### Get Reply Summary

```
POST /api/v1/replies/summary
```

Retrieves a summary of replies for the specified parent items, including the total count of replies and whether the current user has participated in the discussion.

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| targetContract | string | Yes | The contract address of the target item |
| parentIds | string[] | Yes | Array of parent IDs to fetch summaries for |
| currentUserProfileId | string | No | Profile ID of the current user to determine participation |

#### Example Request

```json
{
  "targetContract": "0x1234567890abcdef1234567890abcdef12345678",
  "parentIds": ["123", "456", "789"],
  "currentUserProfileId": "user-101"
}
```

#### Success Response (200 OK)

```json
{
  "summaries": {
    "0x1234567890abcdef1234567890abcdef12345678": {
      "123": {
        "count": 15,
        "participated": true
      },
      "456": {
        "count": 7,
        "participated": false
      },
      "789": {
        "count": 0,
        "participated": false
      }
    }
  }
}
```

#### Error Response (400 Bad Request)

```json
{
  "error": "Invalid parameters. Target contract must be a valid address."
}
```

## Data Models

### Reply

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier for the reply |
| parentId | string | Yes | ID of the parent content this is replying to |
| authorProfileId | string | Yes | Profile ID of the author who created the reply |
| content | string | Yes | Text content of the reply |
| parentIsOriginalComment | boolean | Yes | Whether the parent is the original content (true) or another reply (false) |
| targetContract | string | Yes | Contract address of the target item |
| createdAt | string (ISO date) | Yes | Timestamp when the reply was created |
| metadata | object | No | Additional metadata about the reply (e.g., edits, flags) |

### Reply Summary

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| count | number | Yes | Total number of replies for the parent content |
| participated | boolean | Yes | Whether the current user has participated in this discussion |
