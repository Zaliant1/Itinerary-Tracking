from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.exc import IntegrityError

from db.models import UserDb, SessionDb
from db.validation import UserResponseValidation, UserValidation, SessionResponseValidation, SessionValidation


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


# @app.get("/registration/{email},{password},{passconfirm}")
# def registration(email: str, password: str, passconfirm: str):

#     registration_info = [
#         {"email": email},
#         {"password": password},
#         {"passconfirm": passconfirm},
#     ]
    
#     if registration_info[1]["password"] == registration_info[2]["passconfirm"]:

#         new_user = UserDb(email, password)
#         db.session.add(new_user)
#         db.session.commit()
#         print("passwords match, adding to db")
#     else:
#         print(
#             "they don't match",
#             registration_info[1]["password"],
#             registration_info[2]["passconfirm"],
#         )



@app.post("/session", response_model=SessionResponseValidation)
async def userpage(session_info: SessionValidation):
    session_info = SessionDb(session_id=session_info.id).get()
    return session_info







@app.post("/login", response_model=UserResponseValidation)
async def login(login_info: UserValidation):
    user = UserDb(email=login_info.email).get()

    if not user:
        raise HTTPException(status_code=403, detail="User not found")

    if not user.validate_password(login_info.password):
        raise HTTPException(status_code=403, detail="Invalid password")
        
    return UserResponseValidation(id=user.id, email=user.email)





@app.post("/signup", response_model=UserResponseValidation)
async def sign_up(user: UserValidation):
    new_user = UserDb()

    try:
        new_user.add(user)
        return UserResponseValidation(id=new_user.id, email=new_user.email)

    except IntegrityError:
        raise HTTPException(status_code=422, detail="Email must be unique")
