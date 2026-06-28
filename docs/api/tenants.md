# Tenants API

Manage Tenants (projects, organizations, or business units) within Aegis.

## `GET /api/v1/tenants`

### Purpose
Retrieve a paginated list of all tenants registered in the system.

### Request
`GET /api/v1/tenants?limit=100&offset=0`

### Query Parameters
- `limit` (integer): Max number of records (default: 100, max: 500).
- `offset` (integer): Number of records to skip (default: 0).

### Response
Returns a paginated list of `TenantSummary` objects.

```json
{
  "items": [
    {
      "id": "tenant-uuid",
      "slug": "engineering-dept",
      "name": "Engineering Department",
      "status": "active"
    }
  ],
  "total": 1
}
```

### Example
#### cURL
```bash
curl -X GET "http://localhost:8000/api/v1/tenants?limit=10&offset=0" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Python
```python
import requests

headers = {"Authorization": "Bearer YOUR_API_KEY"}
response = requests.get("http://localhost:8000/api/v1/tenants", params={"limit": 10}, headers=headers)
print(response.json())
```

#### TypeScript
```typescript
const getTenants = async () => {
  const res = await fetch("http://localhost:8000/api/v1/tenants?limit=10", {
    headers: { "Authorization": "Bearer YOUR_API_KEY" }
  });
  return await res.json();
};
```

### Error codes
- `401 Unauthorized`: API key is missing or invalid.
- `403 Forbidden`: User is not a global administrator.
- `422 Unprocessable Entity`: Invalid pagination parameters.

### Authentication
Requires a valid API key with global `read:tenants` scope (Admin only).

### Rate limits
50 requests per minute per IP.

### Best practices
Always use pagination (`limit` and `offset`) when retrieving tenants to avoid overloading the database in multi-tenant environments.

---

## `GET /api/v1/tenants/{slug}`

### Purpose
Retrieve a specific tenant's details using its unique human-readable slug.

### Request
`GET /api/v1/tenants/{slug}`

### Response
Returns the `TenantSummary` object.

```json
{
  "id": "tenant-uuid",
  "slug": "engineering-dept",
  "name": "Engineering Department",
  "status": "active"
}
```

### Example
#### cURL
```bash
curl -X GET http://localhost:8000/api/v1/tenants/engineering-dept \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Python
```python
import requests

headers = {"Authorization": "Bearer YOUR_API_KEY"}
response = requests.get("http://localhost:8000/api/v1/tenants/engineering-dept", headers=headers)
print(response.json())
```

#### TypeScript
```typescript
const getTenantBySlug = async (slug: string) => {
  const res = await fetch(`http://localhost:8000/api/v1/tenants/${slug}`, {
    headers: { "Authorization": "Bearer YOUR_API_KEY" }
  });
  return await res.json();
};
```

### Error codes
- `401 Unauthorized`: API key is missing or invalid.
- `404 Not Found`: Tenant with the specified slug does not exist.

### Authentication
Requires a valid API key.

### Rate limits
100 requests per minute per IP.

### Best practices
Use slugs for human-readable URLs in your administrative interfaces rather than raw UUIDs.
