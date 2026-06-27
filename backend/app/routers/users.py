from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.current_user import get_current_active_user
from app.repositories.user_repository import UserRepository
from app.schemas.user_v2 import (
    UserChangePassword,
    UserCreate,
    UserResponse,
    UserUpdate,
    UserWithDetailsResponse,
)

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/", response_model=List[UserWithDetailsResponse])
def list_users(
    skip: int = 0,
    limit: int = 100,
    company_id: Optional[int] = Query(None),
    role_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = UserRepository(db)
    users = repo.get_all(skip=skip, limit=limit, company_id=company_id, role_id=role_id)
    result = []
    for u in users:
        user_dict = UserWithDetailsResponse.model_validate(u)
        user_dict.company_name = u.company.business_name if u.company else None
        user_dict.role_name = u.role.name if u.role else None
        result.append(user_dict)
    return result


@router.get("/{user_id}", response_model=UserWithDetailsResponse)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = UserRepository(db)
    user = repo.get_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    user_dict = UserWithDetailsResponse.model_validate(user)
    user_dict.company_name = user.company.business_name if user.company else None
    user_dict.role_name = user.role.name if user.role else None
    return user_dict


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = UserRepository(db)
    if repo.get_by_email(user_data.email):
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    from app.core.security import hash_password

    data = user_data.model_dump()
    data["password_hash"] = hash_password(data.pop("password"))
    return repo.create(data)


@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = UserRepository(db)
    user = repo.update(user_id, user_data.model_dump(exclude_unset=True))
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user


@router.patch("/{user_id}/password")
def change_password(
    user_id: int,
    password_data: UserChangePassword,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    from app.core.security import hash_password

    repo = UserRepository(db)
    hashed = hash_password(password_data.new_password)
    if not repo.update_password(user_id, hashed):
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"message": "Contraseña actualizada correctamente"}


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = UserRepository(db)
    if not repo.delete(user_id):
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
