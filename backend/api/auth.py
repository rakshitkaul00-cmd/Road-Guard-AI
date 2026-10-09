import jwt
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional, List
import sqlite3

from backend.database import get_db
from backend.config import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRATION_HOURS
from backend.models.schemas import UserLoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])
security = HTTPBearer(auto_error=False)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

def get_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> Optional[dict]:
    if not credentials:
        return None
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token"
        )

def require_role(allowed_roles: List[str]):
    def role_checker(user: Optional[dict] = Depends(get_current_user)):
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required for administrative operations"
            )
        if user.get("role") not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Requires one of roles: {', '.join(allowed_roles)}"
            )
        return user
    return role_checker

@router.post("/login", response_model=TokenResponse)
def login(creds: UserLoginRequest, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT id, email, full_name, role FROM users WHERE email = ?", (creds.email,))
    user = cursor.fetchone()
    
    # For demonstration, verify passwords:
    # Admin: Admin@RoadGuard2026
    # Moderator: Moderator@RoadGuard2026
    is_valid = False
    if user:
        if creds.email == "admin@roadguard.ai" and creds.password == "Admin@RoadGuard2026":
            is_valid = True
        elif creds.email == "moderator@roadguard.ai" and creds.password == "Moderator@RoadGuard2026":
            is_valid = True

    if not user or not is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials. For viva demo: admin@roadguard.ai / Admin@RoadGuard2026"
        )

    token_data = {
        "sub": str(user["id"]),
        "email": user["email"],
        "role": user["role"],
        "full_name": user["full_name"]
    }
    token = create_access_token(token_data)

    return TokenResponse(
        access_token=token,
        role=user["role"],
        email=user["email"],
        full_name=user["full_name"]
    )
