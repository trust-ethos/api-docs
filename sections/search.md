# Search API

The Search API provides a unified search interface across different entities in the Ethos network, including profiles, users, Twitter accounts, ENS names, and Ethereum addresses.

## Endpoints

### GET /api/v1/search

Performs a unified search across profiles, users, Twitter accounts, and ENS names/addresses.

{% openapi src="../openapi.yaml" path="/api/v1/search" method="get" %}
{% endopenapi %}

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | The search term (minimum 2 characters, maximum 100 characters) |
| `limit` | integer | No | Maximum number of results to return (default: 10, max: 100) |
| `offset` | integer | No | Number of results to skip for pagination (default: 0) |

#### Example Request

```
GET /api/v1/search?query=alice&limit=5&offset=0
```

#### Success Response

The response includes a list of actors matching the search query, sorted by relevance.

```json
{
  "values": [
    {
      "profileId": "profile_123",
      "name": "Alice Johnson",
      "username": "alice",
      "avatarUrl": "https://example.com/avatar.png",
      "score": 95,
      "xp": 1200,
      "address": "0x1234567890abcdef1234567890abcdef12345678"
    },
    {
      "name": "Alice Smith",
      "username": "alicesmith",
      "score": 85,
      "xp": 800,
      "address": "0x8765432109abcdef8765432109abcdef87654321"
    }
  ],
  "total": 12,
  "limit": 5,
  "offset": 0
}
```

#### Error Responses

- `400 Bad Request`: Invalid parameters (e.g., query too short or too long)
- `500 Internal Server Error`: Server-side error

#### Notes on Search Algorithm

The search algorithm prioritizes results based on several factors:
1. Exact matches with the query
2. Partial matches starting with the query
3. Profiles take precedence over non-profiles
4. Accounts with usernames take precedence over those without
5. Accounts with real names take precedence over those with only addresses
6. Higher credibility scores result in higher ranking

### GET /api/v1/markets/search

Search for markets by profile name, username, or other identifiers.

{% openapi src="../openapi.yaml" path="/api/v1/markets/search" method="get" %}
{% endopenapi %}

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | No | The search term. If not provided, returns all markets. |

#### Example Request

```
GET /api/v1/markets/search?query=ethos
```

#### Success Response

The response includes a list of market profiles matching the search query.

```json
{
  "values": [
    {
      "profileId": "profile_abc123",
      "name": "Ethos Network",
      "username": "ethos",
      "avatarUrl": "https://example.com/avatar.png",
      "address": "0x1234567890abcdef1234567890abcdef12345678",
      "price": "0.125",
      "priceChange24h": "5.2",
      "supply": "1000",
      "holders": 42,
      "marketCap": "125.0",
      "volume24h": "32.5"
    }
  ]
}
```

#### Error Responses

- `400 Bad Request`: Invalid parameters
- `500 Internal Server Error`: Server-side error

## Data Models

### Activity Actor

Represents a user or entity in the Ethos network.

| Field | Type | Description |
|-------|------|-------------|
| `profileId` | string | The profile ID, if the user has an Ethos profile |
| `name` | string | The display name of the user |
| `username` | string | The username, if available |
| `avatarUrl` | string | URL to the user's avatar image |
| `score` | number | The credibility score of the user |
| `xp` | number | The experience points of the user |
| `address` | string | The primary Ethereum address associated with the user |

### Market Profile

Represents a market associated with a user profile.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `profileId` | string | Yes | The profile ID associated with this market |
| `name` | string | Yes | The name of the profile |
| `username` | string | No | The username associated with the profile |
| `avatarUrl` | string | No | URL to the profile's avatar image |
| `address` | string | Yes | The contract address for this market |
| `price` | string | Yes | The current price of the market token |
| `priceChange24h` | string | No | The price change percentage in the last 24 hours |
| `supply` | string | Yes | The total supply of tokens |
| `holders` | integer | No | The number of token holders |
| `marketCap` | string | Yes | The market capitalization |
| `volume24h` | string | No | Trading volume in the last 24 hours |
