from sqlalchemy import create_engine

def create_db_engine():
    engine = create_engine("sqlite:///site.db")
    return engine