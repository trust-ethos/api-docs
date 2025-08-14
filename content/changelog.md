# API Changelog

## Recent Changes

- 8 Aug 2025 - Removed deprecated /api/v1/activities endpoint

---

## Deprecated Endpoints

These endpoints will be removed after the advertised date. We will do our best to notify consumers (by their advertised `X-Ethos-Client` header) in advance of removal.

| Method | Path | Description | Sunset |
| ------ | ---- | ----------- | ------- |
| `POST` | `/api/v1/reviews` | Query reviews. | 1 Aug 2025 |
| `POST` | `/api/v1/reviews/count` | Return review count. | 1 Aug 2025 |
| `POST` | `/api/v1/reply` | Query replies | 1 Oct 2025 |

---

## Beta Endpoints

Beta endpoints are recent additions and are still subject to rapid change without further notification to consumers. We will remove the 'beta' tag once they are stable.

| Method | Path | Description |
| ------ | ---- | ----------- |

---

## Internal Endpoints

Internal endpoints are used by Ethos frontend and are not intended for public consumption. They may change without notice. We intend to 'publish' them to beta status.

| Method | Path | Description |
| ------ | ---- | ----------- |
| `GET`  | `/internal/users/{userkey}` | Fetch user details by userkey. |
| `GET`  | `/internal/listings` | Retrieve internal project listings page. |
| `GET`  | `/internal/listings/{username}` | Retrieve project details for listings page. |

