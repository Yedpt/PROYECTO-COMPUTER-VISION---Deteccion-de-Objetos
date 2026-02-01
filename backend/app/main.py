from fastapi import FastAPI
from app.controllers.predict import router as predict_router

app = FastAPI(
    title="Logo Detection API",
    description="YOLOv8 logo detection backend",
    version="1.0.0"
)

app.include_router(predict_router)
