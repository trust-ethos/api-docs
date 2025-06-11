# Contributions API

## Overview

The Contributions API provides endpoints for retrieving information about user contribution activities, bundles, and statistics within the Ethos network. These contributions often involve tasks like performing trust checks, reviewing content, or participating in scoring.

## Endpoints

### Get Contribution Bundles by Profile ID and Status

```
GET /api/v1/contributions/:profileId
```

**Description**: Retrieves active contribution bundles for a specific profile ID, filtered by the status of the contributions within them.

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name        | Type    | Required | Description                               |
|-------------|---------|----------|-------------------------------------------|
| `profileId` | integer | Yes      | The unique identifier for the profile. |

##### Query Parameters

| Name     | Type           | Required | Description                                                                    |
|----------|----------------|----------|--------------------------------------------------------------------------------|
| `status` | Array<string>  | Yes      | Array of contribution statuses to filter by (e.g., `PENDING`, `COMPLETED`, `SKIPPED`). |

##### Request Body

None

#### Responses

##### Success Response

**Code**: 200 OK

Returns an array of contribution bundle objects.

```json
[
  {
    "id": 501,
    "contributions": [
      {
        "id": 1001,
        "type": "TRUST_CHECK",
        "status": "PENDING",
        "targetUserkey": "profileId:2157"
      },
      {
        "id": 1002,
        "type": "REVIEW_CHECK",
        "status": "PENDING",
        "targetReviewId": 456
      },
      {
        "id": 1003,
        "type": "SCORE_CHECK",
        "status": "PENDING",
        "targetUserkey": "profileId:3148"
      }
    ]
  },
  {
    "id": 502,
    "contributions": [
      {
        "id": 1004,
        "type": "TRUST_BATTLE",
        "status": "PENDING",
        "targetUserkeys": ["profileId:1245", "profileId:3672"]
      }
    ]
  }
]
```

| Property              | Type          | Description                                                                                                |
|-----------------------|---------------|------------------------------------------------------------------------------------------------------------|
| `[].id`               | number        | The ID of the contribution bundle.                                                                         |
| `[].contributions`    | Array<object> | An array of contribution objects within the bundle that match the specified status filter.                   |
| `[].contributions[].id` | number        | The ID of the individual contribution.                                                                     |
| `[].contributions[].type` | string        | The type of the contribution (e.g., `REVIEW`, `TRUST_BATTLE`).                                            |
| `[].contributions[].status`| string        | The status of the contribution (`PENDING`, `COMPLETED`, `SKIPPED`).                                       |

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "error": "Invalid profile ID format or missing/invalid status parameter",
  "code": "VALIDATION_ERROR"
}
```

**Code**: 404 Not Found

```json
{
  "error": "Profile not found", // Or potentially empty array if profile exists but no matching bundles
  "code": "NOT_FOUND"
}
```

#### Example

##### Request

```bash
# Needs a sample profile ID
# Fetch PENDING contributions for profile 123
http GET https://api.ethos.network/api/v1/contributions/123 status==PENDING

# Fetch COMPLETED and SKIPPED contributions for profile 123
http GET https://api.ethos.network/api/v1/contributions/123 status==COMPLETED status==SKIPPED
```

##### Response

```json
[
  {
    "id": 501,
    "contributions": [
      {
        "id": 1001,
        "type": "TRUST_CHECK",
        "status": "PENDING",
        "targetUserkey": "profileId:2157"
      },
      {
        "id": 1002,
        "type": "REVIEW_CHECK",
        "status": "PENDING",
        "targetReviewId": 456
      },
      {
        "id": 1003,
        "type": "SCORE_CHECK",
        "status": "PENDING",
        "targetUserkey": "profileId:3148"
      }
    ]
  },
  {
    "id": 502,
    "contributions": [
      {
        "id": 1004,
        "type": "TRUST_BATTLE",
        "status": "PENDING",
        "targetUserkeys": ["profileId:1245", "profileId:3672"]
      }
    ]
  }
]
```

#### Notes

- Retrieves *bundles* of contributions, not individual contributions directly.
- Only includes bundles that are not expired (`expireAt` > now).
- Only includes bundles that contain at least one contribution matching the `status` filter.
- The `contributions` array within each bundle is also filtered by the `status` parameter.
- The `status` query parameter is required and should be specified multiple times for OR logic (e.g., `status=COMPLETED&status=SKIPPED`).
- **Testing Issue**: Direct calls via HTTPie may fail validation (`Expected array, received string`) due to how the server parses repeated query parameters. Client-side usage (appending status values) works.
- Authentication is not required.

---

### Get Contribution Stats by User Key

```
GET /api/v1/contributions/:userkey/stats
```

**Description**: Retrieves contribution statistics for a specific user key (profile or address).

**Authentication Required**: No

#### Parameters

##### Path Parameters

| Name      | Type   | Required | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| `userkey` | string | Yes      | The user key (e.g., `profileId:123`, `address:0xabc...`). |

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
    "canGenerateDailyContributions": boolean,
    "resetTimestamp": number,
    "totalCount": number,
    "completedCount": number,
    "skippedCount": number,
    "pendingCount": number,
    "pendingBundleCount": number,
    "todayXp": number,
    "totalXp": number,
    "streakDays": number,
    "streakDaysOptimistic": number,
    "leaderboardRank": number | null
  }
}
```

