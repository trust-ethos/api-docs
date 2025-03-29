# Reviews API

## Overview

The Reviews API provides endpoints for querying and retrieving information about reviews in the Ethos network. Reviews represent user ratings and feedback on other users or entities.

## Endpoints

### Query Reviews

```
POST /api/v1/reviews
```

Retrieves reviews based on specified filters and pagination parameters.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ids | number[] | No | Array of specific review IDs to retrieve |
| subject | string[] | No | Array of user identifiers (address, profile ID, or attestation) that received reviews |
| author | number[] | No | Array of profile IDs that authored reviews |
| attestation | object[] | No | Array of attestation objects to filter by, can include service+account or service+username pairs |
| archived | boolean | No | Whether to include archived reviews |
| score | string[] | No | Array of review scores to include ("positive", "neutral", "negative") |
| orderBy | object | No | Sorting criteria (e.g., `{ "createdAt": "desc" }`) |
| pagination | object | Yes | Pagination parameters |
| pagination.limit | number | No | Maximum number of results (default: 20, max: 100) |
| pagination.offset | number | No | Number of results to skip for pagination |

#### Response

```json
{
  "values": [
    {
      "id": 12345,
      "authorProfileId": 1001,
      "subject": "0x1234...",
      "service": "x.com",
      "account": "username",
      "score": 2,
      "message": "Great contributor!",
      "createdAt": "2023-05-01T12:34:56Z",
      "updatedAt": "2023-05-01T12:34:56Z",
      "events": [
        {
          "id": 98765,
          "txHash": "0x5678...",
          "blockNumber": 123456,
          "timestamp": "2023-05-01T12:34:56Z"
        }
      ]
    }
  ],
  "limit": 20,
  "offset": 0,
  "total": 150
}
```

### Count Reviews

```
POST /api/v1/reviews/count
```

Counts reviews based on specified filters.

#### Request Parameters

Same filtering parameters as the query endpoint, without pagination.

#### Response

```json
{
  "count": 150
}
```

### Get Review Statistics

```
POST /api/v1/reviews/stats
```

Retrieves statistics about reviews for a specific user.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| target | string | Yes | User identifier (address, profile ID, or attestation in format `service:account`) |
| timeRange | object | No | Time range for filtering reviews |
| timeRange.startDate | string | No | Start date for the time range (ISO format) |
| timeRange.endDate | string | No | End date for the time range (ISO format) |

#### Response

```json
{
  "byAddress": {
    "0x1234...": {
      "received": 10,
      "averageReviewForUser": 1.8,
      "positiveReviewPercentage": 90,
      "percentile": 85,
      "positiveReviewCount": 9,
      "negativeReviewCount": 1,
      "neutralReviewCount": 0
    }
  },
  "byAttestation": {
    "x.com": {
      "username": {
        "received": 5,
        "averageReviewForUser": 1.6,
        "positiveReviewPercentage": 80,
        "percentile": 75,
        "positiveReviewCount": 4,
        "negativeReviewCount": 1,
        "neutralReviewCount": 0
      }
    }
  },
  "total": {
    "received": 15,
    "averageReviewForUser": 1.73,
    "positiveReviewPercentage": 86.7,
    "percentile": 85,
    "positiveReviewCount": 13,
    "negativeReviewCount": 2,
    "neutralReviewCount": 0
  }
}
```

### Get Bulk Review Statistics

```
POST /api/v1/reviews/stats/bulk
```

Retrieves review statistics for multiple users in a single request.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userkeys | string[] | Yes | Array of user identifiers (addresses, profile IDs, or attestations) |
| timeRange | object | No | Time range for filtering reviews |
| timeRange.startDate | string | No | Start date for the time range (ISO format) |
| timeRange.endDate | string | No | End date for the time range (ISO format) |

#### Response

```json
{
  "user1": {
    "byAddress": { ... },
    "byAttestation": { ... },
    "total": { ... }
  },
  "user2": {
    "byAddress": { ... },
    "byAttestation": { ... },
    "total": { ... }
  }
}
```

Each user entry has the same structure as the response from the `/reviews/stats` endpoint.

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

## Score Values

Review scores have the following meanings:

- **positive (2)**: Positive review
- **neutral (1)**: Neutral review
- **negative (0)**: Negative review

The statistics calculate positive review percentage by excluding neutral reviews, following the formula:
`positiveReviewPercentage = (positiveCount / (positiveCount + negativeCount)) * 100`
