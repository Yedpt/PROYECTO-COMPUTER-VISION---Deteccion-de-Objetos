from pydantic import BaseModel
from typing import List

class Detection(BaseModel):
    class_id: int
    class_name: str   # 👈 CLAVE
    confidence: float
    bbox: list

class PredictionResponse(BaseModel):
    num_detections: int
    detections: List[Detection]
