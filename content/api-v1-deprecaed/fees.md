# Fees API

## Overview

The Fees API provides information about the current transaction fee structure within the Ethos network.

## Endpoints

### Get Fee Information

```
GET /api/v1/fees
```

**Description**: Retrieves the current fee structure for Ethos transactions, such as vouches. Fees are expressed in basis points, where 100 basis points equals 1%.

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
    "entryProtocolFeeBasisPoints": "100n",
    "entryDonationFeeBasisPoints": "100n",
    "entryVouchersPoolFeeBasisPoints": "400n",
    "exitFeeBasisPoints": "100n"
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | Fee structure data |
| `data.entryProtocolFeeBasisPoints` | string | Protocol fee applied when entering a vouch transaction (in basis points) |
| `data.entryDonationFeeBasisPoints` | string | Donation fee applied when entering a vouch transaction (in basis points) |
| `data.entryVouchersPoolFeeBasisPoints` | string | Vouchers pool fee applied when entering a vouch transaction (in basis points) |
| `data.exitFeeBasisPoints` | string | Fee applied when exiting a vouch transaction (in basis points) |

#### Error Response

**Code**: 500 Internal Server Error

```json
{
  "ok": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Internal server error"
  }
}
```

### Example

#### Request

```bash
http GET https://api.ethos.network/api/v1/fees
```

### Notes

- Fee values are returned as strings with an 'n' suffix (e.g., "100n") to represent BigInt values.
- Fee values are specified in basis points, where 100 basis points equals 1%.
- The total fee for entry transactions is the sum of `entryProtocolFeeBasisPoints`, `entryDonationFeeBasisPoints`, and `entryVouchersPoolFeeBasisPoints`.
- These fees are primarily used when calculating transaction costs for vouches and other Ethos blockchain interactions.
- Fee values are cached for 12 hours to reduce calls to the blockchain.
