from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import get_policy_service
from app.schemas.policies import PolicyCreate, PolicyRead
from app.services.policies import PolicyService

router = APIRouter(prefix="/policies", tags=["policies"])


@router.get("", response_model=list[PolicyRead])
async def list_policies(service: PolicyService = Depends(get_policy_service)) -> list[PolicyRead]:
    policies = await service.list()
    return [PolicyRead.model_validate(policy) for policy in policies]


@router.get("/{policy_id}", response_model=PolicyRead)
async def get_policy(policy_id: UUID, service: PolicyService = Depends(get_policy_service)) -> PolicyRead:
    policy = await service.get(policy_id)
    if policy is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Policy not found")
    return PolicyRead.model_validate(policy)


@router.post("", response_model=PolicyRead, status_code=status.HTTP_201_CREATED)
async def create_policy(payload: PolicyCreate, service: PolicyService = Depends(get_policy_service)) -> PolicyRead:
    policy = await service.create(
        service.repository.model(
            tenant_id=payload.tenant_id,
            name=payload.name,
            description=payload.description,
            status=payload.status,
            owner_user_id=payload.owner_user_id,
        )
    )
    return PolicyRead.model_validate(policy)