| Property                              | Type           | Description                                                               | 
|---------------------------------------|----------------|---------------------------------------------------------------------------|
| `ok`                                  | boolean        | Indicates if the API call itself was successful.                          |
| `data`                                | object         | Container for the contribution statistics.                                |
| `data.canGenerateDailyContributions`  | boolean        | Whether the user can generate new daily contributions.                     |
| `data.resetTimestamp`               | number         | Unix timestamp when the daily contributions reset.                         |
| `data.totalCount`                   | number         | Total number of contributions assigned.                                     |
| `data.completedCount`               | number         | Number of completed contributions.                                        |
| `data.skippedCount`                 | number         | Number of skipped contributions.                                          |
| `data.pendingCount`                 | number         | Number of pending contributions.                                          |
| `data.pendingBundleCount`           | number         | Number of pending contribution bundles.                                   |
| `data.todayXp`                      | number         | XP earned from contributions today.                                       |
| `data.totalXp`                      | number         | Total XP earned from contributions all time.                              |
| `data.streakDays`                   | number         | Current contribution streak in days (confirmed).                          |
| `data.streakDaysOptimistic`         | number         | Current contribution streak assuming today is completed (for UI).         |
| `data.leaderboardRank`              | number \| null | User's rank on the contribution XP leaderboard (or null if not ranked). |

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "error": "Invalid user key format",
  "code": "VALIDATION_ERROR"
}
```

**Code**: 404 Not Found

```json
{
  "error": "User not found",
  "code": "NOT_FOUND"
}
```

#### Example

##### Request

```bash
http GET https://api.ethos.network/api/v1/contributions/profileId:1/stats
```

##### Response

```json
{
  "ok": true,
  "data": {
    "canGenerateDailyContributions": true,
    "resetTimestamp": 1743379200000,
    "totalCount": 0,
    "completedCount": 0,
    "skippedCount": 0,
    "pendingCount": 0,
    "pendingBundleCount": 0,
    "todayXp": 0,
    "totalXp": 5243475,
    "streakDays": 0,
    "streakDaysOptimistic": 0,
    "leaderboardRank": 1
  }
}
```

#### Notes

- Authentication is not required.
- User key can be based on profile ID or address.
- Response details match the `ContributionStats` type from `@ethos/domain`.

---

### Perform Contribution Action

```
POST /api/v1/contributions/action
```

**Description**: Submits an action (e.g., answer, skip, review submission) for a specific contribution item.

**Authentication Required**: Yes (Requires Privy Session and Profile)

#### Parameters

##### Path Parameters

None

##### Query Parameters

None

##### Request Body

```json
{
  "id": number, // Contribution ID
  "action": {
    "type": "SKIP | REVIEW | TRUST_BATTLE | TRUST_CHECK | REVIEW_CHECK | SCORE_CHECK",
    // Additional fields based on type:
    // "txHash": string, (for REVIEW)
    // "chosenIndex": number, (for TRUST_BATTLE)
    // "answer": "POSITIVE | NEGATIVE | NEUTRAL | UNSURE" (for *CHECK types)
  }
}
```

| Property       | Type   | Required | Description                                                                                             |
|----------------|--------|----------|---------------------------------------------------------------------------------------------------------|
| `id`           | number | Yes      | The ID of the contribution being acted upon.                                                            |
| `action`       | object | Yes      | The action object.                                                                                      |
| `action.type`  | string | Yes      | The type of action being performed.                                                                     |
| `action.txHash`| string | Optional | Transaction hash (required for `REVIEW` type).                                                         |
| `action.chosenIndex`| number | Optional | The index chosen by the user (required for `TRUST_BATTLE` type).                                     |
| `action.answer`| string | Optional | The user's answer (required for `TRUST_CHECK`, `REVIEW_CHECK`, `SCORE_CHECK` types). Must be one of `POSITIVE`, `NEGATIVE`, `NEUTRAL`, `UNSURE`. |

#### Responses

##### Success Response

**Code**: 200 OK / 204 No Content (Needs verification)

```json
// Likely returns empty body on success
{
  "ok": true
}
```

| Property | Type    | Description                                      |
|----------|---------|--------------------------------------------------|
| `ok`     | boolean | Indicates if the API call itself was successful. |

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR | CONTRIBUTION_NOT_PENDING | EXPIRED_CONTRIBUTION_BUNDLE | INCORRECT_CONTRIBUTION_ORDER | CONTRIBUTION_TYPE_MISMATCH | ...",
    "message": "Specific error message (e.g., Invalid input, Contribution not pending, etc.)"
  }
}
```

