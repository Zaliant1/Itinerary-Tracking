from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.exc import IntegrityError
from db.main import create_db_engine

from db.models import UserDb, SessionDb
from crud.user import CrudUser
from db.validation import UserResponseValidation, UserValidation, SessionResponseValidation, SessionValidation
from utils import ValidateSession


app = FastAPI()

origins = ["localhost:3000" "127.0.0.1:3000"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"hello": "world"}


@app.post("/login", response_model=UserResponseValidation, )
async def login(login_info: UserValidation, engine=Depends(create_db_engine)):
    crud = CrudUser(engine)
    user = crud.get_user(email=login_info.email)

    if not user:
        raise HTTPException(status_code=403, detail="User not found")

    if login_info.password != user.password:
        raise HTTPException(status_code=403, detail="Invalid password")
    
    session = crud.add_session(user)

    return UserResponseValidation(id=user.id, email=user.email, session_id=session.id, session_expiration=session.expiration_datetime)



@app.post("/signup", response_model=UserResponseValidation)
async def sign_up(user: UserValidation, engine=Depends(create_db_engine)):
    crud = CrudUser(engine)

    try:
        new_user = crud.add_user(user)
        session = crud.add_session(new_user)
        return UserResponseValidation(id=new_user.id, email=new_user.email, session_id=session.id, session_expiration=session.expiration_datetime)

    except IntegrityError:
        raise HTTPException(status_code=422, detail="Email must be unique")


@app.get("/itineraries/{user_id}", dependencies=[Depends(ValidateSession())])
async def list_itinerary(user_id):
    return {}