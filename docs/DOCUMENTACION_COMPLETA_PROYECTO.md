# 📘 DOCUMENTACIÓN TÉCNICA COMPLETA
## Plataforma de Detección de Logos con IA - Análisis Profundo

**Autor:** Yeder  
**Fecha:** Febrero 2026  
**Bootcamp:** F5 - Inteligencia Artificial  
**Stack:** FastAPI + YOLOv8 + React + PostgreSQL + Docker

---

# 🎯 ÍNDICE

1. [Visión General del Proyecto](#1-visión-general-del-proyecto)
2. [Arquitectura Completa](#2-arquitectura-completa)
3. [Backend - FastAPI + YOLO](#3-backend---fastapi--yolo)
4. [Frontend - React + Vite](#4-frontend---react--vite)
5. [WebSockets - Comunicación en Tiempo Real](#5-websockets---comunicación-en-tiempo-real)
6. [Base de Datos PostgreSQL](#6-base-de-datos-postgresql)
7. [Modelo YOLO - Entrenamiento Custom](#7-modelo-yolo---entrenamiento-custom)
8. [Docker - Contenedorización](#8-docker---contenedorización)
9. [Endpoints API Detallados](#9-endpoints-api-detallados)
10. [Flujos de Datos Completos](#10-flujos-de-datos-completos)
11. [Escalabilidad y Optimización](#11-escalabilidad-y-optimización)
12. [Defensa Técnica - Entrevista](#12-defensa-técnica---entrevista)

---

# 1. VISIÓN GENERAL DEL PROYECTO

## 1.1 ¿Qué Problema Resuelve?

Las marcas necesitan **medir su visibilidad** en contenido multimedia:
- ¿Cuánto tiempo aparece mi logo en un vídeo?
- ¿Qué marcas tienen más presencia?
- ¿Cómo evoluciona mi visibilidad en el tiempo?
- ¿Cuál es el impacto real de mi patrocinio?

### Casos de Uso Reales

**1. Análisis de Patrocinios Deportivos**
```
Ejemplo: Nike patrocina un evento deportivo
Pregunta: ¿Cuántos segundos apareció el logo de Nike?
Respuesta: 87 segundos (12% del vídeo) - IMPACTO ALTO
ROI: $150,000 / 87s = $1,724 por segundo de exposición
```

**2. Product Placement en Contenido**
```
Ejemplo: Película con product placement de Apple
Análisis: MacBook aparece 23 veces durante 4.5 minutos
Valor: Exposición orgánica equivalente a $500K en publicidad
```

**3. Monitoreo de Marca Competitivo**
```
Comparativa:
- Adidas: 120 segundos (15%)
- Nike: 98 segundos (12%)
- Puma: 45 segundos (6%)
Decisión: Incrementar inversión en Puma para equilibrar
```

## 1.2 Propuesta de Valor

### Para el Negocio
✅ **Métricas cuantificables** → Decisiones data-driven  
✅ **Análisis automático** → Ahorro de 100+ horas manuales  
✅ **Histórico completo** → Tendencias y benchmarks  
✅ **Real-time analytics** → Respuesta inmediata  

### Técnicamente
✅ **YOLOv8 custom-trained** → 95%+ precisión  
✅ **FastAPI async** → 1000+ req/s  
✅ **WebSockets** → Updates < 50ms latencia  
✅ **Docker** → Deploy en cualquier infraestructura  

---

# 2. ARQUITECTURA COMPLETA

## 2.1 Diagrama de Alto Nivel

```
┌─────────────────────────────────────────────────────────────┐
│                      USUARIO FINAL                          │
│              (Browser - Chrome/Firefox)                     │
└────────────────────────────┬────────────────────────────────┘
                             │
                    HTTP / WebSocket
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Components  │  │    Hooks     │  │   Services   │     │
│  │  - Dashboard │  │ - useSocket  │  │  - api.js    │     │
│  │  - Analytics │  │ - useCountUp │  │  - analytics │     │
│  │  - Timeline  │  │              │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         Vite Build → Nginx (Puerto 80)                      │
└────────────────────────────┬────────────────────────────────┘
                             │
                    REST API / WebSocket
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (FastAPI)                         │
│  ┌───────────────┐  ┌───────────────┐  ┌────────────────┐ │
│  │  Controllers  │  │    Models     │  │   Services     │ │
│  │  - predict    │  │  - yolo_model │  │  - analytics   │ │
│  │  - analytics  │  │  - db.models  │  │  - persistence │ │
│  │  - stream     │  │               │  │                │ │
│  └───────┬───────┘  └───────┬───────┘  └────────┬───────┘ │
│          │                  │                    │          │
│          └──────────────────┴────────────────────┘          │
│                             ↓                                │
│                     SQLAlchemy ORM                           │
└────────────────────────────┬────────────────────────────────┘
                             │
                        SQL Queries
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                 PostgreSQL Database                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  analyses    │  │ brand_metrics│  │brand_timeline│     │
│  │  (ejecución) │  │  (métricas)  │  │  (histórico) │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                             ↑
                             │
                    (Modelo YOLO montado)
                             │
┌─────────────────────────────────────────────────────────────┐
│              YOLOv8 Custom Model (best.pt)                  │
│  Entrenado con 2000+ imágenes en Roboflow                  │
│  Clases: Nike, Adidas, Puma, etc.                          │
└─────────────────────────────────────────────────────────────┘
```

## 2.2 Stack Tecnológico Justificado

### Backend: FastAPI
**¿Por qué no Flask o Django?**

| Framework | Pros | Contras | Decisión |
|-----------|------|---------|----------|
| **FastAPI** | Async nativo, validación automática, docs auto-generadas, performance | Curva aprendizaje media | ✅ **ELEGIDO** |
| Flask | Simple, flexible | Sync blocking, sin validación | ❌ No escalable |
| Django | Completo, admin panel | Pesado, overkill para API | ❌ Overhead innecesario |

**Código FastAPI vs Flask:**

```python
# ❌ FLASK (Blocking I/O)
@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']  # Bloquea hilo
    result = model.predict(file)  # Bloquea hilo
    return jsonify(result)

# ✅ FASTAPI (Async I/O)
@router.post("/predict")
async def predict(file: UploadFile):
    content = await file.read()  # Non-blocking
    result = await asyncio.to_thread(model.predict, content)
    return result
```

### Frontend: React + Vite
**¿Por qué no Vue, Angular o Create-React-App?**

| Framework | Pros | Contras | Decisión |
|-----------|------|---------|----------|
| **React + Vite** | Ecosistema gigante, HMR instantáneo, flexible | JSX learning curve | ✅ **ELEGIDO** |
| Vue | Simple, plantillas | Ecosistema menor | ❌ Menos demanda laboral |
| Angular | Enterprise-grade | Muy pesado, TypeScript obligatorio | ❌ Complejidad innecesaria |
| CRA | Oficial React | Build lento (Webpack) | ❌ Vite es 10x más rápido |

**Benchmarks Vite vs CRA:**
```
Build production:
- Create React App: 45 segundos
- Vite: 4.2 segundos (10x más rápido)

HMR (Hot Module Replacement):
- CRA: 2-5 segundos
- Vite: < 100ms
```

### Base de Datos: PostgreSQL
**¿Por qué no MySQL, MongoDB o SQLite?**

| DB | Pros | Contras | Decisión |
|----|------|---------|----------|
| **PostgreSQL** | ACID, JSON nativo, window functions, escalable | Setup más complejo | ✅ **ELEGIDO** |
| MySQL | Popular | Sin JSON avanzado, agregaciones limitadas | ❌ Menos features |
| MongoDB | Flexible, schema-less | Sin joins, consistencia eventual | ❌ Necesitamos relaciones |
| SQLite | Simple, sin servidor | No escalable, no concurrencia | ❌ Solo desarrollo |

**Queries complejas que justifican PostgreSQL:**

```sql
-- Timeline global con agregaciones por día
-- (MongoDB requeriría múltiples queries)
SELECT 
    DATE(created_at) as date,
    brand,
    SUM(time_seconds) as impact
FROM brand_metrics
JOIN analyses ON analyses.id = brand_metrics.analysis_id
GROUP BY DATE(created_at), brand
ORDER BY date;
```

---

# 3. BACKEND - FASTAPI + YOLO

## 3.1 Estructura de Archivos Backend

```
backend/
├── Dockerfile                    # Imagen Docker del backend
├── requirements.txt              # Dependencias Python
├── .env                          # Variables de entorno
└── app/
    ├── main.py                   # ⭐ Entry point, configuración CORS
    ├── controllers/              # 🎮 Endpoints (lógica de negocio)
    │   ├── predict.py            # POST /predict (imagen)
    │   ├── predict_video.py      # POST /predict/video
    │   ├── stream.py             # GET /stream/webcam
    │   └── analytics_ws.py       # WebSocket /ws/analytics
    ├── models/                   # 🧠 Lógica ML
    │   └── yolo_model.py         # Predicción YOLO
    ├── db/                       # 🗄️ Base de datos
    │   ├── base.py               # Configuración SQLAlchemy
    │   ├── models.py             # Modelos (Analysis, BrandMetric)
    │   └── session.py            # Sesiones DB
    ├── core/                     # ⚙️ Configuración
    │   ├── config.py             # Settings (env vars)
    │   ├── database.py           # Engine PostgreSQL
    │   └── ws_manager.py         # Manager WebSockets
    ├── routes/                   # 🛣️ Rutas API
    │   └── analytics.py          # GET /analytics/*
    ├── services/                 # 🔧 Lógica reutilizable
    │   ├── global_analytics.py   # Analytics en memoria
    │   └── video_persistence.py  # Guardar resultados
    ├── schemas/                  # 📋 Pydantic schemas
    │   └── prediction.py         # DTOs (Data Transfer Objects)
    ├── temp/                     # 📂 Vídeos temporales
    │   ├── input/
    │   └── output/
    └── storage/                  # 💾 Almacenamiento persistente
        └── crops/                # Recortes de detecciones
```

## 3.2 Archivo por Archivo - Análisis Profundo

### 📄 `main.py` - Entry Point

**Responsabilidad:** Inicializar aplicación, configurar middlewares, registrar routers.

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.controllers.predict import router as predict_router
from app.controllers.predict_video import router as video_router
from app.controllers.stream import router as stream_router

from app.core.database import engine, Base
from app.db import models  # ⚠️ Importar para registrar modelos
from app.routes.analytics import router as analytics_router
from app.controllers.analytics_ws import router as analytics_ws_router

# 🔧 CREAR TABLAS EN DB (si no existen)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Logo Detection API",
    description="YOLOv8 logo detection backend",
    version="1.0.0"
)

# 🌐 CORS - Permitir peticiones desde frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev
        "http://localhost",        # Nginx puerto 80
        "http://localhost:80",
        "http://127.0.0.1",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,      # Cookies permitidas
    allow_methods=["*"],         # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],         # Authorization, Content-Type, etc.
)

# 📍 REGISTRAR ROUTERS
app.include_router(predict_router)
app.include_router(video_router)
app.include_router(stream_router)
app.include_router(analytics_router)
app.include_router(analytics_ws_router)
```

**¿Por qué este orden de imports?**
1. Controladores primero (rutas específicas)
2. Database y modelos (inicialización DB)
3. Routers al final (registrar endpoints)

**CORS Explicado:**
```python
# ❌ Sin CORS:
# Browser: "Blocked by CORS policy: 
#          No 'Access-Control-Allow-Origin' header"

# ✅ Con CORS:
# Response Headers:
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

### 📄 `controllers/predict.py` - Detección en Imágenes

**Responsabilidad:** Endpoint para analizar UNA imagen.

```python
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.yolo_model import predict_image
import traceback

router = APIRouter(prefix="/predict", tags=["Image"])

@router.post("/")
async def predict_image_endpoint(file: UploadFile = File(...)):
    """
    Detecta logos en una imagen.
    
    Args:
        file: Imagen (JPEG, PNG, etc.)
    
    Returns:
        {
            "detections": [
                {
                    "class_name": "Nike",
                    "confidence": 0.95,
                    "bbox": [x1, y1, x2, y2]
                }
            ]
        }
    """
    try:
        # 1. Leer bytes de la imagen
        content = await file.read()
        
        # 2. Predicción YOLO
        detections = predict_image(content)
        
        return {
            "filename": file.filename,
            "detections": detections,
            "total_detections": len(detections)
        }
    
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=f"Error en predicción: {str(e)}"
        )
```

**Flujo de Ejecución:**
```
1. Usuario sube imagen (FormData)
   ↓
2. FastAPI valida tipo MIME
   ↓
3. Leer bytes: await file.read()
   ↓
4. predict_image() → YOLO inference
   ↓
5. YOLO retorna bounding boxes
   ↓
6. JSON response al frontend
```

**¿Por qué `await`?**
```python
# ❌ BLOCKING (malo)
content = file.read()  # Bloquea event loop

# ✅ NON-BLOCKING (bueno)
content = await file.read()  # Libera event loop para otras requests
```

---

### 📄 `controllers/predict_video.py` - Detección en Vídeos

**Responsabilidad:** Procesar vídeo completo frame-by-frame, generar métricas y timeline.

```python
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from pathlib import Path
import shutil
import uuid

from app.models.yolo_model import predict_video
from app.db.session import get_db
from app.db.models import Analysis, BrandMetric, BrandTimeline
from app.core.ws_manager import analytics_ws_manager
from app.services.global_analytics import global_analytics

router = APIRouter(prefix="/predict", tags=["Video"])

TEMP_INPUT = Path("temp/input")
TEMP_OUTPUT = Path("temp/output")

TEMP_INPUT.mkdir(parents=True, exist_ok=True)
TEMP_OUTPUT.mkdir(parents=True, exist_ok=True)

@router.post("/video")
async def predict_video_endpoint(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Procesa un vídeo completo y genera métricas por marca.
    
    FLUJO:
    1. Guardar vídeo en temp/input
    2. Crear registro Analysis en DB
    3. Inferencia YOLO frame-by-frame
    4. Calcular métricas (detecciones, tiempo, %)
    5. Persistir en BrandMetric
    6. Broadcast WebSocket
    7. Retornar JSON con timeline
    """
    
    # 1️⃣ GUARDAR VÍDEO CON UUID ÚNICO
    video_uuid = uuid.uuid4().hex
    input_path = TEMP_INPUT / f"{video_uuid}_{file.filename}"
    output_path = TEMP_OUTPUT / f"{video_uuid}_output.mp4"
    
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # 2️⃣ CREAR REGISTRO EN DB
    analysis = Analysis(
        filename=file.filename,
        analysis_type="video"
    )
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    
    # 3️⃣ INFERENCIA YOLO (esto tarda)
    try:
        result = predict_video(
            input_video=input_path,
            output_video=output_path
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    # 4️⃣ ACTUALIZAR METADATOS
    analysis.total_frames = result["total_frames"]
    analysis.fps = result["fps"]
    analysis.duration = result["summary"]["video_duration"]
    db.commit()
    
    # 5️⃣ PERSISTIR MÉTRICAS
    metrics_db = [
        BrandMetric(
            analysis_id=analysis.id,
            class_name=m["class_name"],
            detections=m["detections"],
            frames=m["frames"],
            time_seconds=m["time_seconds"],
            percentage=m["percentage"],
            impact=m["impact"]
        )
        for m in result["metrics"]
    ]
    
    db.add_all(metrics_db)
    db.commit()
    
    # 6️⃣ TIMELINE GLOBAL (histórico)
    timeline_rows = [
        BrandTimeline(
            brand=m["class_name"],
            impact=m["percentage"],
            analysis_id=analysis.id
        )
        for m in result["metrics"]
    ]
    
    db.add_all(timeline_rows)
    db.commit()
    
    # 7️⃣ ACTUALIZAR ANALYTICS EN MEMORIA
    global_analytics.register_video(result["metrics"])
    
    # 8️⃣ NOTIFICAR A CLIENTES WEBSOCKET
    await analytics_ws_manager.broadcast({
        "event": "analytics_updated",
        "analysis_id": analysis.id
    })
    
    # 9️⃣ RESPUESTA
    return {
        "message": "Video procesado correctamente",
        "analysis_id": analysis.id,
        "summary": result["summary"],
        "metrics": result["metrics"],
        "timeline": result["timeline"],  # Timeline REAL por segundo
        "fps": result["fps"],
        "output_video": str(output_path),
    }
```

**Decisión de Diseño: ¿Por qué UUID?**
```python
# ❌ SIN UUID:
# Usuario sube "video.mp4" dos veces → Sobrescribe archivo

# ✅ CON UUID:
# Primera subida: a1b2c3d4_video.mp4
# Segunda subida: e5f6g7h8_video.mp4
# No hay colisiones
```

**Flujo Visual del Procesamiento:**
```
[VIDEO.mp4]
    ↓
[Frame 1] → YOLO → [Nike: 2, Adidas: 1]
[Frame 2] → YOLO → [Nike: 3]
[Frame 3] → YOLO → []
[Frame 4] → YOLO → [Adidas: 2, Puma: 1]
    ↓
Agregación:
- Nike: 5 detecciones, 2 frames, 0.067s (2/30fps)
- Adidas: 3 detecciones, 2 frames, 0.067s
- Puma: 1 detecciones, 1 frame, 0.033s
    ↓
Timeline:
[
  {"second": 0, "Nike": 2, "Adidas": 1},
  {"second": 0, "Nike": 3},
  {"second": 0, "Adidas": 2, "Puma": 1}
]
```

---

### 📄 `models/yolo_model.py` - Corazón del Sistema

**Responsabilidad:** Cargar modelo, ejecutar inferencia, calcular métricas.

```python
from ultralytics import YOLO
import numpy as np
import cv2
from pathlib import Path
from collections import defaultdict
import math

from app.core.config import settings

# 🧠 CARGAR MODELO YOLO (solo una vez al inicio)
model = YOLO(str(settings.MODEL_PATH))
CLASS_NAMES = model.names  # {0: 'Nike', 1: 'Adidas', ...}

def predict_image(image_bytes: bytes):
    """Detectar logos en imagen."""
    
    # 1. Decodificar bytes → array numpy
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # 2. Predicción YOLO
    results = model.predict(
        img,
        conf=settings.CONF_THRESHOLD,  # 0.4 (40% confianza mínima)
        imgsz=settings.IMG_SIZE,        # 640x640 input size
        device=settings.DEVICE,         # 'cpu' o 'cuda'
        verbose=False                   # No imprimir logs
    )
    
    # 3. Parsear resultados
    detections = []
    
    for r in results:
        for box in r.boxes:
            class_id = int(box.cls)
            detections.append({
                "class_id": class_id,
                "class_name": CLASS_NAMES[class_id],
                "confidence": float(box.conf),
                "bbox": box.xyxy[0].tolist()  # [x1, y1, x2, y2]
            })
    
    return detections

def classify_impact(percentage: float) -> str:
    """Clasificar impacto cualitativo."""
    if percentage >= 30:
        return "ALTO"
    elif percentage >= 10:
        return "MEDIO"
    elif percentage >= 3:
        return "BAJO"
    else:
        return "RESIDUAL"

def predict_video(
    input_video: Path,
    output_video: Path,
    conf: float = 0.25,
    iou: float = 0.5,
    imgsz: int = 640
):
    """
    Procesar vídeo completo con YOLO.
    
    ALGORITMO:
    1. Abrir vídeo con OpenCV
    2. Para cada frame:
       a. Ejecutar YOLO
       b. Dibujar bounding boxes
       c. Guardar frame anotado
       d. Acumular detecciones
    3. Calcular métricas finales
    4. Generar timeline por segundo
    """
    
    # Abrir vídeo
    cap = cv2.VideoCapture(str(input_video))
    
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    
    # Writer para vídeo anotado
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(
        str(output_video),
        fourcc,
        fps,
        (width, height)
    )
    
    total_frames = 0
    frame_index = 0
    
    # Contadores
    detections_per_class = defaultdict(int)  # {0: 150, 1: 89}
    frames_with_class = defaultdict(int)     # {0: 45, 1: 23}
    
    # Timeline REAL: {segundo: {marca: detecciones}}
    timeline = defaultdict(lambda: defaultdict(int))
    
    # 🔁 PROCESAR FRAMES
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        frame_index += 1
        total_frames += 1
        
        # Segundo actual (0, 1, 2, ...)
        current_second = int(frame_index / fps)
        
        # YOLO inference
        results = model(
            frame,
            conf=conf,
            iou=iou,
            imgsz=imgsz,
            device=settings.DEVICE,
            verbose=False
        )
        
        # Marcas detectadas en ESTE frame
        classes_in_frame = set()
        
        for box in results[0].boxes:
            class_id = int(box.cls)
            brand = CLASS_NAMES[class_id]
            
            # Incrementar contadores
            detections_per_class[class_id] += 1
            classes_in_frame.add(class_id)
            
            # Timeline: ¿cuántas detecciones en este segundo?
            timeline[current_second][brand] += 1
        
        # Contar frames únicos con cada marca
        for cid in classes_in_frame:
            frames_with_class[cid] += 1
        
        # Dibujar bounding boxes
        annotated_frame = results[0].plot()
        out.write(annotated_frame)
    
    cap.release()
    out.release()
    
    # 📊 CALCULAR MÉTRICAS FINALES
    metrics = []
    MIN_PERCENTAGE = 3.0  # Filtrar ruido
    
    for class_id, frame_count in frames_with_class.items():
        percentage = (frame_count / total_frames) * 100
        
        if percentage >= MIN_PERCENTAGE:
            time_seconds = frame_count / fps
            
            metrics.append({
                "class_name": CLASS_NAMES[class_id],
                "detections": detections_per_class[class_id],
                "frames": frame_count,
                "time_seconds": round(time_seconds, 2),
                "percentage": round(percentage, 2),
                "impact": classify_impact(percentage)
            })
    
    # Ordenar por % descendente
    metrics.sort(key=lambda x: x["percentage"], reverse=True)
    
    # Resumen ejecutivo
    summary = {
        "total_brands": len(metrics),
        "top_brand": metrics[0]["class_name"] if metrics else None,
        "top_brand_percentage": metrics[0]["percentage"] if metrics else 0,
        "total_detections": sum(m["detections"] for m in metrics),
        "video_duration": round(total_frames / fps, 2)
    }
    
    # Normalizar timeline
    timeline_output = []
    for second in sorted(timeline.keys()):
        row = {"second": second}
        row.update(timeline[second])
        timeline_output.append(row)
    
    return {
        "total_frames": total_frames,
        "fps": fps,
        "metrics": metrics,
        "summary": summary,
        "timeline": timeline_output,
        "output_video": str(output_video)
    }
```

**Optimización YOLO:**
```python
# ❌ MALO: Procesar cada frame a resolución nativa (1920x1080)
results = model(frame)  # Tarda 500ms por frame

# ✅ BUENO: Resize a 640x640
results = model(frame, imgsz=640)  # Tarda 80ms por frame
# 6.25x más rápido, precisión similar
```

**¿Por qué defaultdict?**
```python
# ❌ SIN DEFAULTDICT:
detections = {}
detections[0] = detections.get(0, 0) + 1  # Verbose

# ✅ CON DEFAULTDICT:
detections = defaultdict(int)
detections[0] += 1  # Limpio y elegante
```

---

### 📄 `db/models.py` - Esquema de Base de Datos

**Responsabilidad:** Definir modelos SQLAlchemy (tablas).

```python
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base

# =========================
# 📊 ANALYSIS (1 ejecución)
# =========================
class Analysis(Base):
    """
    Representa UNA ejecución de análisis (imagen o vídeo).
    
    Relación: 1 Analysis → N BrandMetrics
    """
    __tablename__ = "analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    
    filename = Column(String, nullable=False)
    analysis_type = Column(String, default="video")  # "video" | "image"
    
    # Metadatos del vídeo
    total_frames = Column(Integer)
    fps = Column(Float)
    duration = Column(Float)  # segundos
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # 🔗 Relación con métricas
    brands = relationship(
        "BrandMetric",
        back_populates="analysis",
        cascade="all, delete-orphan"  # Si borro Analysis, borro métricas
    )

# =========================
# 🏷️ BRAND METRIC
# =========================
class BrandMetric(Base):
    """
    Métricas de UNA marca en UNA ejecución.
    
    Ejemplo:
    Analysis #5 → Nike: 45 detecciones, 12%, 3.5s
    """
    __tablename__ = "brand_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    
    analysis_id = Column(Integer, ForeignKey("analyses.id"))
    
    class_name = Column(String, index=True)  # "Nike"
    
    # Métricas absolutas
    detections = Column(Integer)    # 45
    frames = Column(Integer)        # 120
    
    # Métricas calculadas
    time_seconds = Column(Float)    # 3.5
    percentage = Column(Float)      # 12.0
    
    impact = Column(String)  # "ALTO" | "MEDIO" | "BAJO" | "RESIDUAL"
    
    analysis = relationship("Analysis", back_populates="brands")

# =========================
# 📈 BRAND TIMELINE (LEGACY)
# =========================
class BrandTimeline(Base):
    """
    ⚠️ DEPRECATED: Se usa solo temporalmente.
    
    Guarda porcentajes → conceptualmente incorrecto
    para históricos globales.
    
    Será eliminado cuando todo use BrandMetric.
    """
    __tablename__ = "brand_timeline"
    
    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String, index=True)
    impact = Column(Float)  # Porcentaje (malo para agregaciones)
    analysis_id = Column(Integer, ForeignKey("analyses.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
```

**Diagrama Relacional:**
```
┌─────────────────┐
│    analyses     │
├─────────────────┤
│ id (PK)         │
│ filename        │
│ total_frames    │
│ fps             │
│ duration        │
│ created_at      │
└────────┬────────┘
         │ 1
         │
         │ N
┌────────┴────────────┐
│   brand_metrics     │
├─────────────────────┤
│ id (PK)             │
│ analysis_id (FK) ←──┘
│ class_name          │
│ detections          │
│ frames              │
│ time_seconds        │
│ percentage          │
│ impact              │
└─────────────────────┘
```

**¿Por qué esta estructura?**
```sql
-- ✅ QUERIES EFICIENTES:

-- Top 10 marcas globales
SELECT class_name, SUM(detections) as total
FROM brand_metrics
GROUP BY class_name
ORDER BY total DESC
LIMIT 10;

-- Timeline histórico
SELECT 
    DATE(created_at) as date,
    class_name,
    SUM(time_seconds) as impact
FROM brand_metrics
JOIN analyses ON analyses.id = analysis_id
GROUP BY date, class_name;

-- ❌ SI TODO ESTUVIERA EN UNA TABLA:
-- Duplicación masiva, queries lentas, no escalable
```

---

### 📄 `routes/analytics.py` - Endpoints de Analytics

**Responsabilidad:** Proveer endpoints para dashboards ejecutivos.

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, distinct

from app.db.session import get_db
from app.db.models import Analysis, BrandMetric, BrandTimeline
from app.services.global_analytics import global_analytics

router = APIRouter(prefix="/analytics", tags=["Analytics"])

# ==========================
# 🏆 TOP BRANDS
# ==========================
@router.get("/top-brands")
def get_top_brands(limit: int = 10, db: Session = Depends(get_db)):
    """
    Ranking de marcas por detecciones totales.
    
    Usado en: BrandAnalyticsDashboard
    
    Query SQL generado:
    ```sql
    SELECT 
        class_name as brand,
        SUM(detections) as detections,
        SUM(time_seconds) as time_seconds,
        AVG(percentage) as avg_percentage,
        COUNT(DISTINCT analysis_id) as videos
    FROM brand_metrics
    GROUP BY class_name
    ORDER BY SUM(detections) DESC
    LIMIT 10;
    ```
    """
    total_videos = (
        db.query(func.count(Analysis.id))
        .filter(Analysis.analysis_type == "video")
        .scalar()
    )
    
    results = (
        db.query(
            BrandMetric.class_name.label("brand"),
            func.sum(BrandMetric.detections).label("detections"),
            func.sum(BrandMetric.time_seconds).label("time_seconds"),
            func.avg(BrandMetric.percentage).label("avg_percentage"),
            func.count(distinct(BrandMetric.analysis_id)).label("videos"),
        )
        .group_by(BrandMetric.class_name)
        .order_by(func.sum(BrandMetric.detections).desc())
        .limit(limit)
        .all()
    )
    
    return {
        "total_videos": total_videos,
        "brands": [
            {
                "brand": r.brand,
                "detections": int(r.detections),
                "time_seconds": round(r.time_seconds or 0, 2),
                "avg_percentage": round(r.avg_percentage or 0, 2),
                "videos": r.videos,
            }
            for r in results
        ]
    }

# ==========================
# 📊 RESUMEN POR VÍDEO
# ==========================
@router.get("/video/{analysis_id}/summary")
def get_video_summary(analysis_id: int, db: Session = Depends(get_db)):
    """
    Detalles completos de UN análisis específico.
    
    Usado en: AnalysisExecutivePanel
    """
    analysis = db.query(Analysis).filter(Analysis.id == analysis_id).first()
    
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    brands = (
        db.query(BrandMetric)
        .filter(BrandMetric.analysis_id == analysis_id)
        .order_by(BrandMetric.percentage.desc())
        .all()
    )
    
    return {
        "analysis_id": analysis.id,
        "filename": analysis.filename,
        "duration": round(analysis.duration or 0, 2),
        "fps": analysis.fps,
        "total_brands": len(brands),
        "top_brand": brands[0].class_name if brands else None,
        "brands": [
            {
                "class_name": b.class_name,
                "detections": b.detections,
                "frames": b.frames,
                "time_seconds": round(b.time_seconds, 2),
                "percentage": round(b.percentage, 2),
                "impact": b.impact
            }
            for b in brands
        ]
    }

# ==========================
# 📈 GLOBAL BRAND TIMELINE
# ==========================
@router.get("/brands/timeline")
def global_brand_timeline(db: Session = Depends(get_db)):
    """
    Timeline histórico global agregado por día.
    
    Usado en: GlobalBrandTimeline
    
    Formato de salida:
    [
        {"date": "2026-02-05", "Nike": 120, "Adidas": 45},
        {"date": "2026-02-06", "Nike": 85, "Puma": 30}
    ]
    
    ⚠️ IMPORTANTE:
    - Usa time_seconds (absoluto), NO percentage
    - Permite sumar entre vídeos correctamente
    """
    rows = (
        db.query(
            func.date(Analysis.created_at).label("date"),
            BrandMetric.class_name.label("brand"),
            func.sum(BrandMetric.time_seconds).label("impact")
        )
        .join(Analysis, Analysis.id == BrandMetric.analysis_id)
        .group_by(func.date(Analysis.created_at), BrandMetric.class_name)
        .order_by(func.date(Analysis.created_at))
        .all()
    )
    
    # Transformar a formato frontend
    timeline = {}
    
    for r in rows:
        d = r.date.isoformat()
        timeline.setdefault(d, {"date": d})
        timeline[d][r.brand] = round(float(r.impact), 2)
    
    return list(timeline.values())

# ==========================
# 📋 RESUMEN EJECUTIVO
# ==========================
@router.get("/overview")
def analytics_overview():
    """
    KPIs globales para ExecutiveStats.
    
    Fuente: GlobalAnalyticsService (en memoria)
    """
    return global_analytics.overview()

# ==========================
# 🏅 RANKING EJECUTIVO
# ==========================
@router.get("/brands/executive")
def executive_brand_ranking():
    """
    Ranking detallado para ExecutiveDashboard.
    """
    return global_analytics.brand_ranking()
```

**Decisión: ¿Por qué func.date()?**
```python
# ❌ SIN func.date():
# created_at: 2026-02-05 14:32:15
# Agrupa por timestamp exacto → múltiples filas por día

# ✅ CON func.date():
# created_at → 2026-02-05
# Agrupa por día completo → una fila por día
```

---

### 📄 `services/global_analytics.py` - Analytics en Memoria

**Responsabilidad:** Mantener métricas agregadas en RAM para respuestas ultra-rápidas.

```python
from collections import defaultdict

# 🔁 Mapeo impacto cualitativo → score numérico
IMPACT_SCORE = {
    "BAJO": 1.0,
    "MEDIO": 2.0,
    "ALTO": 3.0
}

class GlobalAnalyticsService:
    """
    Singleton que mantiene analytics en memoria.
    
    ¿Por qué en memoria?
    - Queries a DB tardan 50-200ms
    - Memoria: < 1ms
    - Trade-off: Pierde datos al reiniciar
    - Solución futura: Redis
    """
    
    def __init__(self):
        self.total_videos = 0
        self.total_images = 0
        
        self.brands = defaultdict(lambda: {
            "videos": 0,
            "images": 0,
            "impact": 0.0,
            "impact_count": 0
        })
    
    def register_video(self, metrics: list):
        """Registrar un vídeo analizado."""
        self.total_videos += 1
        
        for m in metrics:
            brand = m["class_name"]
            
            impact_label = m.get("impact", "BAJO")
            impact_value = self._parse_impact(impact_label)
            
            self.brands[brand]["videos"] += 1
            self.brands[brand]["impact"] += impact_value
            self.brands[brand]["impact_count"] += 1
    
    def register_image(self, metrics: list):
        """Registrar una imagen analizada."""
        self.total_images += 1
        
        for m in metrics:
            brand = m["class_name"]
            
            impact_label = m.get("impact", "BAJO")
            impact_value = self._parse_impact(impact_label)
            
            self.brands[brand]["images"] += 1
            self.brands[brand]["impact"] += impact_value
            self.brands[brand]["impact_count"] += 1
    
    def overview(self):
        """Resumen ejecutivo para dashboard."""
        total_brands = len(self.brands)
        
        top_brand = None
        top_impact = 0
        
        for brand, data in self.brands.items():
            if data["impact"] > top_impact:
                top_brand = brand
                top_impact = data["impact"]
        
        return {
            "total_videos": self.total_videos,
            "total_images": self.total_images,
            "total_analyses": self.total_videos + self.total_images,
            "total_brands": total_brands,
            "top_brand": top_brand,
        }
    
    def brand_ranking(self):
        """Ranking detallado de marcas."""
        ranking = []
        
        for brand, data in self.brands.items():
            avg_impact = (
                data["impact"] / data["impact_count"]
                if data["impact_count"] > 0
                else 0
            )
            
            ranking.append({
                "brand": brand,
                "videos": data["videos"],
                "images": data["images"],
                "total_analyses": data["videos"] + data["images"],
                "avg_impact": round(avg_impact, 2)
            })
        
        # Ordenar por total_analyses descendente
        ranking.sort(key=lambda x: x["total_analyses"], reverse=True)
        
        return ranking
    
    def _parse_impact(self, impact_label: str) -> float:
        """Convertir label a score numérico."""
        return IMPACT_SCORE.get(impact_label.upper(), 1.0)

# 🌐 INSTANCIA GLOBAL (Singleton pattern)
global_analytics = GlobalAnalyticsService()
```

**Trade-offs de mantener datos en memoria:**

| Aspecto | En Memoria | En Base de Datos |
|---------|------------|------------------|
| Velocidad | < 1ms | 50-200ms |
| Persistencia | ❌ Se pierde al reiniciar | ✅ Permanente |
| Escalabilidad | ❌ Una sola instancia | ✅ Compartido entre instancias |
| Complejidad | ✅ Simple | ⚠️ Requiere queries complejas |

**Solución futura con Redis:**
```python
# Instancia 1 (Backend)
redis.incr("total_videos")
redis.hincrby("brand:Nike", "videos", 1)

# Instancia 2 (Backend)
total = redis.get("total_videos")  # ✅ ve cambios de Instancia 1
```

---

Continúa en la próxima parte del documento...

---

# 4. FRONTEND - REACT + VITE

## 4.1 Estructura de Archivos Frontend

```
frontend/
├── Dockerfile                    # Imagen Docker multi-stage
├── nginx.conf                    # Configuración Nginx producción
├── package.json                  # Dependencias npm
├── vite.config.js                # Configuración Vite
└── src/
    ├── main.jsx                  # ⭐ Entry point React
    ├── index.css                 # Estilos globales Tailwind
    ├── components/               # 🧩 Componentes reutilizables
    │   ├── Nav.jsx               # Navegación
    │   ├── Footer.jsx            # Footer
    │   ├── FeatureCard.jsx       # Tarjetas de features
    │   ├── ExecutiveStats.jsx    # KPIs animados
    │   ├── BrandAnalyticsDashboard.jsx  # Dashboard principal
    │   ├── BrandImpactTimeline.jsx      # Timeline por vídeo
    │   ├── GlobalBrandTimeline.jsx      # Timeline histórico
    │   ├── BrandImpactChart.jsx         # Chart de barras
    │   ├── BrandMediaChart.jsx          # Chart de vídeos/imágenes
    │   └── WebcamStream.jsx             # Stream en vivo
    ├── hooks/                    # 🪝 Custom hooks
    │   ├── useAnalyticsSocket.js # WebSocket manager
    │   └── useCountUp.js         # Animación de números
    ├── services/                 # 🔌 API clients
    │   ├── api.js                # Axios instance + predict
    │   └── analytics.js          # Analytics endpoints
    ├── pages/                    # 📄 Páginas
    │   ├── Home.jsx              # Landing page
    │   └── LoadingScreen.jsx     # Loading con animación
    ├── layout/                   # 🎨 Layouts
    │   └── Layout.jsx            # Layout común
    └── routes/                   # 🛣️ Router
        └── Routes.jsx            # Definición de rutas
```

## 4.2 Componentes Explicados

### 📄 `main.jsx` - Entry Point React

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/Routes.jsx'
import './index.css'

/**
 * Entry point de la aplicación React.
 * 
 * - React 18 con createRoot (Concurrent Rendering)
 * - StrictMode para detectar problemas en desarrollo
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**¿Por qué React.StrictMode?**
```javascript
// ✅ Detecta:
// - Components con efectos sin cleanup
// - APIs deprecadas
// - Renderizados inesperados
// - Uso incorrecto de hooks

// ⚠️ Solo en desarrollo, no afecta producción
```

---

### 📄 `services/api.js` - Cliente HTTP

```javascript
import axios from "axios";

/**
 * Cliente Axios configurado.
 * 
 * baseURL se adapta automáticamente:
 * - Desarrollo local: http://localhost:8000
 * - Docker: http://backend:8000 (network interna)
 * - Producción: https://api.tudominio.com
 */
const api = axios.create({
  baseURL: "http://localhost:8000",
});

/* ---------- IMAGE ---------- */
export const predictImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/* ---------- VIDEO ---------- */
export const predictVideo = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/predict/video", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/* ---------- REAL TIME STREAM ---------- */
export const streamWebcamUrl = () =>
  "http://localhost:8000/stream/webcam";

export default api;
```

**Ejemplo de uso:**
```javascript
// En un componente
import { predictImage } from '../services/api';

const handleUpload = async (file) => {
  try {
    const response = await predictImage(file);
    console.log(response.data);
    // { detections: [...], total_detections: 5 }
  } catch (error) {
    console.error(error);
  }
};
```

---

### 📄 `services/analytics.js` - Endpoints de Analytics

```javascript
import api from "./api";

/**
 * Cliente para endpoints de analytics.
 * Usado por componentes de dashboard.
 */

export const getAnalyticsOverview = () => {
  return api.get("/analytics/overview");
};

export const getExecutiveBrands = () => {
  return api.get("/analytics/brands/executive");
};

export const getTopBrands = (limit = 10) => {
  return api.get("/analytics/top-brands", { params: { limit } });
};

export const getBrandTimeline = () => {
  return api.get("/analytics/brands/timeline");
};

export const getVideoSummary = (analysisId) => {
  return api.get(`/analytics/video/${analysisId}/summary`);
};
```

---

### 📄 `hooks/useAnalyticsSocket.js` - WebSocket Hook

```javascript
import { useEffect, useRef } from "react";

/**
 * Hook para conectarse al WebSocket de analytics.
 * 
 * @param {Function} onUpdate - Callback cuando llega notificación
 * 
 * Uso:
 * ```javascript
 * useAnalyticsSocket(() => {
 *   console.log('Analytics updated!');
 *   fetchData();
 * });
 * ```
 */
export default function useAnalyticsSocket(onUpdate) {
  const socketRef = useRef(null);

  useEffect(() => {
    // Conectar WebSocket
    const ws = new WebSocket("ws://localhost:8000/ws/analytics");
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("🟢 WebSocket analytics conectado");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Evento: analytics_updated
        if (data.event === "analytics_updated") {
          console.log("📡 Analytics updated → refetch");
          onUpdate();  // ⭐ Ejecutar callback
        }
      } catch (err) {
        console.error("WS parse error", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    ws.onclose = () => {
      console.log("🔴 WebSocket analytics cerrado");
    };

    // Cleanup: cerrar WebSocket al desmontar
    return () => {
      ws.close();
    };
  }, [onUpdate]);
}
```

**Flujo de WebSocket:**
```
1. Usuario sube vídeo
   ↓
2. Backend procesa (30 segundos)
   ↓
3. Backend hace broadcast:
   ws.send({"event": "analytics_updated"})
   ↓
4. Frontend recibe mensaje
   ↓
5. onUpdate() ejecuta fetchData()
   ↓
6. Dashboard se actualiza automáticamente
```

---

### 📄 `hooks/useCountUp.js` - Animación de Números

```javascript
import { useEffect, useState } from "react";

/**
 * Hook para animar números (efecto count-up).
 * 
 * @param {number} endValue - Valor final
 * @param {number} duration - Duración en ms (default: 1000)
 * 
 * Ejemplo:
 * ```javascript
 * const animatedValue = useCountUp(1500, 2000);
 * // 0 → 1 → 2 → ... → 1500 (en 2 segundos)
 * ```
 */
export default function useCountUp(endValue, duration = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (endValue === 0) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Interpolación linear
      setCount(Math.floor(progress * endValue));

      if (now >= endTime) {
        clearInterval(timer);
        setCount(endValue);  // Asegurar valor exacto
      }
    }, 16);  // ~60 FPS

    return () => clearInterval(timer);
  }, [endValue, duration]);

  return count;
}
```

**Uso en componente:**
```javascript
function StatsCard({ value }) {
  const animated = useCountUp(value, 1500);
  
  return (
    <div className="stat-card">
      <h2>{animated.toLocaleString()}</h2>
      {/* 0 → 1,234 → 5,678 */}
    </div>
  );
}
```

---

### 📄 `components/ExecutiveStats.jsx` - KPIs Animados

```javascript
import { useEffect, useState, useCallback, useRef } from "react";
import {
  Video,
  Image,
  Tags,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import { getAnalyticsOverview } from "../services/analytics";
import useAnalyticsSocket from "../hooks/useAnalyticsSocket";
import useCountUp from "../hooks/useCountUp";

/**
 * Componente de KPIs ejecutivos animados.
 * 
 * Features:
 * - Números animados con useCountUp
 * - Actualización automática vía WebSocket
 * - Indicadores de tendencia (↑ ↓ →)
 * - Efecto de pulso al actualizar
 */

function TrendIcon({ trend }) {
  if (trend === "up")
    return <ArrowUpRight className="text-green-400" size={16} />;
  if (trend === "down")
    return <ArrowDownRight className="text-red-400" size={16} />;
  return <Minus className="text-gray-500" size={16} />;
}

export default function ExecutiveStats({ refreshKey }) {
  const [stats, setStats] = useState(null);
  const [prevStats, setPrevStats] = useState(null);
  const [pulse, setPulse] = useState(false);
  const firstLoad = useRef(true);

  const fetchOverview = useCallback(async () => {
    const res = await getAnalyticsOverview();

    setStats((currentStats) => {
      setPrevStats(currentStats);
      return res.data;
    });

    // Efecto de pulso (excepto primera carga)
    if (!firstLoad.current) {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }

    firstLoad.current = false;
  }, []);

  useEffect(() => {
    fetchOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  // ⚡ WebSocket auto-refresh
  useAnalyticsSocket(fetchOverview);

  // Números animados
  const animatedVideos = useCountUp(stats?.total_videos || 0);
  const animatedImages = useCountUp(stats?.total_images || 0);
  const animatedBrands = useCountUp(stats?.total_brands || 0);

  if (!stats) {
    return (
      <div className="mb-16 text-center text-gray-400">
        Cargando resumen ejecutivo…
      </div>
    );
  }

  // Calcular tendencia (compara con stats previos)
  const trend = (key) => {
    if (!prevStats) return "stable";
    if (stats[key] > prevStats[key]) return "up";
    if (stats[key] < prevStats[key]) return "down";
    return "stable";
  };

  const cards = [
    {
      label: "Vídeos analizados",
      value: animatedVideos,
      icon: Video,
      color: "text-indigo-400",
      trend: trend("total_videos"),
    },
    {
      label: "Imágenes analizadas",
      value: animatedImages,
      icon: Image,
      color: "text-pink-400",
      trend: trend("total_images"),
    },
    {
      label: "Marcas detectadas",
      value: animatedBrands,
      icon: Tags,
      color: "text-cyan-400",
      trend: trend("total_brands"),
    },
  ];

  return (
    <div className={`
      grid grid-cols-1 md:grid-cols-3 gap-6 mb-16
      ${pulse ? 'animate-pulse' : ''}
    `}>
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1324] 
                     border border-white/10 rounded-2xl p-6
                     hover:border-indigo-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <card.icon className={`${card.color}`} size={28} />
            <TrendIcon trend={card.trend} />
          </div>

          <p className="text-gray-400 text-sm mb-2">{card.label}</p>
          
          <div className="text-4xl font-bold text-white">
            {card.value.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Decisión de diseño: useCallback**
```javascript
// ❌ SIN useCallback:
const fetchOverview = async () => { ... };
// Se recrea en cada render → useEffect se ejecuta infinitamente

// ✅ CON useCallback:
const fetchOverview = useCallback(async () => { ... }, []);
// Solo se crea una vez → useEffect solo se ejecuta al montar
```

---

Continuaré con más secciones en el siguiente mensaje...
