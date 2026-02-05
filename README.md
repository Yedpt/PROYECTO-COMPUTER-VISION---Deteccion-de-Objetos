# 🎯 Logo Detection Platform - Computer Vision Project

Plataforma full-stack de **análisis de impacto de marcas mediante visión artificial** con YOLOv8, diseñada para ofrecer insights ejecutivos sobre presencia de logos en contenido multimedia.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)

## 🌟 Características

- 🔍 **Detección de logos** en imágenes y vídeos con YOLOv8
- 📹 **Streaming en tiempo real** desde webcam
- 📊 **Dashboard ejecutivo** con métricas accionables
- ⏱️ **Timeline granular** segundo a segundo
- 📈 **Análisis histórico** con comparativas entre marcas
- 🔄 **Actualizaciones en tiempo real** vía WebSockets
- 🐳 **Dockerizado** para deployment sencillo

## 🎯 Casos de Uso

- Análisis de patrocinios deportivos
- Auditoría de product placement
- Brand monitoring en contenido multimedia
- Benchmarking entre marcas competidoras
- ROI de acuerdos de patrocinio

## 🏗️ Arquitectura

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   React     │◄────►│   FastAPI   │◄────►│ PostgreSQL  │
│   Vite      │ HTTP │   YOLOv8    │ SQL  │             │
│  Tailwind   │  WS  │  SQLAlchemy │      │   Metrics   │
└─────────────┘      └─────────────┘      └─────────────┘
```

### Stack Tecnológico

**Backend:**
- FastAPI (async web framework)
- YOLOv8 (Ultralytics)
- SQLAlchemy + PostgreSQL
- WebSockets para real-time

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- Recharts (visualizaciones)
- Axios + WebSocket client

**Infraestructura:**
- Docker + Docker Compose
- Nginx (producción)
- PostgreSQL 15

## 🚀 Inicio Rápido con Docker (Recomendado)

### Requisitos
- Docker Desktop
- 4GB RAM disponible
- Puertos 80, 8000, 5432 libres

### 1. Clonar repositorio

```bash
git clone https://github.com/tu-usuario/PROYECTO-COMPUTER-VISION---Deteccion-de-Objetos.git
cd PROYECTO-COMPUTER-VISION---Deteccion-de-Objetos
```

### 2. Levantar servicios

```bash
docker-compose up -d
```

### 3. Acceder a la aplicación

- **Frontend**: http://localhost
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs

Para más detalles, ver [DOCKER.md](DOCKER.md)

## 🛠️ Desarrollo Local (Sin Docker)

<details>
<summary>Clic para expandir</summary>

### Requisitos

- Python 3.11+
- Node.js 20+
- PostgreSQL 15
- Git

### Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu configuración

# Ejecutar servidor
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar dev server
npm run dev
```

### PostgreSQL

```bash
# Crear base de datos
createdb logo_detection

# La app creará las tablas automáticamente
```

</details>

## 📊 Modelo de Datos

### Entidades principales

```python
Analysis (1 ejecución)
├── filename, fps, duration
├── total_frames
└── created_at

BrandMetric (métricas por marca)
├── class_name (marca)
├── detections (total)
├── frames (apariciones)
├── time_seconds (absoluto)
├── percentage (relativo)
└── impact (ALTO|MEDIO|BAJO|RESIDUAL)
```

### Endpoints principales

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/predict` | POST | Detectar logos en imagen |
| `/predict/video` | POST | Procesar vídeo completo |
| `/stream/webcam` | GET | Stream en tiempo real |
| `/analytics/overview` | GET | Resumen ejecutivo |
| `/analytics/top-brands` | GET | Ranking de marcas |
| `/analytics/brands/timeline` | GET | Timeline histórico |
| `/ws/analytics` | WS | Updates en tiempo real |

## 📈 Dashboards

### Executive Stats
KPIs animados con tendencias: vídeos analizados, imágenes, marcas detectadas.

### Brand Analytics
Ranking de marcas por:
- Detecciones totales
- Tiempo en pantalla
- Impacto promedio
- Número de vídeos

### Timeline Analysis
- **Intra-vídeo**: segundo a segundo con suavizado
- **Histórico global**: evolución diaria acumulada

## 🧪 Testing

```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm run test
```

## 📝 Licencia

MIT License - ver [LICENSE](LICENSE)

## 👥 Autores

Desarrollado como proyecto final de F5 Bootcamp IA

## 🆘 Soporte

- 📖 Documentación completa: [docs/](docs/)
- 🐳 Guía Docker: [DOCKER.md](DOCKER.md)
- 🏗️ Arquitectura: [docs/arquitectura.md](docs/arquitectura.md)
- 💡 Decisiones técnicas: [docs/decisiones-tecnicas.md](docs/decisiones-tecnicas.md)

## 🚧 Roadmap

- [ ] Cache con Redis
- [ ] Background tasks (Celery)
- [ ] Tests E2E
- [ ] CI/CD pipeline
- [ ] Multi-tenancy
- [ ] API pública
- [ ] Export PDF/Excel

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
