from email.policy import HTTP
from textwrap import indent
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.exc import IntegrityError
from crud.itineraries import CrudItinerary
from db.main import create_db_engine

from crud.user import CrudUser
from db.validation import ItineraryResponseValidation, ItineraryValidation, UserResponseValidation, UserValidation
from utils import ValidateSession, User




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
async def list_itinerary(user_id, engine=Depends(create_db_engine)):
    crud = CrudItinerary(engine)
    itineraries = crud.list_itineraries_by_user_id(user_id=user_id)
    

 


    if not user_id:
        raise HTTPException(status_code=403, detail="forbidden")

    return itineraries



@app.post("/itineraries/{user_id}", dependencies=[Depends(ValidateSession())], response_model=ItineraryResponseValidation)
async def add_itinerary(user_id, itinerary: ItineraryValidation, engine=Depends(create_db_engine)):
    itinerary.user_id = user_id
    crud = CrudItinerary(engine)

    new_itinerary = crud.add_itinerary(itinerary)
    

    try:
        return ItineraryResponseValidation(id=new_itinerary.id)
        
    except IntegrityError:
        raise HTTPException(status_code=404, detail="Network Error, Cannot Resolve")
    





@app.get("/itinerary/{itinerary_id}", dependencies=[Depends(ValidateSession())])
async def get_itinerary(itinerary_id, user=Depends(User), engine=Depends(create_db_engine)):
    crud = CrudItinerary(engine)
    not_found = HTTPException(status_code=404, detail="Itinerary Not Found")
    
    try:
        itinerary = crud.get_itinerary(itinerary_id=itinerary_id)


        if not itinerary:
            raise not_found

        elif itinerary['is_published']:
            return itinerary

        elif itinerary['user_id'] == user.user.id:
            return itinerary

        else:
            raise not_found

    except IntegrityError:
        raise HTTPException(status_code=404, detail="Itinerary Not Found")

@app.get("/itineraries", dependencies=[Depends(ValidateSession())])
async def get_itinerary(engine=Depends(create_db_engine)):
    crud = CrudItinerary(engine)
    #TODO return the list of PUBLISHED itineraries 
    # Will not return the items of the itineries