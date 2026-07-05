# Deployment

## Deploying to Render
GuardrailX includes a `render.yaml` for easy deployment to Render's managed infrastructure.

1. Connect your repository to Render.
2. Select **Blueprint** and point it to `render.yaml`.
3. Render will provision a PostgreSQL DB and a Python backend.
4. Set the `VITE_API_BASE_URL` in your frontend deployment to match your new backend URL.

## Deploying to AWS / GCP
For custom cloud deployments, use the provided Dockerfiles.

1. Provision a managed PostgreSQL instance (RDS / Cloud SQL).
2. Deploy the `backend/Dockerfile` to a container runtime (ECS / Cloud Run).
3. Provide the `DATABASE_URL` as an environment variable to the container.
