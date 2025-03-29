# API Reference

This page provides a comprehensive reference to the Ethos API using OpenAPI specification.

{% openapi src="../openapi.yaml" %}
{% endopenapi %}

## Using the API

The interactive documentation above allows you to:

1. Browse all available API endpoints
2. See request and response schemas for each endpoint
3. Test API calls directly from the documentation
4. View code samples in various programming languages

## Authentication

Most API endpoints require authentication using Privy authentication tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_privy_token>
```

## Rate Limiting

API requests are subject to rate limiting to ensure fair usage and system stability. If you exceed the rate limits, you will receive a `429 Too Many Requests` response.

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests:

- `2xx`: Success
- `4xx`: Client error (invalid request)
- `5xx`: Server error

Error responses include a JSON body with more details about the error:

```json
{
  "error": {
    "code": "invalid_parameter",
    "message": "The parameter 'id' is invalid",
    "details": { ... }
  }
}
```
