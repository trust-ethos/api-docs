# Markets

## Endpoints

```
GET /api/v1/markets/search
POST /api/v1/markets/bulk
POST /api/v1/markets/news
GET /api/v1/markets/:profileId
GET /api/v1/markets/:profileId/price/history
GET /api/v1/markets/:profileId/tx/history
GET /api/v1/markets/:profileId/holders
GET /api/v1/markets/activity/:address
GET /api/v1/markets/holdings/:address
GET /api/v1/markets/holdings/:address/total
GET /api/v1/markets/volume/:address
GET /api/v1/markets/leaderboard/xp
GET /api/v1/markets/leaderboard/profit
```

## Search Markets

```
GET /api/v1/markets/search
```

**Description**: Search for markets using a query string or retrieve all markets if no query is provided.

**Authentication Required**: No

### Parameters

#### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `q` | string | No | Query string to search for markets (minimum 2 characters) |
| `limit` | integer | No | Maximum number of results to return (default: 50) |

### Responses

#### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": [
    {
      "marketProfileId": 8,
      "creatorAddress": "0x937EC42DDfEC2059BB64D613F99547a62cda6c01",
      "positivePrice": "6607563687658171",
      "negativePrice": "3392436312341829",
      "trustVotes": 1001,
      "distrustVotes": 1,
      "createdAt": "2025-03-24T20:53:17.152Z",
      "updatedAt": "2025-03-29T02:06:01.795Z",
      "basePrice": "10000000000000000",
      "creationCost": "100000000000000000",
      "liquidity": "1500",
      "configType": "NORMAL",
      "profile": {
        "primaryAddress": "0x937EC42DDfEC2059BB64D613F99547a62cda6c01",
        "avatarUrl": "https://pbs.twimg.com/profile_images/1700729497065037824/huYFFzHU.jpg",
        "ethosScore": 2157,
        "name": "Serpin Taxt",
        "twitterUsername": "0x5f_eth"
      },
      "stats": {
        "marketCapWei": "5981214232666665577",
        "volumeTotalWei": "9050462814877006197",
        "volume24hWei": "408403006795422611",
        "priceChange24hPercent": -1
      }
    }
  ]
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | array | Array of market objects |
| `data[].marketProfileId` | integer | Unique identifier for the market |
| `data[].creatorAddress` | string | Ethereum address of the market creator |
| `data[].positivePrice` | string | Current positive price in wei |
| `data[].negativePrice` | string | Current negative price in wei |
| `data[].trustVotes` | integer | Number of trust votes |
| `data[].distrustVotes` | integer | Number of distrust votes |
| `data[].createdAt` | string | Creation timestamp (ISO 8601 format) |
| `data[].updatedAt` | string | Last update timestamp (ISO 8601 format) |
| `data[].basePrice` | string | Base price in wei |
| `data[].creationCost` | string | Creation cost in wei |
| `data[].liquidity` | string | Liquidity parameter |
| `data[].configType` | string | Market configuration type (VOLATILE, NORMAL, or INSULATED) |
| `data[].profile` | object | Market profile information |
| `data[].profile.primaryAddress` | string | Primary Ethereum address of the profile |
| `data[].profile.avatarUrl` | string | URL to the profile's avatar image |
| `data[].profile.ethosScore` | integer | Ethos reputation score |
| `data[].profile.name` | string | Display name |
| `data[].profile.twitterUsername` | string or null | Twitter username, if available |
| `data[].stats` | object | Market statistics |
| `data[].stats.marketCapWei` | string | Market capitalization in wei |
| `data[].stats.volumeTotalWei` | string | Total trading volume in wei |
| `data[].stats.volume24hWei` | string | 24-hour trading volume in wei |
| `data[].stats.priceChange24hPercent` | integer | 24-hour price change percentage |

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
        "code": "too_small",
        "minimum": 2,
        "type": "string",
        "message": "String must contain at least 2 character(s)",
        "path": ["query"]
      }
    ]
  }
}
```

### Example

#### Request

```bash
http GET "https://api.ethos.network/api/v1/markets/search?q=alice&limit=2"
```

#### Response

```json
{
  "ok": true,
  "data": [
    {
      "marketProfileId": 8,
      "creatorAddress": "0x937EC42DDfEC2059BB64D613F99547a62cda6c01",
      "positivePrice": "6607563687658171",
      "negativePrice": "3392436312341829",
      "trustVotes": 1001,
      "distrustVotes": 1,
      "createdAt": "2025-03-24T20:53:17.152Z",
      "updatedAt": "2025-03-29T02:06:01.795Z",
      "basePrice": "10000000000000000",
      "creationCost": "100000000000000000",
      "liquidity": "1500",
      "configType": "NORMAL",
      "profile": {
        "primaryAddress": "0x937EC42DDfEC2059BB64D613F99547a62cda6c01",
        "avatarUrl": "https://pbs.twimg.com/profile_images/1700729497065037824/huYFFzHU.jpg",
        "ethosScore": 2157,
        "name": "Serpin Taxt",
        "twitterUsername": "0x5f_eth"
      },
      "stats": {
        "marketCapWei": "5981214232666665577",
        "volumeTotalWei": "9050462814877006197",
        "volume24hWei": "408403006795422611",
        "priceChange24hPercent": -1
      }
    },
    {
      "marketProfileId": 19,
      "creatorAddress": "0x287bDF8c332D44Bb015F8b4dEb6513010c951f39",
      "positivePrice": "5522090019531452",
      "negativePrice": "4477909980468548",
      "trustVotes": 1071,
      "distrustVotes": 23,
      "createdAt": "2025-01-29T18:15:01.593Z",
      "updatedAt": "2025-03-26T15:12:10.158Z",
      "basePrice": "10000000000000000",
      "creationCost": "200000000000000000",
      "liquidity": "5000",
      "configType": "INSULATED",
      "profile": {
        "primaryAddress": "0x287bDF8c332D44Bb015F8b4dEb6513010c951f39",
        "avatarUrl": "https://pbs.twimg.com/profile_images/1610827135978987522/qGWbuvec.jpg",
        "ethosScore": 1787,
        "name": "IcoBeast.eth🦇🔊",
        "twitterUsername": "beast_ico"
      },
      "stats": {
        "marketCapWei": "5997437649050558396",
        "volumeTotalWei": "15810403317143536524",
        "volume24hWei": "16730189449966183",
        "priceChange24hPercent": 0
      }
    }
  ]
}
```

### Notes

- If no query (`q`) parameter is provided, the endpoint will return all markets.
- The search matches against market profile names, Twitter usernames, and other profile information.
- The query parameter must contain at least 2 characters for a valid search.
- The default limit is 50 markets, but this can be customized using the `limit` parameter.
- Market configuration types include: VOLATILE (highest risk/reward), NORMAL (balanced), and INSULATED (lowest risk/reward).
- All price values are returned as strings to preserve precision for large numbers.

---

## Get Bulk Market Info by Profile IDs

```
POST /api/v1/markets/bulk
```

**Description**: Retrieves detailed market information for multiple markets based on their associated profile IDs.

**Authentication Required**: No

### Parameters

#### Request Body

```json
{
  "profileIds": [1, 8, 19]
}
```

| Property     | Type           | Required | Description                         |
|--------------|----------------|----------|-------------------------------------|
| `profileIds` | array of numbers | Yes      | Array of profile IDs for the markets to retrieve. |

### Responses

#### Success Response

**Code**: 200 OK

Returns an array of market objects, with the same structure as the objects returned by the `GET /api/v1/markets/search` endpoint.

```json
{
  "ok": true,
  "data": [
    {
      "marketProfileId": 1,
      "creatorAddress": "0x9E2218375567BB466b81E38E1a8b599b6250408C",
      "positivePrice": "13394648448485010",
      "negativePrice": "6605351551514990",
      "trustVotes": 1717,
      "distrustVotes": 16,
      "createdAt": "2024-09-14T00:00:00.000Z",
      "updatedAt": "2025-03-30T04:35:04.439Z",
      "basePrice": "10000000000000000",
      "creationCost": "100000000000000000",
      "liquidity": "1000",
      "configType": "NORMAL",
      "profile": {
        "primaryAddress": "0x9E2218375567BB466b81E38E1a8b599b6250408C",
        "avatarUrl": "https://pbs.twimg.com/profile_images/1797826077194096640/d_YEoB8n.jpg",
        "ethosScore": 1711,
        "name": "Ethos",
        "twitterUsername": "ethos_network"
      },
      "stats": {
        "marketCapWei": "7836838875288201409",
        "volumeTotalWei": "11279993864858341235",
        "volume24hWei": "10606200508522432",
        "priceChange24hPercent": 0
      }
    },
    {
      "marketProfileId": 8,
      // ... other market data ...
    }
    // ... more market objects
  ]
}
```
(See `GET /api/v1/markets/search` documentation for detailed field descriptions of the market object.)

#### Error Response

**Code**: 400 Bad Request (Example: Invalid input)

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
        "received": "undefined",
        "path": [
          "profileIds"
        ],
        "message": "Required"
      }
    ]
  }
}
```

