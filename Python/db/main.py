from functools import cache
from sqlalchemy import create_engine
from functools import cache

@cache
def create_db_engine():
    engine = create_engine("sqlite:///site.db")
    return engine