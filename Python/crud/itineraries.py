from crud.user import CrudBase
from db.validation import ItineraryValidation, UserValidation
from db.models import ItineraryDb, ItineraryItemDb
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from uuid import uuid4


class CrudItinerary(CrudBase):

    def add_itinerary(self,itinerary: ItineraryValidation):
        with Session(self.engine) as session:
            new_itinerary = ItineraryDb(name=itinerary.name, user_id=itinerary.user_id, starte_date=itinerary.start_date, end_date = itinerary.end_date)
            session.add(new_itinerary)
            session.commit()
            session.refresh(new_itinerary)
        return new_itinerary



    def list_itineraries_by_user_id(self, user_id):
        with Session(self.engine) as session:
            itineraries = session.query(ItineraryDb).filter(ItineraryDb.user_id == user_id)
        
        return itineraries
    
    def get_itinerary(self, itinerary_id):
        with Session(self.engine) as session:
            itinerary = session.query(ItineraryDb).filter(ItineraryDb.id == itinerary_id).first()

            items = session.query(ItineraryItemDb).filter(ItineraryItemDb.id == itinerary_id)
            # TODO: Construct a complete object/dictionary to return
        

    def get_itinerary_item(self, item_id):
        ...
