from fastapi import APIRouter, UploadFile, File
from app.models.yolo_model import predict_image
from app.schemas.prediction import PredictionResponse

router = APIRouter(prefix="/predict", tags=["Inference"])

@router.post("/", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    detections = predict_image(image_bytes)

    return {
        "num_detections": len(detections),
        "detections": detections
    }
