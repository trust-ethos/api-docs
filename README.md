# Ethos API Documentation

Welcome to the official API documentation for Ethos Network. This documentation provides detailed information about the Ethos API endpoints, request/response formats, and data models.

## Getting Started

Ethos offers a comprehensive RESTful API that allows developers to interact with the Ethos Network. The API is organized around standard HTTP methods and uses standard HTTP response codes.

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

## API Overview

The Ethos API is organized into the following sections:

- **[Activities](content/activities.md)**: Retrieve activities such as vouches, reviews, attestations, and invitations
- **[Attestations](content/attestations.md)**: Manage service verifications and attestations
- **[Authentication](content/auth.md)**: Handle user authentication and login
- **[Connections](content/connections.md)**: Retrieve transaction and interaction data between users
- **[Invitations](content/invitations.md)**: Manage invitations to the Ethos network
- **[Notifications](content/notifications.md)**: Manage user notification settings
- **[Profiles](content/profiles.md)**: Access and manage user profiles
- **[Replies](content/replies.md)**: Work with comment replies
- **[Reviews](content/reviews.md)**: Create and retrieve user reviews
- **[Search](content/search.md)**: Search for profiles, users, and markets
- **[Users](content/users.md)**: Access user data and statistics
- **[Vouches](content/vouches.md)**: Create and manage vouches between users

## Support

If you need help integrating with the Ethos API, please reach out to our developer support team at [developer@ethos.network](mailto:developer@ethos.network).

## OpenAPI Specification

The complete OpenAPI specification for the Ethos API is available as a [YAML file](https://github.com/ethos/api-docs/blob/main/openapi.yaml). 