**Code**: 500 Internal Server Error (Example: Profile data not found for a market)

```json
{
  "ok": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "No ethos user profile for market <profileId>"
  }
}
```

### Example

#### Request

```bash
http POST https://api.ethos.network/api/v1/markets/bulk \\
  profileIds:='[1, 8]'
```

### Notes

- This endpoint is useful for fetching data for a specific set of markets when their profile IDs are known.
- If any requested `profileId` does not correspond to an existing market or its associated profile cannot be found, the request may fail with a 500 error.

---

## Get Market News (Associated Tweets)

```
POST /api/v1/markets/news
```

**Description**: Retrieves recent popular tweets from the Twitter accounts associated (via attestation) with the given market profile IDs. This is used to show relevant recent social activity for markets.

**Authentication Required**: No

### Parameters

#### Request Body

Expects a raw JSON array of profile IDs.

```json
[1, 8, 19]
```

| Value Type      | Required | Description                                       |
|-----------------|----------|---------------------------------------------------|
| array of numbers | Yes      | Array of profile IDs for the markets to retrieve associated tweets for. |

### Responses

#### Success Response

**Code**: 200 OK

Returns an array of objects, each mapping a `marketProfileId` to a `tweet` object (or `null` if no relevant tweet was found/cached).

```json
{
  "ok": true,
  "data": [
    {
      "marketProfileId": 1,
      "tweet": {
        "id": "1770000000000000001",
        "text": "Exciting updates coming to the Ethos Network market! #Ethos",
        "createdAt": "2025-03-30T08:00:00.000Z",
        "url": "https://x.com/ethos_network/status/1770000000000000001",
        "retweets": 50,
        "likes": 200,
        "replies": 10,
        "impressions": 5000
      }
    },
    {
      "marketProfileId": 8,
      "tweet": null
    },
    {
      "marketProfileId": 19,
      "tweet": {
        "id": "1770000000000000005",
        "text": "Just traded on the @IcoBeast market on @ethos_market! Great platform.",
        "createdAt": "2025-03-29T18:30:00.000Z",
        "url": "https://x.com/some_user/status/1770000000000000005",
        "retweets": 5,
        "likes": 25,
        "replies": 2,
        "impressions": 1000
      }
    }
    // ... more objects
  ]
}
```

