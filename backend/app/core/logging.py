from __future__ import annotations

import contextvars
import json
import logging
from datetime import UTC, datetime
from typing import Any

from app.core.config import Settings

request_id_context: contextvars.ContextVar[str | None] = contextvars.ContextVar("request_id", default=None)


class JsonFormatter(logging.Formatter):
	def format(self, record: logging.LogRecord) -> str:
		payload: dict[str, Any] = {
			"timestamp": datetime.now(UTC).isoformat(),
			"level": record.levelname,
			"logger": record.name,
			"message": record.getMessage(),
			"module": record.module,
			"function": record.funcName,
			"line": record.lineno,
		}
		request_id = request_id_context.get()
		if request_id:
			payload["request_id"] = request_id
		if record.exc_info:
			payload["exception"] = self.formatException(record.exc_info)
		for key, value in record.__dict__.items():
			if key.startswith("_") or key in payload or key in logging.LogRecord("", 0, "", 0, "", (), None).__dict__:
				continue
			payload[key] = value
		return json.dumps(payload, default=str)


def configure_logging(settings: Settings) -> None:
	root_logger = logging.getLogger()
	root_logger.handlers.clear()
	root_logger.setLevel(settings.log_level.upper())

	handler = logging.StreamHandler()
	handler.setFormatter(JsonFormatter() if settings.json_logs else logging.Formatter("%(asctime)s %(levelname)s %(name)s %(message)s"))
	root_logger.addHandler(handler)

	for logger_name in ("uvicorn", "uvicorn.error", "uvicorn.access", "sqlalchemy.engine", "sqlalchemy.pool"):
		logger = logging.getLogger(logger_name)
		logger.handlers.clear()
		logger.propagate = True
		logger.setLevel(settings.log_level.upper())


def set_request_id(request_id: str | None) -> None:
	request_id_context.set(request_id)


def get_logger(name: str) -> logging.Logger:
	return logging.getLogger(name)

