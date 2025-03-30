# Invitations API

## Overview

The Invitations API allows querying invitations sent by specific profiles and retrieving pending invitations for a given Ethereum address.

## Endpoints

### List Invitations Sent by a Profile

```
POST /api/v1/invitations
```

**Description**: Retrieves a list of invitations sent by a specific profile.

**Authentication Required**: No

### Parameters

#### Request Body

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invitedBy` | integer | Yes | The profile ID of the sender |
| `pagination` | object | Yes | Pagination parameters |
| `pagination.limit` | integer | Yes | Maximum number of results to return |
| `pagination.offset` | integer | Yes | Number of results to skip |

### Responses

#### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "limit": 10,
    "offset": 0,
    "total": 210,
    "values": [
      {
        "id": "1-0xA29f7b8E549c48435e1f5e67C30Cb1E47EEDd8A9",
        "senderProfileId": 1,
        "recipientAddress": "0xA29f7b8E549c48435e1f5e67C30Cb1E47EEDd8A9",
        "status": "ACCEPTED",
        "recipientScoreImpact": {
          "value": 25,
          "impact": "POSITIVE"
        },
        "senderScoreImpact": {
          "value": 0,
          "impact": "NEUTRAL"
        },
        "dateInvited": "2025-03-28T19:17:39.000Z",
        "dateAccepted": "2025-03-28T19:22:43.000Z"
      }
    ]
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | Paginated response |
| `data.limit` | integer | Maximum number of results returned |
| `data.offset` | integer | Number of results skipped |
| `data.total` | integer | Total number of matching invitations |
| `data.values` | array | Array of invitation objects |
| `data.values[].id` | string | Invitation ID (format: `${senderProfileId}-${recipientAddress}`) |
| `data.values[].senderProfileId` | integer | Profile ID of the sender |
| `data.values[].recipientAddress` | string | Ethereum address of the recipient |
| `data.values[].status` | string | Status of the invitation: "INVITED", "ACCEPTED", or "ACCEPTED_OTHER_INVITATION" |
| `data.values[].recipientScoreImpact` | object | Impact on the recipient's score |
| `data.values[].recipientScoreImpact.value` | integer | Magnitude of the score impact |
| `data.values[].recipientScoreImpact.impact` | string | Type of impact: "POSITIVE", "NEGATIVE", or "NEUTRAL" |
| `data.values[].senderScoreImpact` | object | Impact on the sender's score |
| `data.values[].senderScoreImpact.value` | integer | Magnitude of the score impact |
| `data.values[].senderScoreImpact.impact` | string | Type of impact: "POSITIVE", "NEGATIVE", or "NEUTRAL" |
| `data.values[].dateInvited` | string | Date the invitation was sent (ISO 8601 format) |
| `data.values[].dateAccepted` | string | Date the invitation was accepted (ISO 8601 format), only present if accepted |

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
        "message": "Expected number, received string",
        "path": ["invitedBy"],
        "received": "string"
      }
    ]
  }
}
```

### Example

#### Request

```bash
http POST "https://api.ethos.network/api/v1/invitations" \
  invitedBy:=1 \
  pagination:='{"limit": 10, "offset": 0}'
```

### Get Pending Invitations for an Address

```
GET /api/v1/invitations/pending/:address
```

**Description**: Retrieves a list of pending invitations for a specific Ethereum address.

**Authentication Required**: No

### Parameters

#### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address` | string | Yes | Ethereum address to check for pending invitations |

### Responses

#### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": [
    {
      "id": 42,
      "impact": {
        "value": 25,
        "relativeValue": 25,
        "impact": "POSITIVE",
        "adjustedRecipientScore": 1025
      }
    }
  ]
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | array | Array of pending invitation objects |
| `data[].id` | integer | Profile ID of the sender |
| `data[].impact` | object | Score impact if the invitation is accepted |
| `data[].impact.value` | integer | Absolute value of the score change |
| `data[].impact.relativeValue` | integer | Relative value (positive or negative) |
| `data[].impact.impact` | string | Type of impact: "POSITIVE", "NEGATIVE", or "NEUTRAL" |
| `data[].impact.adjustedRecipientScore` | integer | The recipient's adjusted score if the invitation is accepted |

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
        "code": "invalid_string",
        "message": "Invalid ethereum address",
        "path": ["address"],
        "validation": "regex"
      }
    ]
  }
}
```

### Example

#### Request

```bash
http GET "https://api.ethos.network/api/v1/invitations/pending/0xA29f7b8E549c48435e1f5e67C30Cb1E47EEDd8A9"
```

### Notes

- The response will be an empty array (`[]`) if there are no pending invitations for the address.
- Invitations are sorted by the potential score impact on the recipient in descending order.