| Property                   | Type   | Description                                                     |
|----------------------------|--------|-----------------------------------------------------------------|
| `ok`                       | boolean| Success status                                                  |
| `data`                     | array  | Array of market news objects                                     |
| `data[].marketProfileId`   | number | The profile ID of the market                                     |
| `data[].tweet`             | object \| null | The associated tweet object, or `null` if none found/applicable |
| `data[].tweet.id`          | string | The ID of the tweet                                             |
| `data[].tweet.text`        | string | The text content of the tweet                                   |
| `data[].tweet.createdAt`   | string | ISO 8601 timestamp when the tweet was created                   |
| `data[].tweet.url`         | string | URL to the tweet on X.com                                       |
| `data[].tweet.retweets`    | number | Number of retweets                                              |
| `data[].tweet.likes`       | number | Number of likes                                                 |
| `data[].tweet.replies`     | number | Number of replies                                               |
| `data[].tweet.impressions` | number | Number of impressions                                           |


#### Error Response

**Code**: 400 Bad Request (Example: Invalid input type)

```json
{
    "ok": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "fields": [
            {
                "code": "invalid_type",
                "expected": "array",
                "message": "Expected array, received object", // Or similar type error
                "path": [],
                "received": "object"
            }
        ],
        "message": "Validation error"
    }
}
```

### Example

#### Request

```bash
# Example using httpie with raw JSON body
echo \'[1, 8, 19]\' | http POST https://api.ethos.network/api/v1/markets/news Content-Type:application/json
```

### Notes

- This endpoint finds the Twitter account associated with each market's profile ID via X attestations.
- It then attempts to retrieve a recent, popular tweet from that user's timeline.
- Tweet data is cached for performance (currently 24 hours). If no suitable tweet is found in the cache or via a fresh fetch, `null` will be returned for that market's `tweet` field.
- The selection criteria for "popular" tweets are based on an internal scoring mechanism considering retweets, replies, likes, and impressions.

---

## Get Market by Profile ID

```
GET /api/v1/markets/:profileId
```

**Description**: Retrieves detailed market information for a specific market based on its associated profile ID.

**Authentication Required**: No

### Parameters

#### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `profileId` | integer | Yes | Profile ID of the market to retrieve. |

### Responses

#### Success Response

**Code**: 200 OK

Returns a market object, with the same structure as the objects returned by the `GET /api/v1/markets/search` endpoint.

