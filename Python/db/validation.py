from datetime import datetime
from pydoc import describe
from pydantic import BaseModel
from typing import List, Optional

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

class ItineraryItemValidation(BaseModel):
    start_datetime: datetime
    end_datetime: datetime
    description: str

class ItineraryValidation(BaseModel):
    name: str
    user_id: int = None
    start_datetime: datetime
    end_datetime: datetime
    is_published: bool = False
    items: List[ItineraryItemValidation] = None

class ItineraryResponseValidation(BaseModel):
    id: int

class GetItineraryResponseValidation(BaseModel):
    is_published: bool = False
    name: str
    user_id: int
    id: int
    start_datetime: datetime
    end_datetime: datetime
    items: List[ItineraryItemValidation]

