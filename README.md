# Introduction

Welcome to the official API documentation for Ethos Network. This documentation provides detailed information about the Ethos API endpoints, request/response formats, and data models.

These docs are available at [https://developers.ethos.network/](https://developers.ethos.network/) and [https://github.com/trust-ethos/api-docs](https://github.com/trust-ethos/api-docs).

## Getting Started

Ethos offers a comprehensive RESTful API that allows developers to interact with the Ethos Network. The API is organized around standard HTTP methods and uses standard HTTP response codes.

### Whitepaper

For a complete overview of the Ethos Network, including its mechanisms and governance model, please refer to the [Ethos Whitepaper](https://whitepaper.ethos.network).

### Base URL

All API requests should be made to the following base URL:

```
https://api.ethos.network
```

### Authentication

Most API endpoints require authentication using Privy authentication tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_privy_token>
```

### Client Identification

To help us monitor and manage usage across different integrations, all API requests must include the `X-Ethos-Client` header.

This header should contain the name of your product or integration, and may optionally include a version number (e.g., `my-app` or `my-app@1.0.0`).

```http
X-Ethos-Client: my-cool-app@1.2.3
```

{% hint style="warning" %}
Required: Requests without this header may be subject to rate limiting.
{% endhint %}

Including this header helps us:

* Attribute traffic to your app
* Diagnose issues faster
* Ensure fair and efficient resource allocation

### Userkeys

Some APIs accept a `userkey` as a user identifier. Below are the supported formats:

* `profileId:<id>` — Ethos profile ID (e.g., `profileId:10`)
* `address:<address>` — Ethereum address (e.g., `address:0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`)
* `service:discord:<discordUserId>` — Discord user ID (e.g., `service:discord:797130033613242441`)
* `service:farcaster:<farcasterUserId>` — Farcaster user ID (e.g., `service:farcaster:1112412`)
* `service:telegram:<telegramUserId>` — Telegram user ID (e.g., `service:telegram:167380455`)
* `service:x.com:<twitterUserId>` — Twitter (x.com) user ID (e.g., `service:x.com:295218901`)
* `service:x.com:username:<twitterUsername>` — Twitter (x.com) username (e.g., `service:x.com:username:VitalikButerin`)
