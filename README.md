# Ethos API Documentation

Welcome to the official API documentation for Ethos Network. This documentation provides detailed information about the Ethos API endpoints, request/response formats, and data models.

These docs are available at <https://developers.ethos.network/> and <https://github.com/trust-ethos/api-docs>.

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

### Userkeys

Some APIs accept a `userkey` as a user identifier. Below are the supported formats:

* `profileId:<id>` — Ethos profile ID (e.g., `profileId:10`)
* `address:<address>` — Ethereum address (e.g., `address:0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`)
* `service:discord:<discordUserId>` — Discord user ID (e.g., `service:discord:797130033613242441`)
* `service:x.com:<twitterUserId>` — Twitter (x.com) user ID (e.g., `service:x.com:295218901`)
* `service:x.com:username:<twitterUsername>` — Twitter (x.com) username (e.g., `service:x.com:username:VitalikButerin`)
