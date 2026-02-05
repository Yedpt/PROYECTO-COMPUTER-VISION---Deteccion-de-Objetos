from fastapi import APIRouter, UploadFile, File
from app.models.yolo_model import predict_image
from app.schemas.prediction import PredictionResponse

# 🆕 métricas globales
from app.services.global_analytics import global_analytics

# 🆕 websocket
from app.core.ws_manager import analytics_ws_manager

router = APIRouter(prefix="/predict", tags=["Inference"])


@router.post("/", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()

    # 1️⃣ inferencia
    detections = predict_image(image_bytes)

    # 2️⃣ adaptar detecciones a formato métricas
    # (mínimo necesario para analytics)
    metrics = []
    for d in detections:
        metrics.append({
            "class_name": d["class_name"],
            "impact": float(d.get("impact", 1.0))  # fallback seguro
        })

    # 3️⃣ registrar imagen en métricas globales
    global_analytics.register_image(metrics)

    # 4️⃣ notificar dashboards (CLAVE)
    await analytics_ws_manager.broadcast({
        "event": "analytics_updated",
        "type": "image"
    })

    # 5️⃣ respuesta normal
    return {
        "num_detections": len(detections),
        "detections": detections
    }
