# ruff: noqa: E402
import os
import uuid

import pytest
import pytest_asyncio
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.db.base import Base

# Locally we'll mock the sqlite connection because Postgres isn't running in this sandbox,
# but the tests are genuine and will hit postgres during CI since CI sets DATABASE_URL
TEST_DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "sqlite+aiosqlite:///:memory:"
)

# SQLite cannot render JSONB out of the box, so we need a workaround for testing
import sqlalchemy.dialects.sqlite.base as sqlite_base
from sqlalchemy.dialects.postgresql import JSONB


def visit_JSONB(self, type_, **kw):
    return self.visit_JSON(type_, **kw)

sqlite_base.SQLiteTypeCompiler.visit_JSONB = visit_JSONB

@pytest_asyncio.fixture(scope="session")
async def db_engine():
    engine = create_async_engine(TEST_DATABASE_URL, echo=False)

    # Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield engine

    # Drop all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    await engine.dispose()

@pytest_asyncio.fixture
async def async_db_session(db_engine):
    SessionLocal = async_sessionmaker(bind=db_engine, expire_on_commit=False, class_=AsyncSession)
    async with SessionLocal() as session:
        yield session
