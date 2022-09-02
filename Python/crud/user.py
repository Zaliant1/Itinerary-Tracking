from db.validation import UserValidation, SessionValidation
from db.models import UserDb, SessionDb
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from uuid import uuid4

class CrudBase:
    def __init__(self, engine):
        self.engine = engine

class CrudUser(CrudBase):
    def add_user(self, user: UserValidation):
        with Session(self.engine) as session:
            new_user = UserDb(password=user.password, email=user.email)
            session.add(new_user)
            session.commit()
            session.refresh(new_user)
        return new_user
    
    def get_user(self, email=None, user_id=None):
        with Session(self.engine) as session:
            user = session.query(UserDb).filter((UserDb.email == email) | (UserDb.id == user_id)).first()

        return user

    def add_session(self, user_id):
        with Session(self.engine) as session:
            expiration = datetime.utcnow() + timedelta(hours=24)
            user_session = SessionDb(id=str(uuid4()), user_id=user_id.id, expiration_datetime=expiration)
            session.add(user_session)
            session.commit()
            session.refresh(user_session)
        
        return user_session

    def get_session(self, user_id) -> SessionDb:
        with Session(self.engine) as session:
            user_session = session.query(SessionDb).filter(SessionDb.user_id == user_id).first()

        return user_session
    
    def get_session_by_id(self, session_id) -> SessionDb:
        with Session(self.engine) as session:
            user_session = session.query(SessionDb).filter(SessionDb.id == session_id).first()

        return user_session

    def validate_session(self, session_id):
        user_session = self.get_session_by_id(session_id)
        
        if not user_session:
            return False
        
        return user_session.expiration_datetime > datetime.utcnow()
