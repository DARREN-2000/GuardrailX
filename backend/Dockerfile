FROM python:3.12-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends build-essential curl && rm -rf /var/lib/apt/lists/*

COPY . /app
RUN python -m pip install --upgrade pip setuptools wheel
RUN if [ -f requirements.txt ]; then python -m pip install --no-cache-dir -r requirements.txt; else python -m pip install --no-cache-dir fastapi uvicorn[standard] sqlalchemy asyncpg alembic pydantic pydantic-settings; fi

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
