from fastapi import FastAPI
from app.controllers.predict import router as predict_router
from app.controllers.predict_video import router as video_router
from app.controllers.stream import router as stream_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Logo Detection API",
    description="YOLOv8 logo detection backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # frontend Vite
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)
app.include_router(video_router)
app.include_router(stream_router)


