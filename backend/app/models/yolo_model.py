from ultralytics import YOLO
import numpy as np
import cv2
from app.core.config import MODEL_PATH, CONF_THRESHOLD, IMG_SIZE, DEVICE
from pathlib import Path
from collections import defaultdict

model = YOLO(str(MODEL_PATH))
CLASS_NAMES = model.names


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
            class_id = int(box.cls)
            detections.append({
                "class_id": class_id,
                "class_name": CLASS_NAMES[class_id],
                "confidence": float(box.conf),
                "bbox": box.xyxy[0].tolist()
            })

    return detections


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

    # 📊 construir métricas PRO
    metrics = []
    for class_id, frame_count in frames_with_class.items():
        time_seconds = frame_count / fps
        percentage = (frame_count / total_frames) * 100

        MIN_PERCENTAGE = 5.0  # 👈 umbral mínimo de presencia

        if percentage >= MIN_PERCENTAGE:
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
