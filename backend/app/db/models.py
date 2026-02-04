from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


# =========================
# 📊 ANALYSIS (1 ejecución)
# =========================
class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String, nullable=False)
    analysis_type = Column(String, default="video")  # video | image

    total_frames = Column(Integer)
    fps = Column(Float)
    duration = Column(Float)

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relaciones
    brands = relationship(
        "BrandMetric",
        back_populates="analysis",
        cascade="all, delete-orphan"
    )


# =========================
# 🏷️ MÉTRICAS POR MARCA
# =========================
class BrandMetric(Base):
    __tablename__ = "brand_metrics"

    id = Column(Integer, primary_key=True, index=True)

    analysis_id = Column(Integer, ForeignKey("analyses.id"))

    class_name = Column(String, index=True)

    detections = Column(Integer)
    frames = Column(Integer)

    time_seconds = Column(Float)
    percentage = Column(Float)

    impact = Column(String)  # ALTO | MEDIO | BAJO | RESIDUAL

    analysis = relationship("Analysis", back_populates="brands")
