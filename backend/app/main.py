from __future__ import annotations

from contextlib import asynccontextmanager

import mlflow
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.logging import configure_logging, get_logger
from app.db.session import get_engine
from app.observability import configure_otel


@asynccontextmanager
async def lifespan(app: FastAPI):
	settings = get_settings()
	configure_logging(settings)
	engine = None
	if settings.otel_enabled:
		engine = get_engine()
	configure_otel(settings=settings, app=app, engine=engine)
	logger = get_logger(__name__)
	logger.info("starting application", extra={"service": settings.app_name, "environment": settings.environment})

	if settings.mlflow_tracking_uri:
		mlflow.set_tracking_uri(settings.mlflow_tracking_uri)
		logger.info(f"MLflow tracking URI set to {settings.mlflow_tracking_uri}")

	try:
		yield
	finally:
		logger.info("shutting down application")
		if engine is not None:
			await engine.dispose()


def create_app() -> FastAPI:
	settings = get_settings()
	app = FastAPI(title=settings.app_name, lifespan=lifespan)
	app.add_middleware(
		CORSMiddleware,
		allow_origins=settings.cors_origins,
		allow_credentials=True,
		allow_methods=["*"],
		allow_headers=["*"],
	)
	app.include_router(api_router, prefix=settings.api_v1_prefix)

	@app.exception_handler(Exception)
	async def global_exception_handler(request: Request, exc: Exception):
		logger = get_logger(__name__)
		logger.error(f"Unhandled exception: {exc}", exc_info=True)
		return JSONResponse(
			status_code=500,
			content={"detail": "Internal Server Error"},
		)

	return app


app = create_app()

