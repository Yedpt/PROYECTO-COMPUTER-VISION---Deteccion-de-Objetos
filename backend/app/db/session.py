from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.database import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