```json
{
  "ok": true,
  "data": {
    "marketProfileId": 1,
    "creatorAddress": "0x9E2218375567BB466b81E38E1a8b599b6250408C",
    "positivePrice": "13394648448485010",
    "negativePrice": "6605351551514990",
    "trustVotes": 1717,
    "distrustVotes": 16,
    "createdAt": "2024-09-14T00:00:00.000Z",
    "updatedAt": "2025-03-30T04:35:04.439Z",
    "basePrice": "10000000000000000",
    "creationCost": "100000000000000000",
    "liquidity": "1000",
    "configType": "NORMAL",
    "profile": {
      "primaryAddress": "0x9E2218375567BB466b81E38E1a8b599b6250408C",
      "avatarUrl": "https://pbs.twimg.com/profile_images/1797826077194096640/d_YEoB8n.jpg",
      "ethosScore": 1711,
      "name": "Ethos",
      "twitterUsername": "ethos_network"
    },
    "stats": {
      "marketCapWei": "7836838875288201409",
      "volumeTotalWei": "11279993864858341235",
      "volume24hWei": "10606200508522432",
      "priceChange24hPercent": 0
    }
  }
}
```
(See `GET /api/v1/markets/search` documentation for detailed field descriptions of the market object.)

#### Error Response

**Code**: 404 Not Found (Example: Market not found)

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Market not found"
  }
}
```

### Example

#### Request

```bash
http GET https://api.ethos.network/api/v1/markets/1
```

### Notes

- This endpoint is useful for fetching detailed data for a specific market when its profile ID is known.
- If the requested `profileId` does not correspond to an existing market, the request will fail with a 404 error.

---

## Get Market Price History

```
GET /api/v1/markets/:profileId/price/history
```

**Description**: Retrieves the price history for a specific market based on its associated profile ID.

**Authentication Required**: No

### Parameters

#### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `profileId` | integer | Yes | Profile ID of the market to retrieve price history for. |

### Responses

#### Success Response

**Code**: 200 OK

Returns an array of price history objects, each containing the timestamp and price in wei.
Returns an array of price event objects, each containing the positive/negative price and the creation timestamp.

```json
{
  "ok": true,
  "data": [
    {
      "timestamp": "2025-03-29T00:00:00.000Z",
      "priceWei": "13394648448485010",
      "positivePrice": "5366010793535907",
      "negativePrice": "4633989206464093",
      "createdAt": "2025-03-24T21:03:47.000Z"
    },
    {
      "timestamp": "2025-03-28T00:00:00.000Z",
      "priceWei": "13200000000000000",
      "positivePrice": "5364353017406441",
      "negativePrice": "4635646982593559",
      "createdAt": "2025-03-24T21:03:03.000Z"
    },
    // ... more price history objects
  ]
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | array | Array of price history objects |
| `data[].timestamp` | string | Timestamp of the price data point (ISO 8601 format) |
| `data[].priceWei` | string | Price in wei at the given timestamp |
| `data[].positivePrice` | string | Positive price in wei at this event time |
| `data[].negativePrice` | string | Negative price in wei at this event time |
| `data[].createdAt` | string | Timestamp of the price change event (ISO 8601 format) |

#### Error Response

**Code**: 404 Not Found (Example: Market not found)

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Market not found"
  }
}
```

### Example

#### Request

```bash
http GET https://api.ethos.network/api/v1/markets/1/price/history
```

### Notes

- This endpoint is useful for fetching price history data for a specific market when its profile ID is known.
- If the requested `profileId` does not correspond to an existing market, the request will fail with a 404 error.
- The price history data is sorted by timestamp in ascending order.
- The data reflects recorded price change events, not necessarily sampled at regular intervals.

---

## Get Market Transaction History

```
GET /api/v1/markets/:profileId/tx/history
```

**Description**: Retrieves the transaction history for a specific market based on its associated profile ID.

**Authentication Required**: No

### Parameters

#### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `profileId` | integer | Yes | Profile ID of the market to retrieve transaction history for. |

### Responses

#### Success Response

**Code**: 200 OK

Returns an array of transaction history objects, each containing the transaction hash, timestamp, type, and amount.
Returns a paginated list of transaction history objects for the specified market.

```json
{
  "ok": true,
  "data": [
    {
      "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "timestamp": "2025-03-30T10:00:00.000Z",
      "type": "BUY",
      "amountWei": "1000000000000000000"
    },
    {
      "txHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      "timestamp": "2025-03-29T14:30:00.000Z",
      "type": "SELL",
      "amountWei": "500000000000000000"
    },
    // ... more transaction history objects
  ]
  "data": {
    "values": [
      {
        "eventId": 851534,
        "marketId": 8,
        "actorAddress": "0x57E5D96c50ceE6bFa0Fc12dD7892Cf50B5892e91",
        "type": "SELL",
        "voteType": "trust",
        "votes": 17,
        "funds": "111418815322905231",
        "txHash": "0x1b833c4fa432df3b0bef27df41fcd993bc903f147b0ba9ebcf3c82ef0005353c",
        "timestamp": 1743213959
      },
      {
        "eventId": 844872,
        "marketId": 8,
        "actorAddress": "0x7B3D5e9Ab82D3390792793468854975004440Cf6",
        "type": "SELL",
        "voteType": "trust",
        "votes": 45,
        "funds": "296984191472517380",
        "txHash": "0xbd7d708ab9b979b0499ef148f5ad940643610982d01cd42530809b5e9223bbdd",
        "timestamp": 1743188997
      }
      // ... more transaction objects
    ],
    "total": 150,
    "limit": 50,
    "offset": 0
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | array | Array of transaction history objects |
| `data[].txHash` | string | Transaction hash |
| `data[].timestamp` | string | Timestamp of the transaction (ISO 8601 format) |
| `data[].type` | string | Transaction type (BUY or SELL) |
| `data[].amountWei` | string | Transaction amount in wei |
| `data` | object | Paginated response object |
| `data.values` | array | Array of transaction history objects |
| `data.values[].eventId` | integer | Unique identifier for the event |
| `data.values[].marketId` | integer | Profile ID of the market |
| `data.values[].actorAddress` | string | Ethereum address of the actor performing the transaction |
| `data.values[].type` | string | Transaction type (BUY or SELL) |
| `data.values[].voteType` | string | Type of vote (trust or distrust) |
| `data.values[].votes` | integer | Number of votes involved in the transaction |
| `data.values[].funds` | string | Transaction amount in wei |
| `data.values[].txHash` | string | Transaction hash |
| `data.values[].timestamp` | integer | Timestamp of the transaction (Unix timestamp) |
| `data.total` | integer | Total number of transactions available |
| `data.limit` | integer | Maximum number of transactions returned in this response |
| `data.offset` | integer | Number of transactions skipped (for pagination) |

#### Error Response

**Code**: 404 Not Found (Example: Market not found)

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Market not found"
  }
}
```

### Example

#### Request

```bash
http GET https://api.ethos.network/api/v1/markets/1/tx/history
```

### Notes

- This endpoint is useful for fetching transaction history data for a specific market when its profile ID is known.
- If the requested `profileId` does not correspond to an existing market, the request will fail with a 404 error.
- The transaction history data is sorted by timestamp in descending order.
- Pagination parameters (`limit`, `offset`) can be added as query parameters (e.g., `?limit=10&offset=20`). The default limit is likely 50, offset 0.
- A `voteTypeFilter` query parameter can be used to filter by 'trust' or 'distrust'.

---

## Get Market Holders

```
GET /api/v1/markets/:profileId/holders
```

**Description**: Retrieves the holders for a specific market based on its associated profile ID.

**Authentication Required**: No

### Parameters

#### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `profileId` | integer | Yes | Profile ID of the market to retrieve holders for. |

### Responses

#### Success Response

**Code**: 200 OK

Returns an array of holder objects, each containing the Ethereum address and balance in wei.
Returns an object containing an array of holder objects, detailing their address, vote type, and total votes/shares.

```json
{
  "ok": true,
  "data": [
    {
      "address": "0x9E2218375567BB466b81E38E1a8b599b6250408C",
      "balanceWei": "10000000000000000000"
    },
    {
      "address": "0x1234567890abcdef1234567890abcdef12345678",
      "balanceWei": "5000000000000000000"
    },
    // ... more holder objects
  ]
  "data": {
    "all": [
      {
        "actorAddress": "0xa537a180163E08d7F4F4eE12878B14DA63726dF7",
        "isPositive": true,
        "total_amount": "213n",
        "marketId": 8,
        "voteType": "trust",
        "total": "213n"
      },
      {
        "actorAddress": "0x392dB93ac086264DD466cAB5a41E167529C0C73e",
        "isPositive": true,
        "total_amount": "189n",
        "marketId": 8,
        "voteType": "trust",
        "total": "189n"
      }
      // ... more holder objects
    ]
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | array | Array of holder objects |
| `data[].address` | string | Ethereum address of the holder |
| `data[].balanceWei` | string | Balance of the holder in wei |
| `data` | object | Response data container |
| `data.all` | array | Array of holder objects |
| `data.all[].actorAddress` | string | Ethereum address of the holder |
| `data.all[].isPositive` | boolean | Whether the holder's position is based on trust (true) or distrust (false) votes |
| `data.all[].total_amount` | string | Total amount of votes/shares held (BigInt string format) |
| `data.all[].marketId` | integer | Profile ID of the market |
| `data.all[].voteType` | string | Type of vote (trust or distrust) |
| `data.all[].total` | string | Total amount of votes/shares held (BigInt string format, possibly redundant) |

#### Error Response

**Code**: 404 Not Found (Example: Market not found)

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Market not found"
  }
}
```

### Example

#### Request

```bash
http GET https://api.ethos.network/api/v1/markets/1/holders
```

### Notes

- This endpoint is useful for fetching holder data for a specific market when its profile ID is known.
- If the requested `profileId` does not correspond to an existing market, the request will fail with a 404 error.
- The holder data is sorted by balance in descending order.
- The holder data appears to be sorted by the total amount held, in descending order.
- The `total_amount` and `total` fields use a string representation ending in 'n', indicating BigInt values.

---

## Get Market Activity by Address

```
GET /api/v1/markets/activity/:address
```

**Description**: Retrieves the market activity for a specific Ethereum address.

**Authentication Required**: No

### Parameters

#### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address` | string | Yes | Ethereum address to retrieve market activity for. |

