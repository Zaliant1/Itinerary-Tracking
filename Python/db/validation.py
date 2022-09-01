from datetime import datetime
from pydantic import BaseModel

class UserValidation(BaseModel):
    email: str
    password: str

class UserResponseValidation(BaseModel):
    id: int
    email: str


class SessionValidation(BaseModel):
    id: int
    user_id: int

class SessionResponseValidation(BaseModel):
    id: int
    expiration_datetime: datetime