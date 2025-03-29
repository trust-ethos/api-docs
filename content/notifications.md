# Notifications API

## Overview

The Notifications API provides functionality for managing push notifications in the Ethos network. It allows users to register their devices for push notifications and enables applications to send notifications to users when specific events occur, such as receiving vouches, reviews, replies to their posts, or when their score changes.

## Endpoints

### Update User FCM Token

```
POST /api/v1/notifications/user-fcm-token
```

Registers or updates a Firebase Cloud Messaging (FCM) token for the authenticated user's device. This token is required to send push notifications to the user's device.

The system maintains up to 10 tokens per user profile (for different devices). When that limit is reached, the oldest tokens are removed when new ones are added.

#### Authentication Required

This endpoint requires authentication and an Ethos profile.

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| token | string | Yes | Firebase Cloud Messaging token for the user's device |
| deviceIdentifier | string | Yes | Unique identifier for the user's device |

#### Example Request

```json
{
  "token": "fJ9XBSehTAqBf-Vxxr5YSA:APA91bGNyhl8Yf2ePjRBR8FHJtkxw8YZ9gXh9WgJzY7Z...",
  "deviceIdentifier": "d5e8f7g6-h5i4-j3k2-l1m0-n9o8p7q6r5s4"
}
```

#### Success Response (200 OK)

```json
{
  "result": "created"
}
```

The result can be one of:
- `created`: A new FCM token was registered for the device
- `updated`: An existing token for the device was updated
- `unchanged`: The token was already registered and hasn't changed

#### Error Responses

**400 Bad Request**
```json
{
  "error": "Invalid parameters",
  "code": "INVALID_PARAMETERS"
}
```

**401 Unauthorized**
```json
{
  "error": "Authentication required",
  "code": "AUTHENTICATION_REQUIRED"
}
```

**403 Forbidden**
```json
{
  "error": "No Ethos profile",
  "code": "NO_PROFILE"
}
```

## Notification Types

The Ethos platform sends various types of notifications to users:

### Activity Notifications

Users receive notifications for activities involving them, such as:

1. **Reviews** - When someone leaves a review about them
2. **Vouches** - When someone vouches for them
3. **Unvouches** - When someone removes a vouch from them
4. **Replies** - When someone replies to their review, vouch, attestation, or discussion
5. **Invitations** - When someone accepts an invitation they sent

### Score Change Notifications

Users receive notifications when their credibility score changes significantly.

## Notification Payload Structure

When the server sends a push notification, it uses the following payload structure:

| Field | Description |
|-------|-------------|
| title | Title of the notification |
| body | Main content of the notification |
| image | (Optional) URL to an image to display in the notification |
| badge | (Optional) URL to a badge icon for the notification |
| icon | (Optional) URL to an icon for the notification |
| url | (Optional) URL that the notification should link to when clicked |

## Client Implementation Notes

To implement push notifications in a client application:

1. Register a service worker that can receive Firebase Cloud Messaging (FCM) notifications
2. Request notification permission from the user
3. Initialize Firebase Messaging and retrieve an FCM token
4. Register the FCM token with the Ethos API using the Update User FCM Token endpoint
5. Set up handlers for receiving notifications when the app is in the foreground
6. Configure the service worker to display notifications when the app is in the background
