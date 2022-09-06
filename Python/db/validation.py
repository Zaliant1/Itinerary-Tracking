from datetime import datetime
from pydoc import describe
from pydantic import BaseModel
from typing import List

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
    itinerary_id: int
    start_datetime: datetime
    end_datetime: datetime
    description: datetime

class ItineraryValidation(BaseModel):
    name: str
    user_id: int
    created_date: datetime
    start_date: datetime
    end_date: datetime
    # items: List[ItineraryItemValidation]

class ItineraryResponseValidation(BaseModel):
    id: int

