from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from pathlib import Path
import shutil
import uuid

from app.models.yolo_model import predict_video
from app.db.session import get_db
from app.db.models import Analysis, BrandMetric
from app.core.ws_manager import analytics_ws_manager

router = APIRouter(prefix="/predict", tags=["Video"])

TEMP_INPUT = Path("temp/input")
TEMP_OUTPUT = Path("temp/output")

TEMP_INPUT.mkdir(parents=True, exist_ok=True)
TEMP_OUTPUT.mkdir(parents=True, exist_ok=True)


@router.post("/video")
async def predict_video_endpoint(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    video_uuid = uuid.uuid4().hex
    input_path = TEMP_INPUT / f"{video_uuid}_{file.filename}"
    output_path = TEMP_OUTPUT / f"{video_uuid}_output.mp4"

    # 1️⃣ Guardar vídeo temporal
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 2️⃣ Crear análisis
    analysis = Analysis(
        filename=file.filename,
        analysis_type="video"
    )
    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    # 3️⃣ Ejecutar inferencia (sync pesado → OK)
    try:
        result = predict_video(
            input_video=input_path,
            output_video=output_path
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # 4️⃣ Guardar metadatos
    analysis.total_frames = result["total_frames"]
    analysis.fps = result["fps"]
    analysis.duration = result["summary"]["video_duration"]
    db.commit()

    # 5️⃣ Guardar métricas por marca
    metrics_db = [
        BrandMetric(
            analysis_id=analysis.id,
            class_name=m["class_name"],
            detections=m["detections"],
            frames=m["frames"],
            time_seconds=m["time_seconds"],
            percentage=m["percentage"],
            impact=m["impact"]
        )
        for m in result.get("metrics", [])
    ]

    if metrics_db:
        db.add_all(metrics_db)
        db.commit()

    # 🔔 6️⃣ WebSocket broadcast (AHORA SÍ)
    await analytics_ws_manager.broadcast({
        "event": "analytics_updated",
        "analysis_id": analysis.id
    })

    # 7️⃣ Respuesta
    return {
        "message": "Video procesado correctamente",
        "analysis_id": analysis.id,
        "summary": result["summary"],
        "metrics": result["metrics"],
        "fps": result["fps"],
        "output_video": str(output_path),
    }
