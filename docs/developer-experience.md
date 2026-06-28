# Developer Experience (DX) & Onboarding

Welcome to the Aegis codebase! We pride ourselves on maintaining a world-class Developer Experience. This guide will help you understand our conventions and get your first PR merged quickly.

## Repository Layout

```text
Aegis/
├── backend/            # The Python backend (FastAPI)
│   ├── alembic/        # DB Migrations (Schema versioning)
│   ├── app/            # Application code
│   │   ├── api/        # REST endpoints (Routing layer)
│   │   ├── core/       # Config, Logging, Dependencies
│   │   ├── db/         # Session management
│   │   ├── models/     # SQLAlchemy ORM models
│   │   ├── repositories/# Data access layer
│   │   ├── schemas/    # Pydantic models (Validation)
│   │   └── services/   # Business logic layer
│   └── tests/          # Pytest suite
├── frontend/           # The React frontend
│   ├── src/
│   │   ├── components/ # Reusable UI pieces
│   │   ├── pages/      # Route-level components
│   │   ├── hooks/      # React custom hooks
│   │   └── lib/        # Utilities (e.g., API clients)
├── docs/               # Markdown documentation
└── infrastructure/     # Docker, K8s, Terraform
```

## Coding Conventions

### Backend (Python)
- We use **Clean Architecture**. Do not access the database directly from the `api` layer. Route requests `API -> Service -> Repository`.
- We use **Dependency Injection**. Services and Repositories are injected via FastAPI's `Depends`.
- Fully type-hinted code is mandatory (`mypy` strict mode).
- Use asynchronous programming (`async def` / `await`) for all I/O bound operations.

### Frontend (TypeScript/React)
- Strictly use **React 19** features and concurrent mode compatible patterns.
- CSS is handled exclusively via **Tailwind CSS**. No inline styles or custom CSS files.
- UI components use **shadcn/ui** primitives.

## Testing

**Backend:**
We use `pytest` with `pytest-asyncio`. We aim for >90% coverage. Tests must test real database interactions using an in-memory SQLite database (via `aiosqlite`).

```bash
cd backend
PYTHONPATH=. pytest
```

## Linting & Formatting

We use `pre-commit` to ensure code quality before pushing.

- Python formatting: `ruff format`
- Python linting: `ruff check`
- Frontend formatting: `prettier`

To set up the hooks:
```bash
pre-commit install
```

## CI/CD & GitHub Actions

Our CI pipeline (`ci.yml`) runs on every Pull Request to `main`. It enforces:
1. Python linting (Ruff)
2. Type checking (Mypy)
3. Backend tests (Pytest)
4. Frontend linting (ESLint)
5. Frontend build verification (Vite)

## Branch Strategy & Release Process

- `main` is the stable, production-ready branch.
- Feature branches should be named `feature/your-feature-name`.
- Bugfix branches should be named `fix/issue-description`.
- We follow Semantic Versioning (SemVer). Releases are tagged `vX.Y.Z` and drafted in GitHub Releases.
