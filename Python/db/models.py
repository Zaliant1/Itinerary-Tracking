from datetime import datetime
from .main import create_db_engine


from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func


DeclarativeBase = declarative_base()

engine = create_db_engine()

class BaseDbModel:
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()
    
    def __repr__(self):
        return str(self.__dict__)


class UserDb(DeclarativeBase, BaseDbModel):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String(50), nullable=False)
    # email = Column(String(50), unique=True, nullable=False)
    password = Column(String(60), nullable=False)

    def __init__(self, password=None, email=None, user_id=None):
        if email:
            self.email = email

        if user_id:
            self.id = user_id
        
        if password:
            self.password = password


class ItineraryDb(DeclarativeBase, BaseDbModel):
    __tablename__ = "itinerary"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    name = Column(String(50), nullable=False)
    created_date = Column(DateTime, nullable=False)
    updated_date = Column(DateTime, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    is_publushed = Column(Boolean)

    def __init__(self, name):
        self.name = name



class ItineraryItemDb(DeclarativeBase, BaseDbModel):
    __tablename__ = "itinerary_item"
    id = Column(Integer, primary_key=True)
    itinerary_id = Column(Integer, ForeignKey('itinerary.id'))
    start_datetime = Column(DateTime, nullable=False)
    end_datetime = Column(DateTime, nullable=False)
    description = Column(String(180), nullable=False)
    park_id = Column(Integer)

    def __init__(self, description):
        self.description = description



class ParkDb(DeclarativeBase, BaseDbModel):
    __tablename__ = "parks"
    id = Column(Integer, primary_key=True)
    park = Column(String(100), unique=True, nullable=False)

    def __init__(self, park):
        self.park = park


class SessionDb(DeclarativeBase, BaseDbModel):
    __tablename__ = "sessions"
    id = Column(String(36), primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    expiration_datetime = Column(DateTime(timezone=False), nullable=False, server_default=func.utcnow())




UserDb.metadata.create_all(engine)
ItineraryDb.metadata.create_all(engine)
ItineraryItemDb.metadata.create_all(engine)
ParkDb.metadata.create_all(engine)
SessionDb.metadata.create_all(engine)