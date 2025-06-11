# Search

## Overview

The Search API allows you to search for users, addresses, and service accounts in the Ethos network. It provides a unified search experience that returns results from different sources including profiles, Twitter accounts, and ENS names.

## Endpoints

### Search

```
GET /api/v1/search
```

**Description**: Searches for users in the Ethos network based on a query string. The search looks across profile names, usernames, Ethereum addresses, ENS names, and Twitter handles.

**Authentication Required**: No

#### Parameters

**Query Parameters**

| Name     | Type   | Required | Description                                       |
| -------- | ------ | -------- | ------------------------------------------------- |
| `query`  | string | Yes      | Search query (2-100 characters)                   |
| `limit`  | number | No       | Maximum number of results to return (default: 10) |
| `offset` | number | No       | Offset for pagination (default: 0)                |

#### Responses

**Success Response**

**Code**: 200 OK

```json
{
  "ok": true,
  "data": {
    "values": [
      {
        "userkey": "profileId:123",
        "avatar": "https://example.com/avatar.jpg",
        "name": "Vitalik Buterin",
        "username": "vitalik",
        "description": "Ethereum co-founder",
        "score": 95,
        "scoreXpMultiplier": 1,
        "profileId": 123,
        "primaryAddress": "0x1234567890123456789012345678901234567890"
      },
      {
        "userkey": "service:x.com:456789",
        "avatar": "https://pbs.twimg.com/profile_images/1234567890/image.jpg",
        "name": "Vitalik.eth",
        "username": "vitalikbuterin",
        "description": "Ethereum co-founder | vitalik.eth",
        "score": 95,
        "scoreXpMultiplier": 1,
        "profileId": 124,
        "primaryAddress": "0x9876543210987654321098765432109876543210"
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 2
  }
}
```

| Property                          | Type    | Description                                     |
| --------------------------------- | ------- | ----------------------------------------------- |
| `ok`                              | boolean | Success status                                  |
| `data`                            | object  | Response data container                         |
| `data.values`                     | array   | Array of actor objects matching the search      |
| `data.values[].userkey`           | string  | Userkey that uniquely identifies this actor     |
| `data.values[].avatar`            | string  | URL to the actor's avatar                       |
| `data.values[].name`              | string  | Actor's display name                            |
| `data.values[].username`          | string  | Actor's username                                |
| `data.values[].description`       | string  | Actor's description or bio                      |
| `data.values[].score`             | number  | Actor's credibility score                       |
| `data.values[].scoreXpMultiplier` | number  | Actor's XP multiplier based on score            |
| `data.values[].profileId`         | number  | Actor's profile ID (if available)               |
| `data.values[].primaryAddress`    | string  | Actor's primary Ethereum address (if available) |
| `data.limit`                      | number  | Number of results returned                      |
| `data.offset`                     | number  | Current pagination offset                       |
| `data.total`                      | number  | Total number of results matching the query      |

#### Example

**Request**

```bash
http GET "https://api.ethos.network/api/v1/search?query=vitalik&limit=10&offset=0"
```

#### Notes

* The search results are sorted by multiple criteria in a cascading priority:
  1. Profiles are ranked higher than non-profiles
  2. Usernames exactly matching the query are prioritized
  3. Real names exactly matching the query are prioritized
  4. Results with usernames are ranked higher than those without
  5. Results with real names are ranked higher than those without
  6. Results with addresses are ranked higher than those without
  7. Finally, results are sorted by credibility score
* The search is case-insensitive and will match partial strings.
* If no results are found but the query is a valid Ethereum address or ENS name, the API will attempt to look it up and return information about that address.
* Duplicate results (same user found through different search methods) are deduplicated.
