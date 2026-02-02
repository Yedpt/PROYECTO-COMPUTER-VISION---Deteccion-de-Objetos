from fastapi import APIRouter, Query
from fastapi.responses import StreamingResponse
import cv2
import time
from app.models.yolo_model import model

router = APIRouter(prefix="/stream", tags=["Streaming"])


def generate_frames(conf: float, iou: float, fps: int):
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        raise RuntimeError("No se pudo abrir la webcam")

    frame_delay = 1 / fps

    try:
        while True:
            start_time = time.time()

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
                b"Content-Type: image/jpeg\r\n\r\n"
                + frame_bytes
                + b"\r\n"
            )

            elapsed = time.time() - start_time
            sleep_time = frame_delay - elapsed
            if sleep_time > 0:
                time.sleep(sleep_time)

    except GeneratorExit:
        # El cliente cerró la conexión (frontend apagó la cámara)
        print("🔴 Stream detenido por el cliente")

    finally:
        cap.release()
        print("📷 Webcam liberada correctamente")


@router.get("/webcam")
def stream_webcam(
    conf: float = Query(0.25, ge=0.0, le=1.0),
    iou: float = Query(0.5, ge=0.0, le=1.0),
    fps: int = Query(15, ge=1, le=30),
):
    """
    MJPEG stream desde la webcam con YOLO.
    Parámetros:
    - conf: confianza mínima
    - iou: IOU
    - fps: frames por segundo
    """
    return StreamingResponse(
        generate_frames(conf, iou, fps),
        media_type="multipart/x-mixed-replace; boundary=frame",
    )