### Responses

#### Success Response

**Code**: 200 OK

Returns an array of market activity objects, each containing the market profile ID, transaction hash, timestamp, type, and amount.
Returns a paginated list of market activity (transaction) objects for the specified address.

```json
{
  "ok": true,
  "data": [
    {
      "marketProfileId": 1,
      "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "timestamp": "2025-03-30T10:00:00.000Z",
      "type": "BUY",
      "amountWei": "1000000000000000000"
    },
    {
      "marketProfileId": 8,
      "txHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      "timestamp": "2025-03-29T14:30:00.000Z",
      "type": "SELL",
      "amountWei": "500000000000000000"
    },
    // ... more market activity objects
  ]
  "data": {
    "values": [
      {
        "eventId": 123456,
        "marketId": 1,
        "actorAddress": "0x9E2218375567BB466b81E38E1a8b599b6250408C",
        "type": "BUY",
        "voteType": "trust",
        "votes": 10,
        "funds": "1000000000000000000",
        "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        "timestamp": 1743300000
      },
      {
        "eventId": 123457,
        "marketId": 8,
        "actorAddress": "0x9E2218375567BB466b81E38E1a8b599b6250408C",
        "type": "SELL",
        "voteType": "distrust",
        "votes": 5,
        "funds": "500000000000000000",
        "txHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        "timestamp": 1743200000
      }
      // ... more transaction objects for this address
    ],
    "total": 100,
    "limit": 50,
    "offset": 0
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | array | Array of market activity objects |
| `data[].marketProfileId` | integer | Profile ID of the market |
| `data[].txHash` | string | Transaction hash |
| `data[].timestamp` | string | Timestamp of the transaction (ISO 8601 format) |
| `data[].type` | string | Transaction type (BUY or SELL) |
| `data[].amountWei` | string | Transaction amount in wei |
| `data` | object | Paginated response object |
| `data.values` | array | Array of transaction history objects |
| `data.values[].eventId` | integer | Unique identifier for the event |
| `data.values[].marketId` | integer | Profile ID of the market involved in the transaction |
| `data.values[].actorAddress` | string | Ethereum address of the actor (matches the path parameter) |
| `data.values[].type` | string | Transaction type (BUY or SELL) |
| `data.values[].voteType` | string | Type of vote (trust or distrust) |
| `data.values[].votes` | integer | Number of votes involved in the transaction |
| `data.values[].funds` | string | Transaction amount in wei |
| `data.values[].txHash` | string | Transaction hash |
| `data.values[].timestamp` | integer | Timestamp of the transaction (Unix timestamp) |
| `data.total` | integer | Total number of transactions available for this address |
| `data.limit` | integer | Maximum number of transactions returned in this response |
| `data.offset` | integer | Number of transactions skipped (for pagination) |

#### Error Response

**Code**: 400 Bad Request (Example: Invalid address)

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation error",
    "fields": [
      {
        "code": "invalid_address",
        "message": "Invalid Ethereum address",
        "path": ["address"]
      }
    ]
  }
}
```

