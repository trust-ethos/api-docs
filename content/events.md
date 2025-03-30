# Events

## Endpoints

### Process Specific Transaction Events

```
GET /api/v1/events/process
```

**Description**: Processes the blockchain events associated with a specific transaction hash and returns the processing status and related data.

**Authentication Required**: Yes (Needs confirmation of exact requirements)

#### Parameters

##### Query Parameters

| Name     | Type   | Required | Description                       |
|----------|--------|----------|-----------------------------------|
| `txHash` | string | Yes      | The transaction hash to process. |

##### Path Parameters

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
    "success": boolean,
    "transaction": { /* Viem TransactionReceipt object */ },
    "event": { /* Prisma BlockchainEvent object */ }
  }
}
```

| Property                | Type    | Description                                                                          |
|-------------------------|---------|--------------------------------------------------------------------------------------|
| `ok`                    | boolean | Indicates if the API call itself was successful.                                     |
| `data`                  | object  | Container for the response data.                                                     |
| `data.success`          | boolean | Indicates if the event processing for the given `txHash` was successful.           |
| `data.transaction`      | object  | The transaction receipt object (from Viem's `getTransactionReceipt`). Null if not found. |
| `data.event`            | object  | The corresponding record from the `BlockchainEvent` table in the database. Null if not found. |

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid transaction hash format"
    // ... potentially other validation fields
  }
}
```

**Code**: 401 Unauthorized

```json
{
  "ok": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

**Code**: 500 Internal Server Error

```json
{
  "ok": false,
  "error": {
    "code": "PROCESSING_ERROR", // Or other specific error codes
    "message": "Failed to process events for transaction"
  }
}
```

#### Example

##### Request

```bash
# Needs authentication token and a valid txHash
# Example txHash (replace with a real one for testing)
TX_HASH="0x1234...abcd"
AUTH_TOKEN="your_auth_token"

http GET https://api.ethos.network/api/v1/events/process txHash==$TX_HASH "Authorization: Bearer $AUTH_TOKEN"
```

##### Response

```json
{
  "ok": true,
  "data": {
    "success": true,
    "transaction": {
      "blockHash": "0x76b595d5a5c0e7025c3c858c1fc1ef4f031eb9d1afd300d64f808b1fa9f99d96",
      "blockNumber": "28257388n",
      "contractAddress": null,
      "cumulativeGasUsed": "6482911n",
      "from": "0x532b2e0752Ec5c145509Ab586Da102a114C79Ac0",
      "gasUsed": "158304n",
      "logs": [/* array of log objects */],
      "logsBloom": "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "status": "success",
      "to": "0x21b7db78940bd8e562e0d01f3ce847cd65e0e8e2",
      "transactionHash": "0x2fd09c99521be6ba1fc4b68d6003fe9c6e5c5981ce333690091bde7d2928b43c",
      "transactionIndex": 29
    },
    "event": {
      "id": 873453,
      "txHash": "0x2fd09c99521be6ba1fc4b68d6003fe9c6e5c5981ce333690091bde7d2928b43c",
      "blockNumber": 28257388,
      "blockIndex": 29,
      "contract": "attestation",
      "logData": "{\"eventName\":\"AttestationCreated\",\"args\":{\"profileId\":6179,\"account\":\"1395154870932541446\",\"service\":\"x.com\"}}",
      "processed": true,
      "jobCreated": true,
      "createdAt": "2023-03-30T10:42:05.000Z",
      "updatedAt": "2023-03-30T10:42:06.000Z"
    }
  }
}
```

#### Notes

- This endpoint allows forcing the processing of events for a specific transaction, bypassing the normal queue.
- Requires authentication (likely internal/admin).
- The `transaction` and `event` fields can be `null` if the transaction or corresponding event record are not found.
- The exact structure of the `transaction` (Viem Receipt) and `event` (Prisma Model) objects should be referenced for full details.
