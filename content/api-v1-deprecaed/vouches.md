# Vouches

## Overview

The Vouches API allows you to query and analyze vouches in the Ethos network. Vouches represent a stake of Ethereum that one user places on another, indicating trust and confidence in that user. The API provides endpoints for retrieving vouches, getting vouch statistics, counting vouches, and more.

## Endpoints

### Query Vouches

```
POST /api/v1/vouches
```

**Description**: Retrieves vouches based on various filters such as IDs, author profile IDs, subject profile IDs, and more.

**Authentication Required**: No

#### Parameters

**Request Body**

```json
{
  "ids": [1, 2, 3],
  "authorProfileIds": [123, 456],
  "subjectProfileIds": [789, 101],
  "subjectAddresses": ["0x1234...", "0x5678..."],
  "subjectAttestationHashes": ["0xabcd...", "0xef01..."],
  "archived": false,
  "duration": "90d",
  "orderBy": {
    "vouchedAt": "desc"
  },
  "limit": 10,
  "offset": 0
}
```

| Property                                                        | Type             | Required | Description                                                       |
| --------------------------------------------------------------- | ---------------- | -------- | ----------------------------------------------------------------- |
| `ids`                                                           | array of numbers | No       | Array of vouch IDs                                                |
| `authorProfileIds`                                              | array of numbers | No       | Array of profile IDs of vouch authors                             |
| `subjectProfileIds`                                             | array of numbers | No       | Array of profile IDs of vouch subjects                            |
| `subjectAddresses`                                              | array of strings | No       | Array of Ethereum addresses of vouch subjects                     |
| `subjectAttestationHashes`                                      | array of strings | No       | Array of attestation hashes of vouch subjects                     |
| `archived`                                                      | boolean          | No       | Whether to include archived vouches                               |
| `duration`                                                      | string           | No       | Return vouches after this duration (e.g., "90d" for last 90 days) |
| `orderBy`                                                       | object           | No       | Sorting options                                                   |
| `orderBy.balance` or `orderBy.vouchedAt` or `orderBy.updatedAt` | string           | No       | Sort by field: "asc" or "desc"                                    |
| `limit`                                                         | number           | No       | Number of results to return (default: 10, maximum 100)            |
| `offset`                                                        | number           | No       | Offset for pagination (default: 0)                                |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "id": 1,
        "authorProfileId": 123,
        "subjectProfileId": 789,
        "subjectAddress": "0x1234567890123456789012345678901234567890",
        "attestationHash": null,
        "staked": "2000000000000000000", // 2 ETH in wei
        "balance": "2000000000000000000",
        "vouchedAt": 1735689600,
        "updatedAt": 1735689600,
        "archivedAt": null,
        "archived": false,
        "mutualId": 2,
        "events": [
          {
            "id": 123,
            "txHash": "0x1234567890123456789012345678901234567890123456789012345678901234",
            "blockNumber": 12345678,
            "createdAt": 1735689500,
            "updatedAt": 1735689500
          }
        ],
        "attestationDetails": null
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 1
  }
}
```

| Property                           | Type    | Description                                                   |
| ---------------------------------- | ------- | ------------------------------------------------------------- |
| `ok`                               | boolean | Success status                                                |
| `data`                             | object  | Response data container                                       |
| `data.values`                      | array   | Array of vouch objects                                        |
| `data.values[].id`                 | number  | Vouch ID                                                      |
| `data.values[].authorProfileId`    | number  | Profile ID of the author                                      |
| `data.values[].subjectProfileId`   | number  | Profile ID of the subject (if applicable)                     |
| `data.values[].subjectAddress`     | string  | Ethereum address of the subject (if applicable)               |
| `data.values[].attestationHash`    | string  | Attestation hash of the subject (if applicable)               |
| `data.values[].staked`             | string  | Amount of ETH staked in wei                                   |
| `data.values[].balance`            | string  | Current balance of the vouch in wei                           |
| `data.values[].vouchedAt`          | number  | Unix timestamp of when the vouch was created                  |
| `data.values[].updatedAt`          | number  | Unix timestamp of when the vouch was last updated             |
| `data.values[].archivedAt`         | number  | Unix timestamp of when the vouch was archived (if applicable) |
| `data.values[].archived`           | boolean | Whether the vouch is archived                                 |
| `data.values[].mutualId`           | number  | ID of the mutual vouch (if applicable)                        |
| `data.values[].events`             | array   | Blockchain events associated with the vouch                   |
| `data.values[].attestationDetails` | object  | Details about the attestation (if applicable)                 |
| `data.limit`                       | number  | Number of results returned                                    |
| `data.offset`                      | number  | Current pagination offset                                     |
| `data.total`                       | number  | Total number of results matching the query                    |

#### Example

**Request**

```bash
http POST https://api.ethos.network/api/v1/vouches \
  subjectProfileIds:='[789]' \
  limit:=10 \
  offset:=0
```

#### Notes

* By default, results are sorted by vouch date in descending order (newest first).
* The API enforces a maximum of 100 vouches that can be requested at once.
* If a vouch references an attestation hash that corresponds to a Twitter account, the `attestationDetails` field will be populated.

***

### Get Vouched Ethereum

```
POST /api/v1/vouches/vouched-ethereum
```

**Description**: Calculates the total amount of Ethereum vouched for a specific target.

**Authentication Required**: No

#### Parameters

**Request Body**

```json
{
  "target": "profileId:123"
}
```

| Property | Type   | Required | Description                                                                    |
| -------- | ------ | -------- | ------------------------------------------------------------------------------ |
| `target` | string | Yes      | Userkey of the target (profileId, address, or service:x.com:username:username) |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "vouchedEth": 5.0
  }
}
```