**Code**: 401 Unauthorized

```json
{
  "ok": false,
  "error": {
    "code": "UNAUTHORIZED | NO_ETHOS_PROFILE",
    "message": "Authentication required or no Ethos profile linked"
  }
}
```

**Code**: 404 Not Found

```json
{
  "ok": false,
  "error": {
    "code": "MISSING_CONTRIBUTION",
    "message": "Contribution not found"
  }
}
```

#### Example

##### Request (Skip Action)

```bash
# Needs auth token
http POST https://api.ethos.network/api/v1/contributions/action \
  Authorization:"Bearer <AUTH_TOKEN>" \
  id:=1001 \
  action:='{"type":"SKIP"}'
```

##### Request (Trust Check Action)

```bash
# Needs auth token
http POST https://api.ethos.network/api/v1/contributions/action \
  Authorization:"Bearer <AUTH_TOKEN>" \
  id:=1002 \
  action:='{"type":"TRUST_CHECK", "answer":"POSITIVE"}'
```

##### Response

```json
# Needs actual example response (likely empty or simple ok)
{
  "ok": true
}
```

#### Notes

- This endpoint requires authentication.
- Used to progress through daily contribution tasks.
- Specific errors are returned for various conditions (expired bundle, wrong order, already completed, etc.).
- Need to confirm exact success response (body/status code).

---

### Generate Daily Contributions

```
POST /api/v1/contributions/daily
```

**Description**: Generates the next set of daily contribution tasks for the authenticated user if they are eligible, or returns the existing daily tasks if already generated.

**Authentication Required**: Yes (Requires Privy Session and Profile)

#### Parameters

None

#### Responses

##### Success Response

**Code**: 200 OK

Returns an object containing an array of the user's daily contribution bundle IDs.

```json
{
  "ok": true,
  "data": {
    "contributionBundleIds": [number] // Array of Bundle IDs for the current day
  }
}
```

| Property                     | Type           | Description                                                                                               |
|------------------------------|----------------|-----------------------------------------------------------------------------------------------------------|
| `ok`                         | boolean        | Indicates if the API call itself was successful.                                                          |
| `data`                       | object         | Container for the response data.                                                                          |
| `data.contributionBundleIds` | Array<number>  | An array containing the ID(s) of the contribution bundle(s) generated or retrieved for the current day. |

##### Error Responses

**Code**: 401 Unauthorized

```json
{
  "ok": false,
  "error": {
    "code": "UNAUTHORIZED | NO_ETHOS_PROFILE",
    "message": "Authentication required or no Ethos profile linked"
  }
}
```

**Code**: 409 Conflict

```json
{
  "ok": false,
  "error": {
    "code": "DAILY_TASKS_CREATION_IN_PROGRESS",
    "message": "Daily tasks creation is already in progress" // From Redis lock
  }
}
```

**Code**: 500 Internal Server Error

```json
{
  "ok": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR", // Or other specific codes from lock/DB errors
    "message": "Failed to generate daily contributions"
  }
}
```

#### Example

##### Request

```bash
# Needs auth token
http POST https://api.ethos.network/api/v1/contributions/daily \
  Authorization:"Bearer <AUTH_TOKEN>"
```

##### Response (New Bundles Generated)

```json
# Needs actual example response
{
  "ok": true,
  "data": {
    "contributionBundleIds": [502, 503, 504] // Example IDs
  }
}
```

##### Response (Bundles Already Existed)

```json
# Needs actual example response
{
  "ok": true,
  "data": {
    "contributionBundleIds": [502, 503, 504] // Same IDs as previously generated today
  }
}
```

#### Notes

- Requires authentication.
- Creates the next set of tasks for the user if none exist for the current UTC day.
- If tasks already exist for the day, it returns the existing bundle IDs.
- Uses a Redis lock to prevent concurrent generation attempts, returning a 409 Conflict if locked.

---
