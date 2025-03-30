# Exchange Rates

## Endpoints

```
GET /api/v1/exchange-rates/eth-price
```

## Get ETH Price in USD

```
GET /api/v1/exchange-rates/eth-price
```

**Description**: Retrieves the current Ethereum price in USD.

**Authentication Required**: No

### Parameters

None

### Responses

#### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "price": 1841.04
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | Price data |
| `data.price` | number | Current ETH price in USD |

#### Error Response

**Code**: 500 Internal Server Error

```json
{
  "ok": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Failed to fetch ETH price"
  }
}
```

### Example

#### Request

```bash
http GET https://api.ethos.network/api/v1/exchange-rates/eth-price
```

### Notes

- This endpoint provides the current ETH price in USD.
- The price is cached for 10 minutes to prevent excessive API calls to the underlying data provider.
- The data is sourced from the CryptoCompare API.
- If the external price service is unavailable, the endpoint will return the last cached price if available.
