from ultralytics import YOLO
import numpy as np
import cv2
from pathlib import Path
from collections import defaultdict

from app.core.config import settings


# -------------------------
# Cargar modelo YOLO
# -------------------------
model = YOLO(str(settings.MODEL_PATH))
CLASS_NAMES = model.names


# -------------------------
# IMAGE PREDICTION
# -------------------------
def predict_image(image_bytes: bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = model.predict(
        img,
        conf=settings.CONF_THRESHOLD,
        imgsz=settings.IMG_SIZE,
        device=settings.DEVICE,
        verbose=False
    )

    detections = []

    for r in results:
        for box in r.boxes:
            class_id = int(box.cls)
            detections.append({
                "class_id": class_id,
                "class_name": CLASS_NAMES[class_id],
                "confidence": float(box.conf),
                "bbox": box.xyxy[0].tolist()
            })

    return detections


# -------------------------
# VIDEO PREDICTION + METRICS
# -------------------------
def predict_video(
    input_video: Path,
    output_video: Path,
    conf: float = 0.25,
    iou: float = 0.5,
    imgsz: int = 640
):
    cap = cv2.VideoCapture(str(input_video))

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(
        str(output_video),
        fourcc,
        fps,
        (width, height)
    )

    total_frames = 0
    detections_per_class = defaultdict(int)
    frames_with_class = defaultdict(int)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        total_frames += 1

        results = model(
            frame,
            conf=conf,
            iou=iou,
            imgsz=imgsz,
            device=settings.DEVICE,
            verbose=False
        )

        classes_in_frame = set()

        for box in results[0].boxes:
            class_id = int(box.cls)
            detections_per_class[class_id] += 1
            classes_in_frame.add(class_id)

        for cid in classes_in_frame:
            frames_with_class[cid] += 1

        annotated_frame = results[0].plot()
        out.write(annotated_frame)

    cap.release()
    out.release()

    # -------------------------
    # 📊 MÉTRICAS PRO (filtradas)
    # -------------------------
    metrics = []
    MIN_PERCENTAGE = 5.0  # umbral mínimo de presencia

    for class_id, frame_count in frames_with_class.items():
        percentage = (frame_count / total_frames) * 100

        if percentage >= MIN_PERCENTAGE:
            time_seconds = frame_count / fps

            metrics.append({
                "class_name": CLASS_NAMES[class_id],
                "detections": detections_per_class[class_id],
                "frames": frame_count,
                "time_seconds": round(time_seconds, 2),
                "percentage": round(percentage, 2)
            })

    return {
        "total_frames": total_frames,
        "fps": fps,
        "metrics": metrics,
        "output_video": str(output_video)
    }
