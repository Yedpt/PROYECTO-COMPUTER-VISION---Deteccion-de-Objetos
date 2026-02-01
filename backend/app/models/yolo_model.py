from ultralytics import YOLO
import numpy as np
import cv2
from app.core.config import MODEL_PATH, CONF_THRESHOLD, IMG_SIZE, DEVICE
from pathlib import Path

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

    total_detections = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results = model(
            frame,
            conf=conf,
            iou=iou,
            imgsz=imgsz,
            verbose=False
        )

        total_detections += len(results[0].boxes)
        annotated_frame = results[0].plot()
        out.write(annotated_frame)

    cap.release()
    out.release()

    return total_detections