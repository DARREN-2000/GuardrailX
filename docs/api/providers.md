# Providers API

Manage external LLM provider configurations for a specific Tenant.

## `GET /api/v1/tenants/{tenant_id}/providers`

### Purpose
List all LLM providers (e.g., OpenAI, Anthropic, vLLM) configured for a specific tenant.

### Request
`GET /api/v1/tenants/{tenant_id}/providers`

### Response
Returns a list of `ProviderSummary` objects.

```json
{
  "items": [
    {
      "id": "prov-uuid",
      "name": "Production OpenAI",
      "provider_type": "openai",
      "enabled": true,
      "is_default": true,
      "routing_priority": 1
    }
  ]
}
```

### Example
#### cURL
```bash
curl -X GET http://localhost:8000/api/v1/tenants/my-tenant-id/providers \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Python
```python
import requests

headers = {"Authorization": "Bearer YOUR_API_KEY"}
response = requests.get("http://localhost:8000/api/v1/tenants/my-tenant-id/providers", headers=headers)
print(response.json())
```

#### TypeScript
```typescript
const listProviders = async (tenantId: string) => {
  const res = await fetch(`http://localhost:8000/api/v1/tenants/${tenantId}/providers`, {
    headers: { "Authorization": "Bearer YOUR_API_KEY" }
  });
  return await res.json();
};
```

### Error codes
- `401 Unauthorized`: API key is missing or invalid.
- `403 Forbidden`: User does not have access to the specified tenant.
- `404 Not Found`: Tenant ID does not exist.

### Authentication
Requires a valid API key with `read:providers` scope.

### Rate limits
100 requests per minute per IP.

### Best practices
Regularly verify that the `is_default` flag is set correctly on your primary provider to avoid routing failures.

---

## `GET /api/v1/tenants/{tenant_id}/providers/default`

### Purpose
Retrieve the currently active default LLM provider for a given tenant. This is the provider used when a specific routing rule is not met.

### Request
`GET /api/v1/tenants/{tenant_id}/providers/default`

### Response
Returns the `ProviderSummary` object marked as default.

```json
{
  "id": "prov-uuid",
  "name": "Production OpenAI",
  "provider_type": "openai",
  "enabled": true,
  "is_default": true,
  "routing_priority": 1
}
```

### Example
#### cURL
```bash
curl -X GET http://localhost:8000/api/v1/tenants/my-tenant-id/providers/default \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Python
```python
import requests

headers = {"Authorization": "Bearer YOUR_API_KEY"}
response = requests.get("http://localhost:8000/api/v1/tenants/my-tenant-id/providers/default", headers=headers)
print(response.json())
```

#### TypeScript
```typescript
const getDefaultProvider = async (tenantId: string) => {
  const res = await fetch(`http://localhost:8000/api/v1/tenants/${tenantId}/providers/default`, {
    headers: { "Authorization": "Bearer YOUR_API_KEY" }
  });
  return await res.json();
};
```

### Error codes
- `401 Unauthorized`: API key is missing or invalid.
- `404 Not Found`: Default provider not found for the tenant.

### Authentication
Requires a valid API key.

### Rate limits
100 requests per minute per IP.

### Best practices
If building a custom client, retrieve the default provider on initialization to display the active model to the user.
