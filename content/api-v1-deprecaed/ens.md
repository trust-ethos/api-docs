# ENS API

## Overview

The ENS (Ethereum Name Service) API allows you to retrieve ENS details such as addresses, names, and avatars for ENS names or Ethereum addresses. The API provides endpoints for looking up ENS details by name or address.

## Endpoints

### Get ENS Details by Name

```
GET /api/v1/ens-details/by-name/:name
```

**Description**: Retrieves ENS details for a specific ENS name, including the resolved Ethereum address and avatar URL.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | The ENS name to look up (e.g., "vitalik.eth") |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "name": "vitalik.eth",
    "avatar": "https://example.com/avatar.jpg",
    "address": "0x1234567890123456789012345678901234567890"
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | ENS details |
| `data.name` | string | The ENS name (same as input) |
| `data.avatar` | string or null | URL to the ENS avatar (if set) |
| `data.address` | string or null | Ethereum address associated with the ENS name |

##### ENS Name Not Found or Invalid

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "name": null,
    "avatar": null,
    "address": null
  }
}
```

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/ens-details/by-name/vitalik.eth
```

##### Response

```json
{
  "ok": true,
  "data": {
    "name": "vitalik.eth",
    "avatar": "https://storage.googleapis.com/opensea-static/opensea-profile/32.png",
    "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
  }
}
```

#### Notes

- If the ENS name does not exist or does not resolve to an address, all fields in the response will be `null`.
- The API checks a cache before querying the Ethereum network to improve performance.

---

### Get ENS Details by Address

```
GET /api/v1/ens-details/by-address/:address
```

**Description**: Retrieves ENS details for a specific Ethereum address, including the primary ENS name and avatar URL.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address` | string | Yes | The Ethereum address to look up (e.g., "0x1234...") |

#### Responses

##### Success Response

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "name": "vitalik.eth",
    "avatar": "https://example.com/avatar.jpg",
    "address": "0x1234567890123456789012345678901234567890"
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `ok` | boolean | Success status |
| `data` | object | ENS details |
| `data.name` | string or null | The primary ENS name associated with the address (if any) |
| `data.avatar` | string or null | URL to the ENS avatar (if set) |
| `data.address` | string | The Ethereum address (same as input) |

##### No ENS Name Found

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "name": null,
    "avatar": null,
    "address": "0x1234567890123456789012345678901234567890"
  }
}
```

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/ens-details/by-address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
```

##### Response

```json
{
  "ok": true,
  "data": {
    "name": "vitalik.eth",
    "avatar": "https://storage.googleapis.com/opensea-static/opensea-profile/32.png",
    "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
  }
}
```

#### Notes

- If the address does not have a primary ENS name set, the `name` field will be `null`.
- If a name is found but has no avatar set, the `avatar` field will be `null`.
- The API checks a cache before querying the Ethereum network to improve performance.
