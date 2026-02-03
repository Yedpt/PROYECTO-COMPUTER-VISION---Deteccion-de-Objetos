import os
import cv2
import uuid
from app.db.session import SessionLocal
from app.db.models import Video, Detection

CROP_DIR = "app/storage/crops"
os.makedirs(CROP_DIR, exist_ok=True)


def save_video(filename, duration, fps):
    db = SessionLocal()
    video = Video(
        filename=filename,
        duration=duration,
        fps=fps
    )
    db.add(video)
    db.commit()
    db.refresh(video)
    db.close()
    return video.id


def save_detection(video_id, frame, bbox, class_name, confidence, start, end):
    x1, y1, x2, y2 = map(int, bbox)

    crop = frame[y1:y2, x1:x2]
    crop_name = f"{uuid.uuid4()}.jpg"
    crop_path = os.path.join(CROP_DIR, crop_name)

    cv2.imwrite(crop_path, crop)

    db = SessionLocal()
    detection = Detection(
        video_id=video_id,
        class_name=class_name,
        confidence=confidence,
        start_time=start,
        end_time=end,
        bbox_x1=x1,
        bbox_y1=y1,
        bbox_x2=x2,
        bbox_y2=y2,
        crop_path=crop_path
    )
    db.add(detection)
    db.commit()
    db.close()
