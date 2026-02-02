from fastapi import APIRouter, UploadFile, File
from pathlib import Path
import shutil
import uuid

from app.models.yolo_model import predict_video

router = APIRouter(prefix="/predict", tags=["Video"])

TEMP_INPUT = Path("temp/input")
TEMP_OUTPUT = Path("temp/output")

TEMP_INPUT.mkdir(parents=True, exist_ok=True)
TEMP_OUTPUT.mkdir(parents=True, exist_ok=True)


@router.post("/video")
def predict_video_endpoint(file: UploadFile = File(...)):
    video_id = uuid.uuid4().hex

    input_path = TEMP_INPUT / f"{video_id}_{file.filename}"
    output_path = TEMP_OUTPUT / f"{video_id}_output.mp4"

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = predict_video(
        input_video=input_path,
        output_video=output_path
    )

    return {
        "message": "Video procesado correctamente",
        **result
    }
