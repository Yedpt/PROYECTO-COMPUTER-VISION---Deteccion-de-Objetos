from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import cv2
from app.models.yolo_model import model

router = APIRouter(prefix="/stream", tags=["Streaming"])


def generate_frames(conf=0.25, iou=0.5):
    cap = cv2.VideoCapture(0)  # webcam

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        results = model(
            frame,
            conf=conf,
            iou=iou,
            imgsz=640,
            verbose=False
        )

        annotated_frame = results[0].plot()

        _, buffer = cv2.imencode(".jpg", annotated_frame)
        frame_bytes = buffer.tobytes()

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n"
        )

    cap.release()


@router.get("/webcam")
def stream_webcam():
    return StreamingResponse(
        generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )
