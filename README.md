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

<table><thead><tr><th width="325.59375">Format</th><th>Description</th></tr></thead><tbody><tr><td><code>profileId:&#x3C;id></code></td><td>Ethos profile ID<br><em>Ex.:</em> <code>profileId:10</code></td></tr><tr><td><code>address:&#x3C;address></code></td><td><p>Ethereum address  </p><p><em>Ex.:</em> <code>address:0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045</code></p></td></tr><tr><td><code>service:discord:&#x3C;id></code></td><td>Discord user ID<br><em>Ex.:</em> <code>service:discord:797130033613242441</code></td></tr><tr><td><code>service:farcaster:&#x3C;id></code></td><td>Farcaster user ID<br><em>Ex.:</em> <code>service:farcaster:1112412</code></td></tr><tr><td><code>service:telegram:&#x3C;id></code></td><td>Telegram user ID<br><em>Ex.:</em> <code>service:telegram:167380455</code></td></tr><tr><td><code>service:x.com:&#x3C;id></code></td><td>Twitter (x.com) user ID<br><em>Ex.:</em> <code>service:x.com:295218901</code></td></tr><tr><td><code>service:x.com:username:&#x3C;username></code></td><td><p>Twitter (x.com) username</p><p><em>Ex.:</em> <code>service:x.com:username:VitalikButerin</code></p></td></tr></tbody></table>

