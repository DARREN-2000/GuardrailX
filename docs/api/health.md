# Health API

Endpoints for monitoring the health and readiness of the Aegis service.

## `GET /api/v1/health/live`

### Purpose
Liveness probe. Used by orchestrators (like Kubernetes) to know if the container is running and capable of accepting connections.

### Request
No parameters required.
`GET /api/v1/health/live`

### Response
Returns a simple JSON object indicating the service status.

```json
{
  "status": "ok",
  "service": "GuardrailX",
  "environment": "production"
}
```

### Example
#### cURL
```bash
curl -X GET http://localhost:8000/api/v1/health/live
```

#### Python
```python
import requests

response = requests.get("http://localhost:8000/api/v1/health/live")
print(response.json())
```

#### TypeScript
```typescript
const checkLive = async () => {
  const res = await fetch("http://localhost:8000/api/v1/health/live");
  return await res.json();
};
```

### Error codes
- `500 Internal Server Error`: The service is completely down and cannot process the request.

### Authentication
No authentication required.

### Rate limits
No rate limits.

### Best practices
Call this endpoint every 10 seconds from your load balancer to ensure traffic is only routed to healthy instances.

---

## `GET /api/v1/health/ready`

### Purpose
Readiness probe. Checks if the application is fully ready to process business logic, which includes verifying connectivity to the PostgreSQL database and Redis cache.

### Request
No parameters required.
`GET /api/v1/health/ready`

### Response
Returns a JSON object detailing the status of the service and its critical dependencies.

```json
{
  "status": "ok",
  "service": "GuardrailX",
  "environment": "production",
  "checks": {
    "database": "ok"
  }
}
```

### Example
#### cURL
```bash
curl -X GET http://localhost:8000/api/v1/health/ready
```

#### Python
```python
import requests

response = requests.get("http://localhost:8000/api/v1/health/ready")
print(response.json())
```

#### TypeScript
```typescript
const checkReady = async () => {
  const res = await fetch("http://localhost:8000/api/v1/health/ready");
  return await res.json();
};
```

### Error codes
- `503 Service Unavailable`: One or more backing services (e.g., Database) are unreachable.

### Authentication
No authentication required.

### Rate limits
No rate limits.

### Best practices
Use this endpoint during deployment rollouts to ensure the new version is fully connected to all databases before terminating the old version.
