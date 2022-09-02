from fastapi import Request, HTTPException
from crud.user import CrudUser

from db.main import create_db_engine

class ValidateSession:
    async def __call__(self, request: Request):
        if "authorization" in request.headers:
            crud = CrudUser(create_db_engine())
            is_valid = crud.validate_session(request.headers['authorization'])
            if not is_valid:
                raise HTTPException(status_code=403, detail="Invalid Session")
                
