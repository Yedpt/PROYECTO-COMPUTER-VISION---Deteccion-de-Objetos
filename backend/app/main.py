from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.controllers.predict import router as predict_router
from app.controllers.predict_video import router as video_router
from app.controllers.stream import router as stream_router

from app.core.database import engine, Base   # 👈 AQUÍ ESTÁ LA CLAVE
from app.db import models  # ⚠️ NO borrar (registra los modelos)
from app.routes.analytics import router as analytics_router
from app.controllers.analytics_ws import router as analytics_ws_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Logo Detection API",
    description="YOLOv8 logo detection backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev
        "http://localhost",        # Nginx puerto 80
        "http://localhost:80",     # Nginx puerto 80 explícito
        "http://127.0.0.1",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)
app.include_router(video_router)
app.include_router(stream_router)
app.include_router(analytics_router)    
app.include_router(analytics_ws_router)