from ultralytics import YOLO
import numpy as np
import cv2
from app.core.config import MODEL_PATH, CONF_THRESHOLD, IMG_SIZE, DEVICE

model = YOLO(str(MODEL_PATH))

def predict_image(image_bytes: bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = model.predict(
        img,
        conf=CONF_THRESHOLD,
        imgsz=IMG_SIZE,
        device=DEVICE
    )

    detections = []

    for r in results:
        for box in r.boxes:
            detections.append({
                "class_id": int(box.cls),
                "confidence": float(box.conf),
                "bbox": box.xyxy[0].tolist()
            })

    return detections
