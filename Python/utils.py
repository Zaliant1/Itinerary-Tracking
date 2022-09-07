from fastapi import Request, HTTPException
from crud.user import CrudUser

from db.main import create_db_engine

class ValidateSession:
    def __call__(self, request: Request):
        if "authorization" in request.headers:
            crud = CrudUser(create_db_engine())
            
            session_id = request.headers['authorization']

            is_valid = crud.validate_session(session_id)
            if not is_valid:
                raise HTTPException(status_code=403, detail="Invalid Session, Please Log In Again")
                
class User:
    user = None
    session = None

    def __init__(self, request: Request):
        self.user = None

        if "authorization" in request.headers:
            crud = CrudUser(create_db_engine())
            
            session_id = request.headers['authorization']

            self.session = crud.get_session_by_id(session_id)
            self.user = crud.get_user(user_id=self.session.user_id)
