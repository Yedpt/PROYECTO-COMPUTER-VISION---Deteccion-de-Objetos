from pathlib import Path

# backend/app/core/config.py
BASE_DIR = Path(__file__).resolve().parents[3]
# parents[3] = PROYECTO/

MODEL_PATH = (
    BASE_DIR
    / "yolo"
    / "training"
    / "logos_v15_stretch_640"
    / "weights"
    / "best.pt"
)

CONF_THRESHOLD = 0.4
IMG_SIZE = 640
DEVICE = "cpu"

print("MODEL PATH:", MODEL_PATH)
print("EXISTS:", MODEL_PATH.exists())
