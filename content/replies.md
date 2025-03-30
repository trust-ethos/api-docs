# Replies

## Endpoints

```
POST /api/v1/reply
POST /api/v1/reply/summary
```

## Query Replies

```
POST /api/v1/reply
```

**Description**: Retrieves a paginated list of replies for a specific target contract and parent IDs.

**Authentication Required**: No

### Parameters

#### Request Body

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `targetContract` | string | Yes | Ethereum address of the target contract |
| `parentIds` | array | Yes | Array of parent IDs to fetch replies for |
| `limit` | integer | Yes | Maximum number of results to return (max 100) |
| `offset` | integer | Yes | Number of results to skip |
| `orderDirection` | string | No | Sort order: "asc" or "desc" (default: "desc") |

### Responses

#### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "limit": 10,
    "offset": 0,
    "total": 0,
    "values": []
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | Paginated response |
| `data.limit` | integer | Maximum number of results returned |
| `data.offset` | integer | Number of results skipped |
| `data.total` | integer | Total number of matching replies |
| `data.values` | array | Array of reply objects |
| `data.values[].id` | integer | Reply ID |
| `data.values[].authorProfileId` | integer | Profile ID of the author |
| `data.values[].content` | string | Content of the reply |
| `data.values[].createdAt` | string | Creation timestamp (ISO 8601 format) |
| `data.values[].targetContract` | string | Ethereum address of the target contract |
| `data.values[].parentId` | integer | Parent ID that this reply is responding to |

#### Error Response

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation error",
    "fields": [
      {
        "code": "invalid_type",
        "expected": "array",
        "message": "Expected array, received number",
        "path": ["parentIds"],
        "received": "number"
      }
    ]
  }
}
```

### Example

#### Request

```bash
http POST "https://api.ethos.network/api/v1/reply" \
  targetContract=0x2820b3aB3543ADB80810f11F2651f0DD9A04E801 \
  parentIds:='[1]' \
  limit:=10 \
  offset:=0
```

## Get Reply Summaries

```
POST /api/v1/reply/summary
```

**Description**: Retrieves a summary of replies for specific target contracts and parent IDs, including the total count and whether the current user has participated in the discussion.

**Authentication Required**: No

### Parameters

#### Request Body

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `targetContract` | string | Yes | Ethereum address of the target contract |
| `parentIds` | array | Yes | Array of parent IDs to fetch reply summaries for |
| `currentUserProfileId` | integer or null | No | Profile ID of the current user to check for participation |

### Responses

#### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "0x2820b3aB3543ADB80810f11F2651f0DD9A04E801": {
      "1": {
        "count": 0,
        "participated": false
      }
    }
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | Map of target contracts to parent IDs to reply summaries |
| `data[targetContract]` | object | Map of parent IDs to reply summaries for a specific target contract |
| `data[targetContract][parentId]` | object | Reply summary for a specific parent ID |
| `data[targetContract][parentId].count` | integer | Total number of replies |
| `data[targetContract][parentId].participated` | boolean | Whether the current user has participated in the discussion |

#### Error Response

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation error",
    "fields": [
      {
        "code": "invalid_type",
        "expected": "number",
        "message": "Expected number, received nan",
        "path": ["currentUserProfileId"],
        "received": "nan"
      }
    ]
  }
}
```

### Example

#### Request

```bash
http POST "https://api.ethos.network/api/v1/reply/summary" \
  targetContract=0x2820b3aB3543ADB80810f11F2651f0DD9A04E801 \
  parentIds:='[1]' \
  currentUserProfileId:=null
```

### Notes

- The reply summary endpoint provides an efficient way to get the total number of replies and participation status without fetching all the individual replies.
- The structure of the response allows querying multiple target contracts and parent IDs in a single request.
- When `currentUserProfileId` is `null`, the `participated` field will always be `false`.
