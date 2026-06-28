# Users API

Manage users and their roles within Aegis.

## `GET /api/v1/users`

### Purpose
Retrieve a list of all users within the current tenant context.

### Request
`GET /api/v1/users`

### Response
Returns an array of User objects.

```json
[
  {
    "id": "user-uuid",
    "tenant_id": "tenant-uuid",
    "email": "user@example.com",
    "display_name": "John Doe",
    "role": "admin",
    "status": "active"
  }
]
```

### Example
#### cURL
```bash
curl -X GET http://localhost:8000/api/v1/users \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Python
```python
import requests

headers = {"Authorization": "Bearer YOUR_API_KEY"}
response = requests.get("http://localhost:8000/api/v1/users", headers=headers)
print(response.json())
```

#### TypeScript
```typescript
const getUsers = async () => {
  const res = await fetch("http://localhost:8000/api/v1/users", {
    headers: { "Authorization": "Bearer YOUR_API_KEY" }
  });
  return await res.json();
};
```

### Error codes
- `401 Unauthorized`: API key is missing or invalid.
- `403 Forbidden`: Insufficient permissions to view users.

### Authentication
Requires a valid API key with `read:users` scope.

### Rate limits
100 requests per minute.

### Best practices
Ensure only users with the `admin` role can access this endpoint to maintain privacy.

---

## `POST /api/v1/users`

### Purpose
Provision a new user account within a tenant.

### Request
`POST /api/v1/users`

**Body:**
```json
{
  "tenant_id": "tenant-uuid",
  "email": "newuser@example.com",
  "display_name": "New User",
  "auth_subject": "auth0|123456",
  "role": "developer",
  "status": "active",
  "is_active": true
}
```

### Response
Returns the created User object.

```json
{
  "id": "new-user-uuid",
  "tenant_id": "tenant-uuid",
  "email": "newuser@example.com",
  "display_name": "New User",
  "role": "developer",
  "status": "active"
}
```

### Example
#### cURL
```bash
curl -X POST http://localhost:8000/api/v1/users \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tenant_id": "t-id", "email": "test@example.com", "display_name": "Test", "auth_subject": "sub", "role": "admin", "status": "active", "is_active": true}'
```

#### Python
```python
import requests

headers = {"Authorization": "Bearer YOUR_API_KEY"}
payload = {
    "tenant_id": "t-id",
    "email": "test@example.com",
    "display_name": "Test",
    "auth_subject": "sub",
    "role": "admin",
    "status": "active",
    "is_active": True
}
response = requests.post("http://localhost:8000/api/v1/users", headers=headers, json=payload)
print(response.json())
```

#### TypeScript
```typescript
const createUser = async () => {
  const response = await fetch('http://localhost:8000/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      tenant_id: "t-id",
      email: "test@example.com",
      display_name: "Test",
      auth_subject: "sub",
      role: "admin",
      status: "active",
      is_active: true
    })
  });
  return await response.json();
};
```

### Error codes
- `400 Bad Request`: Validation error in the payload.
- `401 Unauthorized`: API key missing.
- `403 Forbidden`: API key lacks permission to create users.

### Authentication
Requires a valid API key with `write:users` scope.

### Rate limits
20 requests per minute.

### Best practices
Map the `auth_subject` to the exact `sub` claim returned by your identity provider (e.g., Auth0, Okta) to ensure seamless Single Sign-On mapping.