### Example

#### Request

```bash
http GET https://api.ethos.network/api/v1/markets/activity/0x9E2218375567BB466b81E38E1a8b599b6250408C
```

### Notes

- This endpoint is useful for fetching market activity data for a specific Ethereum address.
- If the requested `address` is not a valid Ethereum address, the request will fail with a 400 error.
- The market activity data is sorted by timestamp in descending order.
- Pagination parameters (`limit`, `offset`) can be added as query parameters (e.g., `?limit=10&offset=20`). The default limit is likely 50, offset 0.
- A `voteTypeFilter` query parameter can likely be used to filter by 'trust' or 'distrust' (similar to the market tx history endpoint).

---

## Get Market Holdings by Address

```
GET /api/v1/markets/holdings/:address
```

**Description**: Retrieves the market holdings for a specific Ethereum address.

**Authentication Required**: No

### Parameters

#### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address` | string | Yes | Ethereum address to retrieve market holdings for. |

### Responses

#### Success Response

**Code**: 200 OK

Returns an array of market holding objects, each containing the market profile ID, balance in wei, and market information.

```json
{
  "ok": true,
  "data": [
    {
      "marketProfileId": 1,
      "balanceWei": "10000000000000000000",
      "market": {
        "marketProfileId": 1,
        "creatorAddress": "0x9E2218375567BB466b81E38E1a8b599b6250408C",
        "positivePrice": "13394648448485010",
        "negativePrice": "6605351551514990",
        "trustVotes": 1717,
        "distrustVotes": 16,
        "createdAt": "2024-09-14T00:00:00.000Z",
        "updatedAt": "2025-03-30T04:35:04.439Z",
        "basePrice": "10000000000000000",
        "creationCost": "100000000000000000",
        "liquidity": "1000",
        "configType": "NORMAL",
        "profile": {
          "primaryAddress": "0x9E2218375567BB466b81E38E1a8b599b6250408C",
          "avatarUrl": "https://pbs.twimg.com/profile_images/1797826077194096640/d_YEoB8n.jpg",
          "ethosScore": 1711,
          "name": "Ethos",
          "twitterUsername": "ethos_network"
        },
        "stats": {
          "marketCapWei": "7836838875288201409",
          "volumeTotalWei": "11279993864858341235",
          "volume24hWei": "10606200508522432",
          "priceChange24hPercent": 0
        }
      }
    },
    {
      "marketProfileId": 8,
      "balanceWei": "5000000000000000000",
      "market": {
        // ... market information for market profile ID 8
      }
    },
    // ... more market holding objects
  ]
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | array | Array of market holding objects |
| `data[].marketProfileId` | integer | Profile ID of the market |
| `data[].balanceWei` | string | Balance of the holder in wei |
| `data[].market` | object | Market information |

#### Error Response

**Code**: 400 Bad Request (Example: Invalid address)

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation error",
    "fields": [
      {
        "code": "invalid_address",
        "message": "Invalid Ethereum address",
        "path": ["address"]
      }
    ]
  }
}
```

