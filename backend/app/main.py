from fastapi import FastAPI
from app.controllers.predict import router as predict_router
from app.controllers.predict_video import router as video_router
from app.controllers.stream import router as stream_router

app = FastAPI(
    title="Logo Detection API",
    description="YOLOv8 logo detection backend",
    version="1.0.0"
)

app.include_router(predict_router)
app.include_router(video_router)
app.include_router(stream_router)


