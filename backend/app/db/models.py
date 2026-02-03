from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True)
    filename = Column(String, nullable=False)
    duration = Column(Float)
    fps = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    detections = relationship("Detection", back_populates="video")


class Detection(Base):
    __tablename__ = "detections"

    id = Column(Integer, primary_key=True)
    video_id = Column(Integer, ForeignKey("videos.id"))

    class_name = Column(String, index=True)
    confidence = Column(Float)

    start_time = Column(Float)
    end_time = Column(Float)

    bbox_x1 = Column(Float)
    bbox_y1 = Column(Float)
    bbox_x2 = Column(Float)
    bbox_y2 = Column(Float)

    crop_path = Column(String)

    video = relationship("Video", back_populates="detections")
