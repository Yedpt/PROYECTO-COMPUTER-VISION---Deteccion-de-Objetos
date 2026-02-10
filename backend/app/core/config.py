from pathlib import Path
from pydantic_settings import BaseSettings
import torch
import os


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://logouser:logopass@localhost:5432/logo_detection"
    MODEL_PATH: str = "/models/best.pt"
    CONF_THRESHOLD: float = 0.4
    IMG_SIZE: int = 640
    DEVICE: str = "cpu"

    class Config:
        env_file = ".env"


settings = Settings()

# Para desarrollo local (sin Docker)
if not Path(settings.MODEL_PATH).exists():
    BASE_DIR = Path(__file__).resolve().parents[3]
    local_model = BASE_DIR / "yolo" / "training" / "logos_v15_stretch_640" / "weights" / "best.pt"
    if local_model.exists():
        settings.MODEL_PATH = str(local_model)

CONF_THRESHOLD = settings.CONF_THRESHOLD
IMG_SIZE = settings.IMG_SIZE
DEVICE = settings.DEVICE
MODEL_PATH = Path(settings.MODEL_PATH)

print("🔍 MODEL PATH:", MODEL_PATH)
print("✅ EXISTS:" if MODEL_PATH.exists() else "❌ NOT FOUND:", MODEL_PATH.exists())
