# Ethos API Documentation

## Overview

Welcome to the Ethos API documentation. This API provides access to the Ethos network, allowing you to interact with profiles, vouches, reviews, and other core functionality.

## Interactive API Reference

For an interactive experience with our API, check out the [API Reference](./sections/api-reference.md) page, which allows you to explore and test API endpoints directly from the documentation.

## Base URL

```
https://api.ethos.network
```

## Authentication

Many endpoints require authentication using Privy sessions. When authentication is required, it will be noted in the endpoint documentation.

## API Versioning

The Ethos API is versioned. The current version is `v1` and should be included in the URL path.

## Content Type

All requests and responses use JSON as the content type.

## Rate Limiting

Some endpoints may have rate limiting applied. Rate limits are specified per endpoint when applicable.

## Common Parameters

### User Identification

Many endpoints accept a `userkey` parameter, which can be one of:
- A profile ID (numeric)
- An Ethereum address (0x...)
- A nickname
- An ENS name

## Available Sections

The API is organized into the following sections:

1. [API Reference](./sections/api-reference.md) - Interactive API documentation
2. [Activities](./sections/activities.md) - User activities and events
3. [Admin](./sections/admin.md) - Administrative functions
4. [Addresses](./sections/addresses.md) - User addresses
5. [Attestations](./sections/attestations.md) - On-chain attestations
6. [Categories](./sections/categories.md) - Profile categories and groups
7. [Claim](./sections/claim.md) - Claiming functionality
8. [Contracts](./sections/contracts.md) - Blockchain contract information
9. [Contribution](./sections/contribution.md) - User contributions
10. [Curated Lists](./sections/curated-lists.md) - Curated user lists
11. [ENS](./sections/ens.md) - Ethereum Name Service integration
12. [Events](./sections/events.md) - Blockchain events
13. [Exchange Rates](./sections/exchange-rates.md) - Cryptocurrency exchange rates
14. [Fees](./sections/fees.md) - Platform fees
15. [Firebase](./sections/firebase.md) - Firebase Cloud Messaging
16. [Invitation](./sections/invitation.md) - User invitations
17. [Market](./sections/market.md) - Reputation markets
18. [Migration](./sections/migration.md) - Data migration tools
19. [Privy Logins](./sections/privy-logins.md) - Authentication via Privy
20. [Profile](./sections/profile.md) - User profiles
21. [Reply](./sections/reply.md) - Discussion replies
22. [Review](./sections/review.md) - User reviews
23. [Score](./sections/score.md) - User reputation scores
24. [Search](./sections/search.md) - Search functionality
25. [Signatures](./sections/signatures.md) - Blockchain signature utilities
26. [Slash](./sections/slash.md) - Reputation slashing
27. [Transactions](./sections/transactions.md) - Blockchain transactions
28. [Twitter](./sections/twitter.md) - Twitter integrations
29. [Users](./sections/users.md) - User information
30. [Vouch](./sections/vouch.md) - Reputation vouches
31. [XP](./sections/xp.md) - Experience points

## Using HTTPie for Testing

You can use HTTPie to test API endpoints. For example:

```bash
http GET https://api.ethos.network/api/v1/profiles/directory
```

For endpoints requiring authentication, you would need to include your session token:

```bash
http POST https://api.ethos.network/api/v1/vouches \
  Cookie:"YOUR_SESSION_COOKIE" \
  subjectProfileId=123
```

## Error Handling

The API uses standard HTTP status codes to indicate success or failure:

- 200: OK - The request was successful
- 400: Bad Request - The request was invalid
- 401: Unauthorized - Authentication is required
- 403: Forbidden - The authenticated user does not have permission
- 404: Not Found - The requested resource does not exist
- 500: Internal Server Error - An error occurred on the server

Error responses include a JSON body with more details:

```json
{
  "error": "Invalid profile ID",
  "code": "INVALID_PROFILE_ID"
}
```
