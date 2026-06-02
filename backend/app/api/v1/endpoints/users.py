from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import get_user_service
from app.schemas.users import UserCreate, UserRead
from app.services.users import UserService

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[UserRead])
async def list_users(service: UserService = Depends(get_user_service)) -> list[UserRead]:
    users = await service.list()
    return [UserRead.model_validate(user) for user in users]


@router.get("/{user_id}", response_model=UserRead)
async def get_user(user_id: UUID, service: UserService = Depends(get_user_service)) -> UserRead:
    user = await service.get(user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return UserRead.model_validate(user)


@router.post("", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(payload: UserCreate, service: UserService = Depends(get_user_service)) -> UserRead:
    user = await service.create(
        service.repository.model(
            tenant_id=payload.tenant_id,
            email=payload.email,
            display_name=payload.display_name,
            auth_subject=payload.auth_subject,
            role=payload.role,
            status=payload.status,
            is_active=payload.is_active,
            preferences=payload.preferences,
        )
    )
    return UserRead.model_validate(user)
