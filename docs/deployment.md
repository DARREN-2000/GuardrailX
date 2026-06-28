# Deployment & Production Setup

Deploying Aegis in a production environment requires careful consideration of security, high availability, and performance. This guide outlines the recommended deployment architectures.

## Production Setup

For enterprise workloads, we strongly recommend deploying Aegis via Kubernetes using our provided Helm charts.

### Prerequisites
- A Kubernetes cluster (EKS, GKE, AKS)
- A managed PostgreSQL instance (e.g., Amazon RDS)
- A managed Redis instance (e.g., Amazon ElastiCache)
- An Ingress controller (e.g., NGINX, ALB)

### Helm Deployment (Coming Soon)

We are actively developing official Helm charts. In the interim, use the provided Kubernetes manifests in the `infrastructure/k8s/` directory.

```bash
# Example manual deployment
kubectl apply -f infrastructure/k8s/namespace.yaml
kubectl apply -f infrastructure/k8s/configmap.yaml
kubectl apply -f infrastructure/k8s/secrets.yaml
kubectl apply -f infrastructure/k8s/deployment.yaml
kubectl apply -f infrastructure/k8s/service.yaml
```

## Scaling

Aegis is designed to scale horizontally.

- **Stateless Backend:** The FastAPI application is completely stateless. You can scale the deployment replicas infinitely.
- **Database Pooling:** Ensure you use a connection pooler like **PgBouncer** in front of your PostgreSQL database to handle thousands of concurrent connections from the Aegis worker nodes.
- **Redis Clustering:** For semantic caching and global rate limiting, configure a Redis cluster rather than a standalone instance.

### Kubernetes Horizontal Pod Autoscaler (HPA)

Configure HPA to scale based on CPU utilization and request latency.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: aegis-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: aegis-backend
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Migration Guide

When upgrading Aegis versions, you must apply database migrations.

1. Ensure your new deployment is configured with the correct `DATABASE_URL`.
2. Run the Alembic migration command from the `backend/` directory before shifting traffic to the new pods:
   ```bash
   alembic upgrade head
   ```
3. In a Kubernetes environment, use an InitContainer or a Kubernetes Job to run migrations automatically during the Helm release process.
