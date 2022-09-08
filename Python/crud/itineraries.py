from crud.user import CrudBase
from db.validation import ItineraryValidation
from db.models import ItineraryDb, ItineraryItemDb
from sqlalchemy.orm import Session
from datetime import datetime



class CrudItinerary(CrudBase):
    def add_itinerary(self,itinerary: ItineraryValidation):
        with Session(self.engine, expire_on_commit=False) as session:
            new_itinerary = ItineraryDb(name=itinerary.name, user_id=itinerary.user_id, created_datetime=datetime.utcnow(), start_datetime=itinerary.start_datetime, end_datetime=itinerary.end_datetime, is_published=itinerary.is_published)
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

    def list_published_itineraries(self, filter_published=True):
        with Session(self.engine) as session:

            published_itineraries = session.query(ItineraryDb).filter(ItineraryDb.is_published == filter_published).all()
        
        return published_itineraries

    
    def get_itinerary(self, itinerary_id):
        with Session(self.engine) as session:

            itinerary = session.query(ItineraryDb).get(itinerary_id)
            items = []

            if itinerary:
                items = session.query(ItineraryItemDb).filter(ItineraryItemDb.id == itinerary_id)
            
        return {**itinerary.__dict__, "items": [i.__dict__ for i in items]}

    def get_itinerary_items(self, itinerary_id):
        with Session(self.engine) as session:
            itinerary_list = session.query(ItineraryItemDb).filter(ItineraryItemDb.itinerary_id == itinerary_id).all()

            return itinerary_list
