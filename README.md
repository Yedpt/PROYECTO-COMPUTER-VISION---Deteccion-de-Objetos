<div align="center">

# 🎯 Logo Detection Platform
### **Análisis de Impacto de Marcas con Inteligencia Artificial**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)
[![YOLOv8](https://img.shields.io/badge/YOLOv8-Custom-FF6F00.svg)](https://docs.ultralytics.com/)

*Plataforma full-stack de **Computer Vision** que cuantifica la presencia de logos en contenido multimedia, proporcionando insights ejecutivos en tiempo real para análisis de ROI de patrocinios.*

[🚀 Inicio Rápido](#-inicio-rápido-con-docker) • [📖 Documentación](#-documentación) • [🎥 Demo](#-demo) • [🏗️ Arquitectura](#️-arquitectura)

</div>

---

## 📋 Tabla de Contenidos

- [🌟 Características Principales](#-características-principales)
- [🎯 Casos de Uso](#-casos-de-uso)
- [🏗️ Arquitectura](#️-arquitectura)
- [🚀 Inicio Rápido con Docker](#-inicio-rápido-con-docker)
- [⚙️ Configuración Manual](#️-configuración-manual)
- [📊 Dashboard y Métricas](#-dashboard-y-métricas)
- [🧠 Modelo YOLO](#-modelo-yolo)
- [🔌 API Endpoints](#-api-endpoints)
- [📖 Documentación](#-documentación)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

---

## 🌟 Características Principales

<table>
<tr>
<td width="50%">

### 🔍 **Detección Multi-formato**
- ✅ Análisis de **imágenes** (JPG, PNG)
- ✅ Procesamiento de **vídeos** (MP4, AVI)
- ✅ **Streaming en vivo** desde webcam
- ✅ Detección segundo a segundo

</td>
<td width="50%">

### 📊 **Dashboard Ejecutivo**
- ✅ Métricas en tiempo real
- ✅ Gráficos interactivos (Recharts)
- ✅ Timeline de impacto por marca
- ✅ Comparativas históricas

</td>
</tr>
<tr>
<td width="50%">

### ⚡ **Real-Time Updates**
- ✅ WebSockets bidireccionales
- ✅ Notificaciones instantáneas
- ✅ Animaciones suaves (CountUp)
- ✅ Latencia < 50ms

</td>
<td width="50%">

### 🐳 **Production Ready**
- ✅ Docker + Docker Compose
- ✅ Multi-stage builds optimizados
- ✅ Nginx para frontend
- ✅ Health checks automáticos

</td>
</tr>
</table>

---

## 🎯 Casos de Uso

| Industria | Aplicación | Valor |
|-----------|------------|-------|
| **🏆 Deportes** | Medir visibilidad de patrocinadores en eventos | ROI cuantificable del patrocinio |
| **📺 Televisión** | Auditar product placement en series/películas | Verificación de contratos publicitarios |
| **🎬 Marketing** | Analizar presencia de marca en campañas | Comparativa competitiva multi-marca |
| **🎮 Streaming** | Monitorear logos en contenido influencers | Brand safety y compliance |
| **🏢 Corporativo** | Trackear menciones visuales de marca | Brand awareness metrics |

---

## 🏗️ Arquitectura

### Diagrama de Sistema

```
┌─────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │   Dashboard  │  │  Upload File │  │ Webcam Stream│             │
│  │   Analytics  │  │  (Image/Video)  │             │             │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘             │
│         │                  │                  │                     │
│         └──────────────────┴──────────────────┘                     │
│                            │                                        │
│                    ┌───────▼───────┐                               │
│                    │  Nginx:80     │                               │
│                    └───────┬───────┘                               │
└────────────────────────────┼────────────────────────────────────────┘
                             │ HTTP/WebSocket
┌────────────────────────────▼────────────────────────────────────────┐
│                      BACKEND (FastAPI:8000)                         │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  Endpoints: /predict/image | /predict/video | /stream      │    │
│  │  WebSocket: /ws/analytics                                  │    │
│  └────────┬───────────────────────────────┬───────────────────┘    │
│           │                               │                         │
│  ┌────────▼────────┐            ┌─────────▼──────────┐            │
│  │  YOLO Model     │            │  Analytics Service │            │
│  │  (YOLOv8 Custom)│            │  (Aggregation)     │            │
│  │  - Inference    │            │  - Metrics Calc    │            │
│  │  - Confidence   │            │  - Real-time Push  │            │
│  └────────┬────────┘            └─────────┬──────────┘            │
└───────────┼──────────────────────────────┼─────────────────────────┘
            │                              │
            └──────────────┬───────────────┘
                           │ SQLAlchemy ORM
┌──────────────────────────▼──────────────────────────────────────────┐
│                    POSTGRESQL:5432                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │  analyses    │  │ brand_metrics│  │brand_timeline│             │
│  │  - id        │  │ - class_name │  │ - brand      │             │
│  │  - filename  │  │ - detections │  │ - impact     │             │
│  │  - duration  │  │ - percentage │  │ - created_at │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
└─────────────────────────────────────────────────────────────────────┘
```

### Stack Tecnológico Completo

<table>
<tr>
<td width="33%">

#### 🎨 **Frontend**
```yaml
Framework: React 18
Build: Vite 5
Styling: Tailwind CSS 3
Charts: Recharts
HTTP: Axios
WebSocket: Native API
```

</td>
<td width="33%">

#### ⚙️ **Backend**
```yaml
Framework: FastAPI 0.104+
ML: YOLOv8 (Ultralytics)
ORM: SQLAlchemy 2.0
CV: OpenCV 4.8
WebSocket: Native FastAPI
```

</td>
<td width="33%">

#### 🗄️ **Infraestructura**
```yaml
Database: PostgreSQL 16
Container: Docker + Compose
Web Server: Nginx (Alpine)
Python: 3.11-slim
Node: 20-alpine
```

</td>
</tr>
</table>

---

## 🚀 Inicio Rápido con Docker

> **💡 Recomendado:** Forma más rápida de ejecutar el proyecto completo en 3 pasos

### Prerequisitos

| Herramienta | Versión | Descarga |
|-------------|---------|----------|
| Docker Desktop | 20+ | [docker.com](https://www.docker.com/products/docker-desktop) |
| RAM disponible | 4GB+ | - |
| Puertos | 80, 8000, 5432 | Verificar que estén libres |

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/PROYECTO-COMPUTER-VISION---Deteccion-de-Objetos.git
cd PROYECTO-COMPUTER-VISION---Deteccion-de-Objetos
```

### Paso 2: Iniciar PostgreSQL (Windows)

**Opción A - PowerShell Admin:**
```powershell
Start-Service postgresql-x64-17
```

**Opción B - Usar PostgreSQL en Docker** (ver [DOCKER.md](DOCKER.md) para configuración)

### Paso 3: Levantar Servicios

```bash
# Build e iniciar todos los contenedores
docker-compose up --build -d

# Ver logs en tiempo real
docker-compose logs -f

# Verificar estado
docker-compose ps
```

### Paso 4: Acceder a la Aplicación ✨

| Servicio | URL | Descripción |
|----------|-----|-------------|
| 🎨 **Frontend** | http://localhost | Dashboard interactivo |
| ⚡ **Backend API** | http://localhost:8000 | FastAPI endpoints |
| 📚 **API Docs** | http://localhost:8000/docs | Swagger UI automático |
| 🔌 **WebSocket** | ws://localhost:8000/ws/analytics | Real-time updates |

### Comandos Útiles

```bash
# Parar servicios
docker-compose down

# Parar y limpiar volúmenes
docker-compose down -v

# Rebuild sin cache
docker-compose build --no-cache

# Ver logs de un servicio específico
docker-compose logs -f backend

# Entrar a un contenedor
docker exec -it logo_detection_backend bash
```

### Solución de Problemas

<details>
<summary><b>❌ Error: "Connection refused to PostgreSQL"</b></summary>

**Causa:** PostgreSQL no está corriendo en Windows

**Solución:**
```powershell
# Verificar estado
Get-Service postgresql-x64-17

# Iniciar (requiere admin)
Start-Service postgresql-x64-17
```
</details>

<details>
<summary><b>❌ Error: "Port 80 already in use"</b></summary>

**Solución:**
```yaml
# En docker-compose.yml, cambiar:
ports:
  - "8080:80"  # Usar puerto 8080
```
</details>

📖 **Documentación completa:** [DOCKER.md](DOCKER.md)

---

## ⚙️ Configuración Manual

<details>
<summary><b>🛠️ Desarrollo Local sin Docker (Clic para expandir)</b></summary>

### Prerequisitos

- Python 3.11+
- Node.js 20+
- PostgreSQL 16
- Git

### 1. Backend Setup

```bash
cd backend

# Crear entorno virtual
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
# Editar backend/.env con tus credenciales PostgreSQL
```

**backend/.env:**
```env
DATABASE_URL=postgresql://postgres:root@localhost:5432/Computer_vision_db
MODEL_PATH=../yolo/training/logos_v15_stretch_640/weights/best.pt
CONF_THRESHOLD=0.4
```

```bash
# Ejecutar servidor
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend Setup

```bash
cd frontend

# Instalar dependencias
npm install

# Configurar variables (opcional)
# cp .env.example .env

# Ejecutar dev server
npm run dev
```

Accede a http://localhost:5173

### 3. PostgreSQL Setup

```bash
# Crear base de datos (si no existe)
psql -U postgres
CREATE DATABASE Computer_vision_db;
\q
```

Las tablas se crean automáticamente al iniciar el backend.

</details>

---

## 📊 Dashboard y Métricas

### Vista Ejecutiva (Executive Stats)

```
┌─────────────────────────────────────────────────────────┐
│  📹 Vídeos Analizados  │  🖼️ Imágenes    │  🏷️ Marcas  │
│      142 (+5.2%)       │   1,847 (+8%)   │    12       │
└─────────────────────────────────────────────────────────┘
```

**Métricas en tiempo real con:**
- ✅ Animación CountUp
- ✅ Porcentajes de cambio
- ✅ Indicadores de tendencia
- ✅ Actualización vía WebSocket

### Brand Analytics Dashboard

**Top Brands Ranking:**

| # | Marca | Detecciones | Tiempo | Impacto | Vídeos |
|---|-------|-------------|--------|---------|--------|
| 🥇 1 | Nike | 4,523 | 20.5h | ⬆️ ALTO | 89 |
| 🥈 2 | Adidas | 3,145 | 14.2h | ⬆️ ALTO | 76 |
| 🥉 3 | Puma | 1,892 | 8.3h | → MEDIO | 54 |

**Visualizaciones interactivas:**
- 📊 Gráfico de barras (detecciones por marca)
- 📈 Timeline de impacto segundo a segundo
- 🌍 Timeline histórico global (multi-vídeo)
- 🎨 Paleta de colores distintiva por marca

### Timeline Granular

**Intra-vídeo (segundo a segundo):**
```
Detections
    │
 10 │     Nike ─────╮
    │              ╰─╮
  5 │  Adidas ─╮     ╰──╮
    │          ╰─────╮  │
  0 └─────────────────┴──┴────────► Time (s)
    0    5   10   15   20   25   30
```

**Características:**
- ✅ Moving average (suavizado con ventana de 3s)
- ✅ Múltiples marcas superpuestas
- ✅ Tooltip interactivo con datos exactos
- ✅ Leyenda con códigos de color

---

## 🧠 Modelo YOLO

### Especificaciones del Modelo

| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| **Arquitectura** | YOLOv8n | Nano (más ligero y rápido) |
| **Dataset** | 6,000 imágenes | 2K originales + augmentation |
| **Clases** | 6 marcas | Nike, Adidas, Puma, etc. |
| **Input Size** | 640×640 | Resolución estándar |
| **mAP@0.5** | 0.94 | Precisión excelente |
| **Precision** | 0.92 | Bajo false positives |
| **Recall** | 0.89 | Detección efectiva |
| **Inference** | ~50ms/frame | CPU-only (Intel i5+) |

### Dataset (Roboflow)

**Proceso de entrenamiento:**

```
1. Recolección: 2,000+ imágenes base
2. Anotación: Bounding boxes en Roboflow
3. Augmentation: Rotación, flip, brillo, crop → 6,000 imgs
4. Split: 70% train | 20% valid | 10% test
5. Training: 100 epochs con early stopping (patience=15)
6. Resultado: best.pt (6.2MB)
```

**Data Augmentation aplicado:**
- ✅ Flip horizontal (50%)
- ✅ Rotación ±15°
- ✅ Brillo ±25%
- ✅ Crop 0-20%
- ✅ Mosaic augmentation

### Transfer Learning

Partimos de **YOLOv8n pre-entrenado en COCO** (80 clases, 200K imágenes), lo que permite:

- ✅ Convergencia rápida (4 horas vs 2 semanas)
- ✅ Menos datos necesarios (2K vs 50K)
- ✅ Mayor generalización

---

## 🔌 API Endpoints

### Documentación Interactiva

Accede a **Swagger UI** en: [http://localhost:8000/docs](http://localhost:8000/docs)

### Endpoints REST

#### 📷 **POST /predict/image**

Detectar logos en una imagen.

**Request:**
```bash
curl -X POST http://localhost:8000/predict/image \
  -F "file=@logo.jpg"
```

**Response:**
```json
{
  "filename": "logo.jpg",
  "detections": [
    {
      "label": "Nike",
      "confidence": 0.94,
      "bbox": [145, 230, 456, 512],
      "crop_path": "storage/crops/abc123.jpg"
    }
  ],
  "count": 1
}
```

#### 🎥 **POST /predict/video**

Procesar vídeo completo con análisis frame-by-frame.

**Request:**
```bash
curl -X POST http://localhost:8000/predict/video \
  -F "file=@video.mp4"
```

**Response:**
```json
{
  "analysis_id": 42,
  "filename": "video.mp4",
  "duration": 30.5,
  "total_brands": 3,
  "status": "completed"
}
```

**Nota:** El análisis se guarda en PostgreSQL y dispara evento WebSocket.

#### 📊 **GET /analytics/overview**

Resumen ejecutivo de todas las analíticas.

**Response:**
```json
{
  "total_analyses": 145,
  "total_detections": 12847,
  "total_brands": 8,
  "avg_detections_per_video": 88.6,
  "change_percentage": 5.2
}
```

#### 🏆 **GET /analytics/brands**

Top marcas ordenadas por detecciones.

**Response:**
```json
{
  "brands": [
    {
      "brand": "Nike",
      "total_detections": 4523,
      "total_time": 73920.5,
      "videos": 89,
      "rank": 1,
      "percentage_of_total": 35.21
    }
  ]
}
```

#### 📈 **GET /analytics/brands/timeline**

Timeline histórico global (multi-vídeo).

**Query params:**
- `start_date` (opcional): YYYY-MM-DD
- `end_date` (opcional): YYYY-MM-DD

**Response:**
```json
[
  {
    "date": "2026-02-10",
    "Nike": 1247.3,
    "Adidas": 892.5,
    "Puma": 543.2
  }
]
```

### WebSocket

#### 🔌 **WS /ws/analytics**

Conexión persistente para notificaciones en tiempo real.

**Eventos enviados por servidor:**

```json
{
  "event": "analytics_updated",
  "analysis_id": 42,
  "timestamp": "2026-02-10T14:30:00Z"
}
```

**Cliente React:**
```javascript
const ws = new WebSocket('ws://localhost:8000/ws/analytics');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.event === 'analytics_updated') {
    refetchAnalytics();
  }
};
```

---

## 📖 Documentación

### Documentación Completa del Proyecto

Para un análisis exhaustivo línea por línea del proyecto completo, consulta:

📘 **[docs/DOCUMENTACION_COMPLETA_PROYECTO.md](docs/DOCUMENTACION_COMPLETA_PROYECTO.md)**  
📘 **[docs/DOCUMENTACION_COMPLETA_PROYECTO_PARTE_2.md](docs/DOCUMENTACION_COMPLETA_PROYECTO_PARTE_2.md)**  
📘 **[docs/DOCUMENTACION_COMPLETA_PROYECTO_PARTE_3.md](docs/DOCUMENTACION_COMPLETA_PROYECTO_PARTE_3.md)**

**Contenido (166,000+ caracteres):**
- ✅ Arquitectura completa con diagramas
- ✅ Análisis de cada archivo del proyecto
- ✅ Explicación del modelo YOLO y entrenamiento
- ✅ WebSockets y comunicación real-time
- ✅ Esquema de base de datos y queries
- ✅ Docker multi-stage builds explicados
- ✅ Estrategias de escalabilidad
- ✅ Preguntas de entrevista técnica preparadas

### Otros Documentos

| Documento | Descripción |
|-----------|-------------|
| [DOCKER.md](DOCKER.md) | Guía completa de Docker |
| [docs/arquitectura.md](docs/arquitectura.md) | Decisiones arquitectónicas |
| [docs/decisiones-tecnicas.md](docs/decisiones-tecnicas.md) | Justificación del stack |

---

## 🎥 Demo

### 📸 Screenshots

<details>
<summary><b>🖼️ Ver capturas de pantalla (Clic para expandir)</b></summary>

**Dashboard Principal:**
```
┌────────────────────────────────────────────────────┐
│  LOGO DETECTION - Analytics Dashboard             │
├────────────────────────────────────────────────────┤
│  📊 Executive Stats                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ Videos   │  │ Images   │  │ Brands   │        │
│  │  142     │  │  1,847   │  │   12     │        │
│  └──────────┘  └──────────┘  └──────────┘        │
│                                                    │
│  🏆 Top Brands                                     │
│  ┌────────────────────────────────────────────┐   │
│  │  1. Nike     ████████████████░  4,523     │   │
│  │  2. Adidas   ███████████░░░░░  3,145     │   │
│  │  3. Puma     ██████░░░░░░░░░░  1,892     │   │
│  └────────────────────────────────────────────┘   │
│                                                    │
│  📈 Timeline Analysis                              │
│  [Gráfico interactivo Recharts]                   │
└────────────────────────────────────────────────────┘
```

</details>

### 🎬 Video Demo

> 📹 **[Ver video demo en YouTube](#)** *(próximamente)*

Funcionalidades mostradas:
- ✅ Upload de vídeo
- ✅ Procesamiento en tiempo real
- ✅ WebSocket notifications
- ✅ Dashboard auto-update
- ✅ Gráficos interactivos

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Instalar dependencias de testing
pip install pytest pytest-cov

# Ejecutar tests
pytest

# Con coverage
pytest --cov=app --cov-report=html
```

### Frontend Tests

```bash
cd frontend

# Ejecutar tests
npm run test

# Coverage
npm run test:coverage
```

### Integration Tests

```bash
# Levantar stack completo
docker-compose up -d

# Ejecutar tests E2E
npm run test:e2e
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! 

### Proceso

1. **Fork** el repositorio
2. **Crea** una rama: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** tus cambios: `git commit -m 'feat: agregar nueva funcionalidad'`
4. **Push**: `git push origin feature/nueva-funcionalidad`
5. **Pull Request** con descripción detallada

### Conventional Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Formato de código
- `refactor:` Refactorización
- `test:` Tests
- `chore:` Mantenimiento

---

## 🚧 Roadmap

### Q1 2026

- [x] ✅ Dashboard ejecutivo con métricas reales
- [x] ✅ WebSockets para real-time updates
- [x] ✅ Dockerización completa
- [x] ✅ Documentación exhaustiva
- [ ] 🔲 Tests automatizados (>80% coverage)
- [ ] 🔲 CI/CD pipeline (GitHub Actions)

### Q2 2026

- [ ] 🔲 Redis cache layer
- [ ] 🔲 Celery para background tasks
- [ ] 🔲 S3 para almacenamiento de vídeos
- [ ] 🔲 API pública con rate limiting
- [ ] 🔲 Export a PDF/Excel de reportes

### Q3 2026

- [ ] 🔲 Multi-tenancy (SaaS)
- [ ] 🔲 Kubernetes deployment
- [ ] 🔲 Model quantization (ONNX INT8)
- [ ] 🔲 Mobile app (React Native)
- [ ] 🔲 ML Ops pipeline (auto-retraining)

---

## 📊 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| **Líneas de código** | ~5,000 |
| **Archivos Python** | 23 |
| **Componentes React** | 12 |
| **Endpoints API** | 8 REST + 1 WS |
| **Tablas PostgreSQL** | 3 |
| **Model accuracy (mAP@0.5)** | 0.94 |
| **Dataset size** | 6,000 imágenes |
| **Docker images** | 3 |
| **Tiempo desarrollo** | 4 semanas |

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2026 F5 Bootcamp IA - Computer Vision Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👥 Equipo

Desarrollado como **proyecto final del F5 Bootcamp en Inteligencia Artificial**.

### Autor Principal

- **Nombre:** [Tu Nombre]
- **GitHub:** [@tu-usuario](https://github.com/tu-usuario)
- **LinkedIn:** [Tu LinkedIn](https://linkedin.com/in/tu-perfil)
- **Email:** tu.email@example.com

### Agradecimientos

- 🙏 F5 Bootcamp por la formación
- 🙏 Ultralytics por YOLOv8
- 🙏 Roboflow por herramientas de dataset
- 🙏 Comunidad open-source

---

## 🆘 Soporte y Contacto

### Documentación

- 📚 **Docs completas:** [docs/](docs/)
- 🐳 **Guía Docker:** [DOCKER.md](DOCKER.md)
- 🏗️ **Arquitectura:** [docs/arquitectura.md](docs/arquitectura.md)
- 💬 **Decisiones técnicas:** [docs/decisiones-tecnicas.md](docs/decisiones-tecnicas.md)

### Ayuda

¿Encontraste un bug? ¿Tienes una sugerencia?

1. **Issues:** [Abrir issue en GitHub](https://github.com/tu-usuario/proyecto/issues)
2. **Discussions:** [GitHub Discussions](https://github.com/tu-usuario/proyecto/discussions)
3. **Email:** tu.email@example.com

### Recursos Adicionales

- 📖 [FastAPI Documentation](https://fastapi.tiangolo.com/)
- 📖 [YOLOv8 Documentation](https://docs.ultralytics.com/)
- 📖 [React Documentation](https://react.dev/)
- 📖 [Docker Documentation](https://docs.docker.com/)

---

<div align="center">

### ⭐ Si este proyecto te fue útil, ¡dale una estrella en GitHub! ⭐

**Made with ❤️ using YOLOv8, FastAPI, and React**

</div>

---

## 🔗 Enlaces Rápidos

| Recurso | Descripción |
|---------|-------------|
| 🚀 [Demo Live](#) | Aplicación en producción |
| 📺 [Video Tutorial](#) | Walkthrough completo |
| 📘 [Docs Completas](docs/) | 166K+ caracteres |
| 🐳 [Docker Hub](#) | Imágenes pre-built |
| 💼 [Portfolio](https://tu-portfolio.com) | Más proyectos |

---

<div align="center">

**© 2026 F5 Bootcamp IA - Computer Vision Project**

[⬆️ Volver arriba](#-logo-detection-platform)

</div>
