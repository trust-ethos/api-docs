# Connections API

The Connections API allows you to retrieve information about on-chain interactions between Ethereum addresses, including transaction history and relationship data.

## Endpoints

### POST /api/v1/transactions/recent

Retrieves recent transactions between two specific Ethereum addresses.

#### Request

```json
{
  "address": "0x1234567890abcdef1234567890abcdef12345678",
  "connected": "0x8765432109abcdef8765432109abcdef87654321",
  "pagination": {
    "limit": 10,
    "offset": 0
  }
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | string | Yes | The primary Ethereum address to query transactions for |
| `connected` | string | Yes | The other Ethereum address to find transactions with |
| `pagination.limit` | integer | No | Maximum number of transactions to return (default: 10, max: 100) |
| `pagination.offset` | integer | No | Number of transactions to skip (default: 0) |

#### Success Response

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        "from_address": "0x1234567890abcdef1234567890abcdef12345678",
        "from_address_label": "Alice's Wallet",
        "from_address_entity_logo": "https://example.com/logo.png",
        "to_address": "0x8765432109abcdef8765432109abcdef87654321",
        "to_address_label": "Bob's Wallet",
        "to_address_entity_logo": "https://example.com/logo2.png",
        "value": "0.1",
        "block_timestamp": 1625097600,
        "category": "transfer",
        "summary": "Transferred 0.1 ETH to Bob's Wallet"
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 42
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `ok` | boolean | Indicates if the request was successful |
| `data.values` | array | List of transactions matching the query |
| `data.limit` | integer | Maximum number of transactions returned |
| `data.offset` | integer | Number of transactions skipped |
| `data.total` | integer | Total count of transactions matching the query |

#### Error Responses

- `400 Bad Request`: Invalid parameters provided
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `500 Internal Server Error`: Server-side error

---

### POST /api/v1/interactions/recent

Retrieves recent interactions for a given Ethereum address, including transaction history and potentially additional relationship data.

#### Request

```json
{
  "address": "0x1234567890abcdef1234567890abcdef12345678",
  "pagination": {
    "limit": 10,
    "offset": 0
  }
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | string | Yes | The Ethereum address to query interactions for |
| `pagination.limit` | integer | No | Maximum number of interactions to return (default: 10, max: 100) |
| `pagination.offset` | integer | No | Number of interactions to skip (default: 0) |

#### Success Response

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "address": "0x8765432109abcdef8765432109abcdef87654321",
        "last_transaction_timestamp": 1625097600,
        "transactions": [
          {
            "hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
            "from_address": "0x1234567890abcdef1234567890abcdef12345678",
            "to_address": "0x8765432109abcdef8765432109abcdef87654321",
            "value": "0.1",
            "block_timestamp": 1625097600,
            "category": "transfer",
            "summary": "Transferred 0.1 ETH to Bob's Wallet"
          }
        ],
        "reviews": [
          {
            "id": "review123",
            "content": "Great experience trading with this address",
            "rating": 5,
            "created_at": "2023-01-15T12:00:00Z"
          }
        ],
        "vouch": {
          "id": "vouch123",
          "message": "I trust this person",
          "created_at": "2023-01-15T12:00:00Z"
        }
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 15
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `ok` | boolean | Indicates if the request was successful |
| `data.values` | array | List of relationships with other addresses |
| `data.limit` | integer | Maximum number of interactions returned |
| `data.offset` | integer | Number of interactions skipped |
| `data.total` | integer | Total count of interactions found |

#### Error Responses

- `400 Bad Request`: Invalid parameters provided
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `500 Internal Server Error`: Server-side error

## Data Models

### Transaction

Represents a single Ethereum transaction.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `hash` | string | Yes | The transaction hash |
| `from_address` | string | Yes | The sender address |
| `from_address_label` | string | No | The label of the sender address, if available |
| `from_address_entity_logo` | string | No | URL to the sender entity logo, if available |
| `to_address` | string | Yes | The recipient address |
| `to_address_label` | string | No | The label of the recipient address, if available |
| `to_address_entity_logo` | string | No | URL to the recipient entity logo, if available |
| `value` | string | Yes | The transaction value |
| `block_timestamp` | integer | Yes | Unix timestamp of the block |
| `category` | string | No | Category of the transaction |
| `summary` | string | No | Human-readable summary of the transaction |

### Relationship

Represents the relationship between two Ethereum addresses, including transaction history and social data.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `address` | string | Yes | The Ethereum address involved in the relationship |
| `last_transaction_timestamp` | integer | Yes | Unix timestamp of the most recent transaction |
| `transactions` | array | Yes | List of transactions between the addresses |
| `reviews` | array | No | List of reviews between the users |
| `vouch` | object | No | Vouch information between the users, if available |
