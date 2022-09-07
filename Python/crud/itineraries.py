from crud.user import CrudBase
from db.validation import ItineraryValidation, UserValidation
from db.models import ItineraryDb, ItineraryItemDb
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from uuid import uuid4



class CrudItinerary(CrudBase):

    def add_itinerary(self,itinerary: ItineraryValidation):
        with Session(self.engine, expire_on_commit=False) as session:
            new_itinerary = ItineraryDb(name=itinerary.name, user_id=itinerary.user_id, created_datetime=datetime.utcnow(), start_datetime=itinerary.start_datetime, end_datetime=itinerary.end_datetime)
            session.add(new_itinerary)
            session.commit()
            session.refresh(new_itinerary)

            if itinerary.items:
                for i in itinerary.items:
                    new_item = ItineraryItemDb(itinerary_id=new_itinerary.id, start_datetime=i.start_datetime, end_datetime=i.end_datetime, description=i.description)
                    session.add(new_item)
            
            session.commit()
            

        return new_itinerary


    def list_itineraries_by_user_id(self, user_id):
        with Session(self.engine) as session:
            itineraries = session.query(ItineraryDb).filter(ItineraryDb.user_id == user_id).all()
        
        return itineraries
    
    def get_itinerary(self, itinerary_id):
        with Session(self.engine) as session:

            itinerary = session.query(ItineraryDb).get(itinerary_id)
            return itinerary

            # items = session.query(ItineraryItemDb).filter(ItineraryItemDb.id == itinerary_id)
            # # TODO: Construct a complete object/dictionary to return
        

    def get_itinerary_item(self, item_id):
        ...
