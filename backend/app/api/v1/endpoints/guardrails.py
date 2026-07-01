from typing import Any, Dict

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.guardrails.content_safety import analyze_content_safety
from app.services.guardrails.enforcement import evaluate_guardrails
from app.services.guardrails.jailbreak import detect_jailbreak
from app.services.guardrails.pii import redact_pii
from app.services.guardrails.prompt_injection import detect_prompt_injection

router = APIRouter(prefix="/guardrails", tags=["guardrails"])


class TextRequest(BaseModel):
    text: str


@router.post("/pii")
async def analyze_pii(request: TextRequest) -> Dict[str, Any]:
    return redact_pii(request.text)


@router.post("/prompt-injection")
async def analyze_prompt_injection(request: TextRequest) -> Dict[str, Any]:
    return detect_prompt_injection(request.text)


@router.post("/jailbreak")
async def analyze_jailbreak(request: TextRequest) -> Dict[str, Any]:
    return detect_jailbreak(request.text)


@router.post("/content-safety")
async def check_content_safety(request: TextRequest) -> Dict[str, Any]:
    return analyze_content_safety(request.text)


@router.post("/evaluate")
async def evaluate(request: TextRequest) -> Dict[str, Any]:
    return evaluate_guardrails(request.text)
