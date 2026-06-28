# Policies API

Manage security and governance policies within a Tenant.

## `GET /api/v1/policies`

### Purpose
Retrieve a paginated list of all policies defined across the system or within a specific tenant context.

### Request
`GET /api/v1/policies`

### Response
Returns an array of `PolicyRead` objects representing the configured rules.

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "tenant_id": "tenant-uuid-xyz",
    "name": "Block PII",
    "description": "Redacts SSNs and Credit Cards",
    "status": "active"
  }
]
```

### Example
#### cURL
```bash
curl -X GET http://localhost:8000/api/v1/policies \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Python
```python
import requests

headers = {"Authorization": "Bearer YOUR_API_KEY"}
response = requests.get("http://localhost:8000/api/v1/policies", headers=headers)
print(response.json())
```

#### TypeScript
```typescript
const listPolicies = async () => {
  const res = await fetch("http://localhost:8000/api/v1/policies", {
    headers: { "Authorization": "Bearer YOUR_API_KEY" }
  });
  return await res.json();
};
```

### Error codes
- `401 Unauthorized`: API key is missing or invalid.
- `403 Forbidden`: API key lacks permission to read policies.

### Authentication
Requires a valid API key with `read:policies` scope.

### Rate limits
100 requests per minute per IP address.

### Best practices
Cache the list of policies locally in your application if you are building an administrative dashboard to reduce API calls.

---

## `POST /api/v1/policies`

### Purpose
Create a new governance policy to intercept and evaluate AI traffic.

### Request
`POST /api/v1/policies`

**Body:**
```json
{
  "tenant_id": "tenant-uuid",
  "name": "Strict Injection Block",
  "description": "Blocks prompt injections with threshold 0.9",
  "status": "active",
  "owner_user_id": "user-uuid"
}
```

### Response
Returns the newly created policy object.

```json
{
  "id": "new-policy-uuid",
  "tenant_id": "tenant-uuid",
  "name": "Strict Injection Block",
  "description": "Blocks prompt injections with threshold 0.9",
  "status": "active"
}
```

### Example
#### cURL
```bash
curl -X POST http://localhost:8000/api/v1/policies \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tenant_id": "tenant-uuid", "name": "Strict Block", "status": "active"}'
```

#### Python
```python
import requests

headers = {"Authorization": "Bearer YOUR_API_KEY"}
payload = {
    "tenant_id": "tenant-uuid",
    "name": "Strict Block",
    "status": "active"
}
response = requests.post("http://localhost:8000/api/v1/policies", headers=headers, json=payload)
print(response.json())
```

#### TypeScript
```typescript
const createPolicy = async () => {
  const response = await fetch('http://localhost:8000/api/v1/policies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      tenant_id: "tenant-uuid",
      name: "Strict Block",
      status: "active"
    })
  });
  return await response.json();
};
```

### Error codes
- `400 Bad Request`: Invalid payload format or missing required fields.
- `401 Unauthorized`: API key is missing or invalid.
- `403 Forbidden`: API key lacks permission to create policies.

### Authentication
Requires a valid API key with `write:policies` scope.

### Rate limits
50 requests per minute per IP address.

### Best practices
Use descriptive names and comprehensive descriptions for policies so other administrators understand their purpose during audits.