### Example

#### Request

```bash
http GET https://api.ethos.network/api/v1/markets/holdings/0x9E2218375567BB466b81E38E1a8b599b6250408C
```

### Notes

- This endpoint is useful for fetching market holding data for a specific Ethereum address.
- If the requested `address` is not a valid Ethereum address, the request will fail with a 400 error.
- The market holding data is sorted by balance in descending order.

---

## Get Holdings Total by Address

```
GET /api/v1/markets/holdings/:address/total
```

**Description**: Retrieves the total value of all market holdings for a specific user address.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name      | Type   | Required | Description                |
|-----------|--------|----------|----------------------------|
| `address` | string | Yes      | The user's wallet address. |

##### Query Parameters

None

##### Request Body

None

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "totalValue": "string" // BigInt as string ending in 'n'
  }
}
```

| Property           | Type    | Description                                                                 |
|--------------------|---------|-----------------------------------------------------------------------------|
| `ok`               | boolean | Indicates if the request was successful.                                    |
| `data`             | object  | Container for the response data.                                            |
| `data.totalValue`  | string  | The current total value (in wei, as string ending in 'n') of all holdings. |

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "error": "Invalid address format",
  "code": "VALIDATION_ERROR" // Or similar
}
```

**Code**: 404 Not Found (Potentially, if address not found, though might return 0)

```json
{
  "error": "User address not found",
  "code": "NOT_FOUND" // Or similar
}
```

#### Example

##### Request

```bash
# Needs a sample address
http GET https://api.ethos.network/api/v1/markets/holdings/0x9E2218375567BB466b81E38E1a8b599b6250408C/total
```

##### Response

```json
{
  "ok": true,
  "data": {
    "totalValue": "0n"
  }
}
```

#### Notes

- Authentication is not required.
- BigInt value is returned as a string ending in 'n'.
- If the address has no holdings, the value returned is "0n".

---

### Get Holdings by Address

```
GET /api/v1/markets/holdings/:address
```

**Description**: Retrieves the market holdings summary and details for a specific user address.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name      | Type   | Required | Description                |
|-----------|--------|----------|----------------------------|
| `address` | string | Yes      | The user's wallet address. |

##### Query Parameters

| Name     | Type    | Required | Description                                       |
|----------|---------|----------|---------------------------------------------------|
| `limit`  | integer | No       | Maximum number of holdings to return (default: ?) |
| `offset` | integer | No       | Number of holdings to skip (for pagination)       |

##### Request Body

