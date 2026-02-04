from sqlalchemy.orm import declarative_base
from app.core.database import Base
from app.db import models  # noqa


Base = declarative_base()
