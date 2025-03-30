# Notifications

## Endpoints

### Update User FCM Token

```
POST /api/v1/notifications/user-fcm-token
```

**Description**: Updates or registers the Firebase Cloud Messaging (FCM) token for the authenticated user's device, enabling push notifications.

**Authentication Required**: Yes (Requires Privy Session and Profile)

#### Parameters

##### Path Parameters

None

##### Query Parameters

None

##### Request Body

```json
{
  "token": "string", // The FCM registration token from the client device
  "deviceIdentifier": "string" // A unique identifier for the client device/browser instance
}
```

| Property           | Type   | Required | Description                                                     |
|--------------------|--------|----------|-----------------------------------------------------------------|
| `token`            | string | Yes      | The Firebase Cloud Messaging registration token.              |
| `deviceIdentifier` | string | Yes      | A unique identifier for the client device/browser instance. |

#### Responses

##### Success Response

**Code**: 200 OK

Returns an object indicating the result of the operation.

```json
{
  "ok": true,
  "data": {
    "result": "unchanged | updated | created"
  }
}
```

| Property         | Type    | Description                                                                                              |
|------------------|---------|----------------------------------------------------------------------------------------------------------|
| `ok`             | boolean | Indicates if the API call itself was successful.                                                         |
| `data`           | object  | Container for the response data.                                                                         |
| `data.result`    | string  | Result status: 'unchanged' (token already exists for device), 'updated' (token updated), 'created' (new token/device registered). |

##### Error Responses

**Code**: 400 Bad Request

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid or missing token/deviceIdentifier in request body"
    // ... potentially other validation fields
  }
}
```

**Code**: 401 Unauthorized

```json
{
  "ok": false,
  "error": {
    "code": "UNAUTHORIZED | NO_ETHOS_PROFILE", // Service uses Forbidden, but route might map to Unauthorized
    "message": "Authentication required or no Ethos profile linked"
  }
}
```

#### Example

##### Request

```bash
# Needs auth token, a valid FCM token, and a device ID
FCM_TOKEN="bk3RNwTe3H0:CI2k_HHwgIpoDKCIZheNIo..."
DEVICE_ID="unique-browser-or-device-fingerprint"

http POST https://api.ethos.network/api/v1/notifications/user-fcm-token \
  Authorization:"Bearer <AUTH_TOKEN>" \
  token=$FCM_TOKEN \
  deviceIdentifier=$DEVICE_ID
```

##### Response (Example: Token Created)

```json
{
  "ok": true,
  "data": {
    "result": "created"
  }
}
```

#### Notes

- Requires authentication.
- Associates the provided FCM token with the authenticated user's profile and a specific device identifier.
- Allows the backend to send push notifications to the user's device via Firebase.
- Manages token updates and enforces a limit of 10 registered devices per profile. 