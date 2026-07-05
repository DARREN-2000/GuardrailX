# Examples

## Testing PII Redaction
GuardrailX uses Presidio to redact PII.

```bash
curl -X POST "http://localhost:8000/api/v1/guardrails/evaluate" \
     -H "Content-Type: application/json" \
     -d '{
           "text": "My phone number is 555-0199 and my email is test@example.com.",
           "tenant_id": "tenant-1"
         }'
```

**Expected Output:**
```json
{
  "action": "allow",
  "processed_text": "My phone number is [PHONE_NUMBER] and my email is [EMAIL_ADDRESS].",
  "risk_score": 0.2
}
```
