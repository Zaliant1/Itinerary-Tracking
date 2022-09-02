from datetime import datetime
from pydantic import BaseModel

class UserValidation(BaseModel):
    email: str
    password: str

class UserResponseValidation(BaseModel):
    id: int
    email: str
    session_id: str
    session_expiration: datetime


class SessionResponseValidation(BaseModel):
    id: int
    email: str
    user_id: int

class SessionValidation(BaseModel):
    email: str