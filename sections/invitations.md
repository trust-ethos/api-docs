# Invitations API

The Invitations API allows users to manage and query invitations on the Ethos network. These invitations are used to bring new users into the Ethos ecosystem and can impact the credibility scores of both the sender and recipient.

## Endpoints

### POST /api/v1/invitations

Retrieves a paginated list of invitations sent by a specific profile.

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `invitedBy` | integer | Yes | The profile ID of the user who sent the invitations |
| `pagination.limit` | integer | No | Maximum number of results to return (default: 10, max: 100) |
| `pagination.offset` | integer | No | Number of results to skip for pagination (default: 0) |

#### Example Request

```json
{
  "invitedBy": 123,
  "pagination": {
    "limit": 10,
    "offset": 0
  }
}
```

#### Success Response

The response includes a paginated list of invitations with their details.

```json
{
  "values": [
    {
      "id": "123-0x1234567890abcdef1234567890abcdef12345678",
      "senderProfileId": 123,
      "recipientAddress": "0x1234567890abcdef1234567890abcdef12345678",
      "status": "INVITED",
      "recipientScoreImpact": {
        "value": 10,
        "impact": "POSITIVE"
      },
      "senderScoreImpact": {
        "value": 5,
        "impact": "POSITIVE"
      },
      "dateInvited": "2023-08-15T14:30:00Z"
    },
    {
      "id": "123-0x8765432109abcdef8765432109abcdef87654321",
      "senderProfileId": 123,
      "recipientAddress": "0x8765432109abcdef8765432109abcdef87654321",
      "status": "ACCEPTED",
      "recipientScoreImpact": {
        "value": 10,
        "impact": "POSITIVE"
      },
      "senderScoreImpact": {
        "value": 5,
        "impact": "POSITIVE"
      },
      "dateInvited": "2023-08-10T09:15:00Z",
      "dateAccepted": "2023-08-12T11:20:00Z"
    }
  ],
  "total": 15,
  "limit": 10,
  "offset": 0
}
```

#### Error Responses

- `400 Bad Request`: Invalid parameters
- `500 Internal Server Error`: Server-side error

### GET /api/v1/invitations/pending/:address

Retrieves a list of pending invitations for a specific Ethereum address, ordered by the potential impact on the recipient's score.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | string | Yes | The Ethereum address to check for pending invitations |

#### Example Request

```
GET /api/v1/invitations/pending/0x1234567890abcdef1234567890abcdef12345678
```

#### Success Response

The response includes a list of profile IDs that have invited the specified address, along with the potential score impact if the invitation is accepted.

```json
[
  {
    "id": 456,
    "impact": {
      "value": 15,
      "relativeValue": 15,
      "impact": "POSITIVE",
      "adjustedRecipientScore": 85
    }
  },
  {
    "id": 789,
    "impact": {
      "value": 10,
      "relativeValue": 10,
      "impact": "POSITIVE",
      "adjustedRecipientScore": 80
    }
  }
]
```

#### Error Responses

- `400 Bad Request`: Invalid address format
- `500 Internal Server Error`: Server-side error

## Data Models

### Invitation

Represents an invitation to join the Ethos network.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | The unique identifier of the invitation |
| `senderProfileId` | integer | Yes | The profile ID of the user who sent the invitation |
| `recipientAddress` | string | Yes | The Ethereum address of the invitation recipient |
| `status` | string | Yes | The current status of the invitation (ACCEPTED, INVITED, ACCEPTED_OTHER_INVITATION) |
| `recipientScoreImpact` | object | No | The impact on the recipient's score if the invitation is accepted |
| `senderScoreImpact` | object | No | The impact on the sender's score when the invitation is accepted |
| `dateInvited` | string | Yes | The date and time when the invitation was sent |
| `dateAccepted` | string | No | The date and time when the invitation was accepted (if applicable) |

### ScoreChange

Represents the impact of a change in credibility score.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `value` | integer | Yes | The absolute value of the score change |
| `impact` | string | Yes | The type of impact (POSITIVE, NEGATIVE, NEUTRAL) |

### ScoreSimulationResult

Represents the simulated result of accepting an invitation on a user's score.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `value` | integer | Yes | The absolute value of the score change |
| `relativeValue` | integer | Yes | The relative value of the score change (positive or negative) |
| `impact` | string | Yes | The type of impact (POSITIVE, NEGATIVE, NEUTRAL) |
| `adjustedRecipientScore` | integer | Yes | The new score after adjustment |

### PendingInvitation

Represents a pending invitation with the potential impact on the recipient's score.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | Yes | The profile ID of the user who sent the invitation |
| `impact` | object | Yes | The potential impact on the recipient's score if accepted |