None

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "summary": {
      "boughtTotal": "string", // BigInt as string ending in 'n'
      "soldTotal": "string", // BigInt as string ending in 'n'
      "holdingTotal": "string" // BigInt as string ending in 'n'
    },
    "holdings": [
      {
        "marketProfileId": number,
        "voteType": "trust | distrust",
        "currentHoldingVotes": number,
        "currentHoldingValue": "string", // BigInt as string ending in 'n'
        "boughtTotal": "string", // BigInt as string ending in 'n'
        "soldTotal": "string" // BigInt as string ending in 'n'
      }
      // ... more holding objects
    ]
  }
}
```

| Property                      | Type                   | Description                                                                               |
|-------------------------------|------------------------|-------------------------------------------------------------------------------------------|
| `ok`                          | boolean                | Indicates if the request was successful.                                                   |
| `data`                        | object                 | Container for the response data.                                                          |
| `summary`                     | object                 | Summary statistics for the user's holdings across all markets.                              |
| `summary.boughtTotal`         | string                 | Total value (in wei, as string ending in 'n') of all buys made by the user.               |
| `summary.soldTotal`           | string                 | Total value (in wei, as string ending in 'n') of all sells made by the user.              |
| `summary.holdingTotal`        | string                 | Current total value (in wei, as string ending in 'n') of all holdings for the user.       |
| `holdings`                    | Array<object>          | An array of objects, each representing a holding in a specific market profile.            |
| `holdings[].marketProfileId`  | number                 | The ID of the market profile being held.                                                  |
| `holdings[].voteType`         | string                 | The type of holding ('trust' or 'distrust').                                              |
| `holdings[].currentHoldingVotes`| number               | The number of votes/shares currently held.                                                 |
| `holdings[].currentHoldingValue`| string               | The current value (in wei, as string ending in 'n') of this specific holding.             |
| `holdings[].boughtTotal`      | string                 | Total value (in wei, as string ending in 'n') bought by the user in this market/vote type. |
| `holdings[].soldTotal`        | string                 | Total value (in wei, as string ending in 'n') sold by the user in this market/vote type.   |

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "error": "Invalid address format or invalid pagination parameters",
  "code": "VALIDATION_ERROR" // Or similar
}
```

**Code**: 404 Not Found (Potentially, if address has no holdings, though might return empty array)

```json
{
  "error": "User not found or has no holdings",
  "code": "NOT_FOUND" // Or similar
}
```

#### Example

##### Request

```bash
# Needs a sample address & pagination if desired
http GET https://api.ethos.network/api/v1/markets/holdings/0x9E2218375567BB466b81E38E1a8b599b6250408C limit==10
```

##### Response

```json
# Needs actual example response
{
  "ok": true,
  "data": {
    "summary": {
      "boughtTotal": "0n",
      "soldTotal": "0n",
      "holdingTotal": "0n"
    },
    "holdings": []
  }
}
```

#### Notes

- Authentication is not required.
- Need to confirm default `limit`.
- BigInt values are returned as strings ending in 'n'.
- If the address has no holdings, the `holdings` array will be empty.

---

### Get Holdings Total by Address

```
GET /api/v1/markets/holdings/:address/total
```

**Description**: Retrieves the total market holdings for a specific Ethereum address.

**Authentication Required**: No

### Parameters

#### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address` | string | Yes | Ethereum address to retrieve total market holdings for. |

### Responses

#### Success Response

**Code**: 200 OK

Returns an object containing the total market holdings in wei.

```json
{
  "ok": true,
  "data": {
    "totalHoldingsWei": "15000000000000000000"
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | Object containing the total market holdings |
| `data.totalHoldingsWei` | string | Total market holdings in wei |

#### Error Response

**Code**: 400 Bad Request (Example: Invalid address)

```

### Get Market Profit Leaderboard

```
GET /api/v1/markets/leaderboard/profit
```

**Description**: Retrieves a leaderboard of users ranked by their profit in the markets.

**Authentication Required**: No

#### Parameters

##### Query Parameters

```typescript
{
  limit?: number;  // Optional: Max results (default 50, max 100)
}
```

| Parameter | Type   | Required | Default | Description                              |
|-----------|--------|----------|---------|------------------------------------------|
| `limit`   | number | No       | 50      | Maximum number of users to return (max 100). |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": [
    {
      "profit": "string", // Total profit as a string (wei)
      "address": "string" // User's Ethereum address
    }
    // ... ranked users up to the limit
  ]
}
```

*Note: This endpoint returns a simple array, not a paginated object.* 

##### Error Responses

**Code**: 400 Bad Request (Example: Invalid limit)

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid limit parameter"
    // details may contain Zod error info
  }
}
```

#### Example

##### Request

```bash
# Get the top 10 users by profit
http GET https://api.ethos.network/api/v1/markets/leaderboard/profit limit==10
```

##### Response

```json
# Example Response
{
  "ok": true,
  "data": [
    {
      "profit": "12345678901234567890",
      "address": "0xUserAddress1..."
    },
    {
      "profit": "11000000000000000000",
      "address": "0xUserAddress2..."
    }
    // ... top users up to limit
  ]
}
```

#### Notes

- Retrieves a profit-based leaderboard for market participants, ranked highest profit first.
- Only the `limit` query parameter is supported (max 100).
- Returns a simple array containing `profit` (string) and `address`.