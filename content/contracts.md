# Contracts API

## Overview

The Contracts API provides information about the deployed addresses of core Ethos smart contracts on the blockchain.

## Endpoints

### Get Smart Contract Addresses

```
GET /api/v1/contracts
```

**Description**: Retrieves addresses of Ethos smart contracts deployed on the blockchain.

**Authentication Required**: No

### Parameters

#### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `targetContracts` | string | Yes | Must be set to "all" to retrieve all contracts |

### Responses

#### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": [
    {
      "name": "attestation",
      "configAddress": "0x27499D9A439D1c7B4538f247625cc7aA159D3c14",
      "managedAddress": "0x27499D9A439D1c7B4538f247625cc7aA159D3c14",
      "isProxy": true
    },
    {
      "name": "contractAddressManager",
      "configAddress": "0xC31252d6bE0252018F1b12deF25f6582dB0f3E9a",
      "managedAddress": "0xC31252d6bE0252018F1b12deF25f6582dB0f3E9a",
      "isProxy": false
    },
    // Additional contracts...
  ]
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | array | Array of contract objects |
| `data[].name` | string | Name of the smart contract |
| `data[].configAddress` | string | Configured Ethereum address of the contract |
| `data[].managedAddress` | string | Address managed by the contract address manager |
| `data[].isProxy` | boolean | Whether the contract uses a proxy pattern |

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
        "code": "invalid_union",
        "message": "Invalid input",
        "path": ["targetContracts"],
        "unionErrors": [
          {
            "issues": [
              {
                "code": "invalid_literal",
                "expected": "all",
                "message": "Invalid literal value, expected \"all\"",
                "path": ["targetContracts"]
              }
            ],
            "name": "ZodError"
          }
        ]
      }
    ]
  }
}
```

### Example

#### Request

```bash
http GET "https://api.ethos.network/api/v1/contracts?targetContracts=all"
```

### Notes

- The API currently only supports retrieving all contracts with `targetContracts=all`.
- The implementation suggests support for specifying an array of specific contracts, but this doesn't appear to work in the current version.
- The returned contracts include core Ethos functionality such as Profile, Attestation, Review, Vote, and Vouch contracts.
- Use these addresses to directly interact with Ethos smart contracts via Web3 libraries or blockchain explorers.