| Property          | Type    | Description                                |
| ----------------- | ------- | ------------------------------------------ |
| `ok`              | boolean | Success status                             |
| `data`            | object  | Response data                              |
| `data.vouchedEth` | number  | Total amount of ETH vouched for the target |

#### Example

**Request**

```bash
http POST https://api.ethos.network/api/v1/vouches/vouched-ethereum \
  target="profileId:123"
```

#### Notes

* This endpoint calculates the total amount of ETH currently vouched for the target.

***

### Get Most Credible Vouchers

```
POST /api/v1/vouches/most-credible-vouchers
```

**Description**: Retrieves the most credible users who have vouched for a specific target.

**Authentication Required**: No

#### Parameters

**Request Body**

```json
{
  "userkey": "profileId:123",
  "limit": 4
}
```

| Property  | Type   | Required | Description                                                |
| --------- | ------ | -------- | ---------------------------------------------------------- |
| `userkey` | string | Yes      | Userkey of the target to find vouchers for                 |
| `limit`   | number | No       | Maximum number of vouchers to return (default: 4, max: 50) |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": [
    {
      "authorProfileId": 456,
      "vouchId": 1,
      "score": 90
    },
    {
      "authorProfileId": 789,
      "vouchId": 2,
      "score": 85
    }
  ]
}
```

| Property                 | Type    | Description                           |
| ------------------------ | ------- | ------------------------------------- |
| `ok`                     | boolean | Success status                        |
| `data`                   | array   | Array of credible voucher information |
| `data[].authorProfileId` | number  | Profile ID of the voucher             |
| `data[].vouchId`         | number  | ID of the vouch                       |
| `data[].score`           | number  | Credibility score of the voucher      |

#### Example

**Request**

```bash
http POST https://api.ethos.network/api/v1/vouches/most-credible-vouchers \
  userkey="profileId:123" \
  limit:=5
```

#### Notes

* The vouchers are sorted by their credibility score in descending order.
* Only active (non-archived) vouches are considered.

***

### Get Mutual Vouchers

```
GET /api/v1/vouches/mutual-vouchers
```

**Description**: Retrieves a list of users who have mutual vouches with the specified target.

**Authentication Required**: No

#### Parameters

**Query Parameters**

| Name      | Type   | Required | Description                                       |
| --------- | ------ | -------- | ------------------------------------------------- |
| `userkey` | string | Yes      | Userkey of the target to find mutual vouchers for |
| `limit`   | number | No       | Maximum number of results to return (default: 10) |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": [
    {
      "profileId": 456,
      "outgoingVouchId": 1,
      "incomingVouchId": 2,
      "vouchedEth": 1.5
    },
    {
      "profileId": 789,
      "outgoingVouchId": 3,
      "incomingVouchId": 4,
      "vouchedEth": 1.0
    }
  ]
}
```

| Property                 | Type    | Description                                       |
| ------------------------ | ------- | ------------------------------------------------- |
| `ok`                     | boolean | Success status                                    |
| `data`                   | array   | Array of mutual voucher information               |
| `data[].profileId`       | number  | Profile ID of the mutual voucher                  |
| `data[].outgoingVouchId` | number  | ID of the outgoing vouch (from target to voucher) |
| `data[].incomingVouchId` | number  | ID of the incoming vouch (from voucher to target) |
| `data[].vouchedEth`      | number  | Amount of ETH in the mutual vouch                 |

#### Example

**Request**

```bash
http GET https://api.ethos.network/api/v1/vouches/mutual-vouchers?userkey=profileId:123&limit=5
```

#### Notes

* Mutual vouches are pairs of vouches where two users have vouched for each other.
* Only active (non-archived) vouches are considered.

***

### Get Vouch Rewards

```
POST /api/v1/vouches/rewards
```

**Description**: Calculates the rewards earned from vouches for a specific target.

**Authentication Required**: No

#### Parameters

**Request Body**

```json
{
  "target": "profileId:123"
}
```

| Property | Type   | Required | Description                                    |
| -------- | ------ | -------- | ---------------------------------------------- |
| `target` | string | Yes      | Userkey of the target to calculate rewards for |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "earned": 0.05,
    "potentialEarnings": 0.08,
    "totalStaked": 5.0
  }
}
```

| Property                 | Type    | Description                                |
| ------------------------ | ------- | ------------------------------------------ |
| `ok`                     | boolean | Success status                             |
| `data`                   | object  | Vouch rewards data                         |
| `data.earned`            | number  | Total ETH earned from vouches              |
| `data.potentialEarnings` | number  | Potential additional earnings from vouches |
| `data.totalStaked`       | number  | Total ETH staked in vouches                |

#### Example

**Request**

```bash
http POST https://api.ethos.network/api/v1/vouches/rewards \
  target="profileId:123"
```

#### Notes

* Rewards are earned based on the protocol's reward distribution mechanism.
* Potential earnings represent the additional rewards that could be earned in the future from existing vouches.
