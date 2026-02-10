# DOCUMENTACIÓN COMPLETA PROYECTO - PARTE 2

## Continuación de Frontend y Secciones Avanzadas

---

### 📄 `components/BrandImpactTimeline.jsx` - Timeline con Moving Average

```javascript
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

/**
 * Timeline de impacto por segundo con suavizado.
 * 
 * ALGORITMO DE SUAVIZADO (Moving Average):
 * - Ventana de 3 segundos
 * - Promedio de valores anteriores
 * - Reduce ruido visual
 * 
 * Ejemplo:
 * Datos originales: [2, 5, 1, 8, 3]
 * Moving average:   [2, 3.5, 2.67, 4.67, 4]
 */

/* -----------------------------
   Utils: Moving Average
----------------------------- */
function movingAverage(data, key, windowSize = 3) {
  return data.map((entry, index) => {
    // Ventana: desde (index - windowSize + 1) hasta index
    const start = Math.max(0, index - windowSize + 1);
    const slice = data.slice(start, index + 1);

    // Promedio
    const avg =
      slice.reduce((sum, d) => sum + (d[key] || 0), 0) /
      slice.length;

    return {
      ...entry,
      [key]: Number(avg.toFixed(2)),
    };
  });
}

export default function BrandImpactTimeline({ data }) {
  if (!data || data.length === 0) return null;

  // Extraer marcas (todas las keys excepto 'second')
  const brands = Object.keys(data[0]).filter(
    (k) => k !== "second"
  );

  // Paleta de colores
  const PALETTE = [
    "#6366F1",  // Indigo
    "#EC4899",  // Pink
    "#22D3EE",  // Cyan
    "#FACC15",  // Yellow
    "#34D399",  // Green
    "#A78BFA",  // Purple
    "#FB7185",  // Rose
  ];

  const getColor = (index) => PALETTE[index % PALETTE.length];

  // 🎯 Suavizar datos por marca
  let smoothData = [...data];

  brands.forEach((brand) => {
    smoothData = movingAverage(smoothData, brand, 3);
  });

  return (
    <div className="mt-20 bg-[#151A2C] border border-white/5 rounded-2xl p-8">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          ⏱️ Impacto de marca en el tiempo
        </h2>
        <p className="text-sm text-gray-400">
          Evolución suavizada de apariciones por segundo
        </p>
      </div>

      {/* LEGEND */}
      <div className="flex flex-wrap gap-4 mb-6">
        {brands.map((brand, idx) => (
          <div key={brand} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getColor(idx) }}
            />
            <span className="text-sm text-gray-300">{brand}</span>
          </div>
        ))}
      </div>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={smoothData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />

          <XAxis
            dataKey="second"
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            label={{
              value: "Tiempo (segundos)",
              position: "insideBottom",
              offset: -5,
              fill: "#9CA3AF",
            }}
          />

          <YAxis
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            label={{
              value: "Detecciones",
              angle: -90,
              position: "insideLeft",
              fill: "#9CA3AF",
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1f3a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
            }}
          />

          {brands.map((brand, idx) => (
            <Line
              key={brand}
              type="monotone"
              dataKey={brand}
              stroke={getColor(idx)}
              strokeWidth={2.5}
              dot={false}
              animationDuration={900}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

**Visualización del Moving Average:**
```
Datos originales:
Segundo | Nike | Suavizado (ventana=3)
------- | ---- | ---------------------
0       | 2    | 2       (solo 1 valor)
1       | 5    | 3.5     ((2+5)/2)
2       | 1    | 2.67    ((2+5+1)/3)
3       | 8    | 4.67    ((5+1+8)/3)
4       | 3    | 4       ((1+8+3)/3)

Efecto: Suaviza picos y caídas bruscas
```

---

### 📄 `components/GlobalBrandTimeline.jsx` - Timeline Histórico

```javascript
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

/**
 * Timeline histórico global (multi-vídeo).
 * 
 * Fuente de datos: /analytics/brands/timeline
 * Formato: [{"date": "2026-02-05", "Nike": 120, "Adidas": 45}]
 * 
 * ⚠️ IMPORTANTE:
 * - Valores en SEGUNDOS (absolutos)
 * - NO porcentajes (no se pueden sumar entre vídeos)
 */
export default function GlobalBrandTimeline({ data }) {
  if (!data || data.length === 0) return null;

  // Extraer marcas (excepto 'date')
  const brands = Object.keys(data[0]).filter(
    (k) => k !== "date"
  );

  const colors = [
    "#6366F1",
    "#EC4899",
    "#22D3EE",
    "#FACC15",
    "#A78BFA",
    "#34D399",
  ];

  return (
    <div className="mt-16 bg-[#0F1324] border border-white/10 rounded-2xl p-8">
      <h2 className="text-xl font-semibold mb-2">
        🌍 Impacto global de marcas
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Evolución histórica acumulada por día
      </p>

      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />
          
          <XAxis
            dataKey="date"
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />
          
          <YAxis 
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            label={{
              value: "Tiempo (segundos)",
              angle: -90,
              position: "insideLeft",
              fill: "#9CA3AF",
            }}
          />
          
          <Tooltip />
          <Legend />

          {brands.map((brand, idx) => (
            <Line
              key={brand}
              type="monotone"
              dataKey={brand}
              stroke={colors[idx % colors.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

**¿Por qué time_seconds y no percentage?**
```
Vídeo 1: Nike = 12% (3.5 segundos de 30s)
Vídeo 2: Nike = 8%  (4.8 segundos de 60s)

❌ INCORRECTO: 12% + 8% = 20%
✅ CORRECTO: 3.5s + 4.8s = 8.3 segundos totales
```

---

# 5. WEBSOCKETS - COMUNICACIÓN EN TIEMPO REAL

## 5.1 ¿Por Qué WebSockets?

### Comparativa de Tecnologías

| Método | Latencia | Overhead | Escalabilidad | Uso |
|--------|----------|----------|---------------|-----|
| **WebSocket** | < 50ms | Mínimo | Alto | ✅ Real-time |
| HTTP Polling | 5-10s | Alto | Bajo | ❌ Ineficiente |
| SSE (Server-Sent Events) | < 1s | Medio | Medio | ⚠️ Solo servidor→cliente |
| Long Polling | 1-5s | Medio | Bajo | ❌ Legacy |

### Flujo WebSocket vs Polling

```
📡 WEBSOCKET (Bidireccional):
1. Cliente conecta: ws://
2. Canal abierto permanente
3. Servidor envía cuando hay cambios
4. Latencia: 10-50ms

🔄 POLLING (Request/Response):
1. Cliente hace GET /status cada 5s
2. Servidor responde (cambios o no)
3. 99% requests inútiles
4. Latency: 5000ms promedio
```

## 5.2 Implementación Backend

### 📄 `core/ws_manager.py` - Manager de Conexiones

```python
from typing import List
from fastapi import WebSocket

class AnalyticsWSManager:
    """
    Administrador de conexiones WebSocket.
    
    Patrón: Publisher-Subscriber
    - Múltiples clientes conectados
    - Broadcast envía a todos
    """
    
    def __init__(self):
        self.active_connections: List[WebSocket] = []
    
    async def connect(self, websocket: WebSocket):
        """Aceptar y registrar nueva conexión."""
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"✅ Cliente conectado. Total: {len(self.active_connections)}")
    
    def disconnect(self, websocket: WebSocket):
        """Eliminar conexión cerrada."""
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            print(f"❌ Cliente desconectado. Total: {len(self.active_connections)}")
    
    async def broadcast(self, message: dict):
        """Enviar mensaje a TODOS los clientes."""
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                print(f"Error broadcasting: {e}")
                # Cliente desconectado, remover
                self.disconnect(connection)

# 🌐 Instancia global (Singleton)
analytics_ws_manager = AnalyticsWSManager()
```

### 📄 `controllers/analytics_ws.py` - Endpoint WebSocket

```python
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.core.ws_manager import analytics_ws_manager

router = APIRouter()

@router.websocket("/ws/analytics")
async def websocket_analytics(websocket: WebSocket):
    """
    Endpoint WebSocket para analytics en tiempo real.
    
    Protocolo:
    - Cliente conecta
    - Servidor envía {"event": "analytics_updated"}
    - Cliente refetch datos
    
    Ciclo de vida:
    1. connect()
    2. Esperar (blocking)
    3. disconnect() al cerrar
    """
    
    # 1. Aceptar conexión
    await analytics_ws_manager.connect(websocket)
    
    try:
        # 2. Mantener conexión abierta
        while True:
            # Esperar mensajes del cliente (opcional)
            data = await websocket.receive_text()
            
            # Echo (opcional)
            await websocket.send_json({
                "event": "pong",
                "message": "Connection alive"
            })
    
    except WebSocketDisconnect:
        # 3. Cliente cerró conexión
        analytics_ws_manager.disconnect(websocket)
```

### Broadcast desde Controladores

```python
# En predict_video.py después de guardar:

from app.core.ws_manager import analytics_ws_manager

# ... procesar vídeo ...

# Notificar a todos los clientes
await analytics_ws_manager.broadcast({
    "event": "analytics_updated",
    "analysis_id": analysis.id,
    "timestamp": datetime.now().isoformat()
})
```

## 5.3 Implementación Frontend

### Conexión y Reconexión

```javascript
// hooks/useAnalyticsSocket.js con reconexión
import { useEffect, useRef } from "react";

export default function useAnalyticsSocket(onUpdate) {
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connect = () => {
    const ws = new WebSocket("ws://localhost:8000/ws/analytics");
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("🟢 WebSocket conectado");
      
      // Limpiar timeout de reconexión si existía
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.event === "analytics_updated") {
          console.log("📡 Analytics actualizado");
          onUpdate();
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("🔴 WebSocket cerrado. Reconectando en 5s...");
      
      // Reconectar automáticamente después de 5 segundos
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log("🔄 Intentando reconectar...");
        connect();
      }, 5000);
    };
  };

  useEffect(() => {
    connect();

    // Cleanup al desmontar
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [onUpdate]);
}
```

## 5.4 Secuencia Completa de Eventos

```
┌─────────────┐                  ┌─────────────┐
│  Frontend   │                  │   Backend   │
│  (React)    │                  │  (FastAPI)  │
└──────┬──────┘                  └──────┬──────┘
       │                                │
       │ 1. WebSocket Connect           │
       ├───────────────────────────────►│
       │                                │
       │ 2. Connection Accepted         │
       │◄───────────────────────────────┤
       │                                │
       │ [Usuario sube vídeo]           │
       │                                │
       │ 3. POST /predict/video         │
       ├───────────────────────────────►│
       │                                │
       │                           [Procesando...]
       │                           [YOLO inference]
       │                           [Guardar DB]
       │                                │
       │ 4. Broadcast WS                │
       │    {"event": "analytics_updated"}
       │◄───────────────────────────────┤
       │                                │
       │ 5. Fetch GET /analytics/overview
       ├───────────────────────────────►│
       │                                │
       │ 6. Response {data}             │
       │◄───────────────────────────────┤
       │                                │
       │ [Dashboard actualizado]        │
       │                                │
```

---

# 6. BASE DE DATOS POSTGRESQL

## 6.1 Esquema Completo

```sql
-- ========================
-- TABLA: analyses
-- ========================
CREATE TABLE analyses (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    analysis_type VARCHAR(50) DEFAULT 'video',
    total_frames INTEGER,
    fps REAL,
    duration REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar queries
CREATE INDEX idx_analyses_created_at ON analyses(created_at);
CREATE INDEX idx_analyses_type ON analyses(analysis_type);

-- ========================
-- TABLA: brand_metrics
-- ========================
CREATE TABLE brand_metrics (
    id SERIAL PRIMARY KEY,
    analysis_id INTEGER REFERENCES analyses(id) ON DELETE CASCADE,
    class_name VARCHAR(100) NOT NULL,
    detections INTEGER NOT NULL,
    frames INTEGER NOT NULL,
    time_seconds REAL NOT NULL,
    percentage REAL NOT NULL,
    impact VARCHAR(20)
);

-- Índices compuestos para queries complejas
CREATE INDEX idx_brand_metrics_analysis ON brand_metrics(analysis_id);
CREATE INDEX idx_brand_metrics_class ON brand_metrics(class_name);
CREATE INDEX idx_brand_metrics_composite ON brand_metrics(class_name, analysis_id);

-- ========================
-- TABLA: brand_timeline (LEGACY)
-- ========================
CREATE TABLE brand_timeline (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    impact REAL NOT NULL,
    analysis_id INTEGER REFERENCES analyses(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_brand_timeline_brand ON brand_timeline(brand);
CREATE INDEX idx_brand_timeline_created_at ON brand_timeline(created_at);
```

## 6.2 Queries Importantes

### Query 1: Top Brands Global

```sql
SELECT 
    class_name AS brand,
    SUM(detections) AS total_detections,
    SUM(time_seconds) AS total_time,
    COUNT(DISTINCT analysis_id) AS videos_count,
    AVG(percentage) AS avg_percentage
FROM brand_metrics
GROUP BY class_name
ORDER BY SUM(detections) DESC
LIMIT 10;
```

**Explicación:**
- `SUM(detections)`: Total de detecciones entre todos los vídeos
- `SUM(time_seconds)`: Tiempo total de exposición
- `COUNT(DISTINCT analysis_id)`: En cuántos vídeos aparece
- `AVG(percentage)`: Promedio de presencia por vídeo

### Query 2: Timeline Histórico

```sql
SELECT 
    DATE(a.created_at) AS date,
    bm.class_name AS brand,
    SUM(bm.time_seconds) AS impact
FROM brand_metrics bm
JOIN analyses a ON a.id = bm.analysis_id
WHERE a.created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(a.created_at), bm.class_name
ORDER BY date;
```

**Plan de ejecución optimizado:**
```
Aggregate  (cost=459.67..459.68 rows=1 width=52)
  Group Key: (date(analyses.created_at)), brand_metrics.class_name
  ->  Sort  (cost=459.64..459.65 rows=4 width=20)
        Sort Key: (date(analyses.created_at)), brand_metrics.class_name
        ->  Hash Join  (cost=37.91..459.59 rows=4 width=20)
              Hash Cond: (brand_metrics.analysis_id = analyses.id)
              ->  Seq Scan on brand_metrics  (cost=0.00..421.00 rows=10000 width=16)
              ->  Hash  (cost=37.88..37.88 rows=2 width=12)
                    ->  Index Scan using idx_analyses_created_at on analyses
```

### Query 3: Métricas por Vídeo

```sql
SELECT 
    a.filename,
    a.duration,
    COUNT(bm.id) AS total_brands,
    SUM(bm.detections) AS total_detections,
    MAX(bm.percentage) AS max_brand_percentage
FROM analyses a
LEFT JOIN brand_metrics bm ON bm.analysis_id = a.id
WHERE a.id = 123
GROUP BY a.id, a.filename, a.duration;
```

## 6.3 Estrategia de Índices

### ¿Cuándo crear un índice?

```sql
-- ✅ CREAR ÍNDICE SI:
-- - Columna en WHERE frecuentemente
WHERE class_name = 'Nike'  -- ✅ idx_brand_metrics_class

-- - Columna en JOIN
JOIN analyses ON analysis_id = analyses.id  -- ✅ idx_brand_metrics_analysis

-- - Columna en ORDER BY
ORDER BY created_at DESC  -- ✅ idx_analyses_created_at

-- ❌ NO CREAR ÍNDICE SI:
-- - Tabla pequeña (< 1000 filas)
-- - Columna con pocos valores únicos (baja cardinalidad)
-- - Columna que cambia frecuentemente (muchos INSERT/UPDATE)
```

### Índices Compuestos

```sql
-- ❌ DOS ÍNDICES SIMPLES:
CREATE INDEX idx_class ON brand_metrics(class_name);
CREATE INDEX idx_analysis ON brand_metrics(analysis_id);

-- Query: WHERE class_name = 'Nike' AND analysis_id = 5
-- PostgreSQL solo usa uno de los índices

-- ✅ ÍNDICE COMPUESTO:
CREATE INDEX idx_class_analysis ON brand_metrics(class_name, analysis_id);

-- Query: WHERE class_name = 'Nike' AND analysis_id = 5
-- Usa el índice compuesto → 10x más rápido
```

## 6.4 Backups y Disaster Recovery

### Backup Manual

```bash
# Backup completo
pg_dump -U postgres -d Computer_vision_db > backup_$(date +%Y%m%d).sql

# Backup solo esquema
pg_dump -U postgres -d Computer_vision_db --schema-only > schema.sql

# Backup solo datos
pg_dump -U postgres -d Computer_vision_db --data-only > data.sql
```

### Restore

```bash
# Restaurar backup
psql -U postgres -d Computer_vision_db < backup_20260205.sql

# Crear DB nueva y restaurar
createdb -U postgres Computer_vision_db_restore
psql -U postgres -d Computer_vision_db_restore < backup_20260205.sql
```

### Backup Automático con Cron

```bash
# Agregar a crontab: crontab -e

# Backup diario a las 2 AM
0 2 * * * pg_dump -U postgres Computer_vision_db > /backups/db_$(date +\%Y\%m\%d).sql

# Limpiar backups > 30 días
0 3 * * * find /backups -name "db_*.sql" -mtime +30 -delete
```

## 6.5 Connection Pooling

**Problema:** Cada request abre nueva conexión → overhead 50-100ms

**Solución:** Pool de conexiones reutilizables

```python
# core/database.py
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

engine = create_engine(
    settings.DATABASE_URL,
    poolclass=QueuePool,
    pool_size=10,          # 10 conexiones permanentes
    max_overflow=20,       # Hasta 30 total (10 + 20)
    pool_pre_ping=True,    # Verificar conexión antes de usar
    pool_recycle=3600,     # Reciclar cada hora
)
```

**Benchmarks:**

| Métrica | Sin Pool | Con Pool |
|---------|----------|----------|
| Latencia promedio | 85ms | 12ms |
| Requests/segundo | 120 | 850 |
| Conexiones simultáneas | Ilimitadas | 30 máx |

---

# 7. MODELO YOLO - ENTRENAMIENTO CUSTOM

## 7.1 Dataset en Roboflow

### Proceso de Creación

```
1. RECOLECCIÓN DE IMÁGENES
   ├── Búsqueda en Google Images
   ├── Screenshots de vídeos
   ├── Logos oficiales de marcas
   └── Total: 2000+ imágenes

2. SUBIDA A ROBOFLOW
   ├── Crear proyecto "Logo Detection"
   ├── Upload batch de imágenes
   └── Organización por marcas

3. ANOTACIÓN (LABELING)
   ├── Herramienta: Roboflow Smart Polygon
   ├── Dibujar bounding boxes
   ├── Asignar clase (Nike, Adidas, etc.)
   └── Tiempo: ~30 segundos por imagen

4. AUGMENTATION (Data Augmentation)
   ├── Flip horizontal: ✅
   ├── Rotación: ±15°
   ├── Brillo: ±25%
   ├── Crop: 0-20%
   ├── Blur: hasta 1.5px
   └── Resultado: 2000 → 6000 imágenes

5. SPLIT DE DATOS
   ├── Train: 70% (1400 imágenes)
   ├── Validation: 20% (400 imágenes)
   └── Test: 10% (200 imágenes)

6. EXPORTAR
   ├── Formato: YOLOv8
   ├── Descargar ZIP
   └── Estructura: images/ + labels/
```

### Estructura de Archivos Roboflow

```
logos/
├── data.yaml              # Configuración del dataset
├── README.dataset.txt     # Metadata
├── README.roboflow.txt    # Info de Roboflow
├── train/
│   ├── images/
│   │   ├── adidas_001.jpg
│   │   ├── nike_045.jpg
│   │   └── ...
│   └── labels/
│       ├── adidas_001.txt  # Formato YOLO
│       ├── nike_045.txt
│       └── ...
├── valid/
│   ├── images/
│   └── labels/
└── test/
    ├── images/
    └── labels/
```

### Formato YOLO de Labels

```
# nike_045.txt
0 0.512 0.248 0.235 0.189
1 0.873 0.645 0.112 0.095

Formato: class_id center_x center_y width height
Valores: Normalizados 0-1

Ejemplo decodificado:
- Clase 0 (Nike)
- Centro: (51.2%, 24.8%) de la imagen
- Tamaño: 23.5% ancho, 18.9% alto
```

### data.yaml Explicado

```yaml
# yolo/data/logos/data.yaml

# Rutas absolutas
path: /path/to/logos
train: train/images
val: valid/images
test: test/images

# Clases (0-indexed)
names:
  0: Nike
  1: Adidas
  2: Puma
  3: UnderArmour
  4: Reebok
  5: NewBalance

# Metadata
nc: 6  # Número de clases
```

## 7.2 Entrenamiento del Modelo

### Script de Entrenamiento

```python
# training/train.py
from ultralytics import YOLO
import torch

# Verificar GPU
device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(f"Usando dispositivo: {device}")

# Cargar modelo pre-entrenado YOLOv8n (nano)
model = YOLO('yolov8n.pt')

# Entrenar
results = model.train(
    data='./data/logos/data.yaml',  # Path a config
    epochs=100,                      # Número de épocas
    imgsz=640,                       # Tamaño de imagen
    batch=16,                        # Batch size (ajustar según GPU)
    device=device,                   # cuda o cpu
    project='training',              # Directorio output
    name='logos_v15_stretch_640',    # Nombre del experimento
    patience=15,                     # Early stopping
    save=True,                       # Guardar checkpoints
    plots=True,                      # Generar gráficos
    
    # Hiperparámetros
    lr0=0.01,                        # Learning rate inicial
    lrf=0.01,                        # Learning rate final
    momentum=0.937,                  # Momentum SGD
    weight_decay=0.0005,             # Regularización L2
    warmup_epochs=3,                 # Epochs de warmup
    
    # Augmentation
    flipud=0.0,                      # Flip vertical (0 = nunca)
    fliplr=0.5,                      # Flip horizontal (50% chance)
    mosaic=1.0,                      # Mosaic augmentation
    mixup=0.0,                       # Mixup augmentation
    degrees=15.0,                    # Rotación ±15°
    translate=0.1,                   # Traslación ±10%
    scale=0.5,                       # Scale ±50%
    hsv_h=0.015,                     # Hue augmentation
    hsv_s=0.7,                       # Saturation
    hsv_v=0.4,                       # Value (brillo)
)

# Validar
metrics = model.val()

print(f"mAP50: {metrics.box.map50:.3f}")
print(f"mAP50-95: {metrics.box.map:.3f}")
print(f"Precision: {metrics.box.p:.3f}")
print(f"Recall: {metrics.box.r:.3f}")
```

### Ejecución

```bash
cd yolo/
python training/train.py

# O con Ultralytics CLI
yolo train data=data/logos/data.yaml model=yolov8n.pt epochs=100 imgsz=640
```

### Output de Entrenamiento

```
training/
└── logos_v15_stretch_640/
    ├── weights/
    │   ├── best.pt       # ⭐ Mejor modelo (mAP más alto)
    │   └── last.pt       # Último checkpoint
    ├── results.csv       # Métricas por época
    ├── args.yaml         # Hiperparámetros usados
    └── plots/
        ├── confusion_matrix.png
        ├── F1_curve.png
        ├── PR_curve.png
        ├── P_curve.png
        ├── R_curve.png
        └── results.png
```

## 7.3 Métricas de Evaluación

### mAP (mean Average Precision)

**Definición:**  
Mide qué tan bien el modelo detecta objetos Y clasifica correctamente.

```
Precision = TP / (TP + FP)
Recall = TP / (TP + FN)

AP = Área bajo curva Precision-Recall

mAP@0.5 = Promedio de AP para IoU ≥ 0.5
mAP@0.5:0.95 = Promedio para IoU de 0.5 a 0.95 (pasos de 0.05)
```

**Interpretación:**
- mAP@0.5 = 0.95 → 95% de detecciones correctas con 50% overlap
- mAP@0.5:0.95 = 0.75 → Bueno para aplicaciones reales

### Confusion Matrix

```
               Predicted
            Nike  Adidas  Puma  Background
Actual Nike  450    12     5      8
      Adidas  18   389     3     15
      Puma     7     9   312      6
      Backgr   3     2     1    542
```

**Análisis:**
- **Diagonal:** Predicciones correctas (450, 389, 312, 542)
- **Off-diagonal:** Confusiones (Nike clasificado como Adidas: 12)
- **Accuracy:** (450+389+312+542) / Total = 96.4%

### F1 Score

```
F1 = 2 * (Precision * Recall) / (Precision + Recall)

Ejemplo:
Precision = 0.95
Recall = 0.92
F1 = 2 * (0.95 * 0.92) / (0.95 + 0.92) = 0.935
```

**¿Cuándo es bueno?**
- F1 > 0.9: Excelente
- F1 > 0.8: Bueno
- F1 > 0.7: Aceptable
- F1 < 0.7: Necesita mejorar

## 7.4 Optimización del Modelo

### Transfer Learning Explicado

```python
# ❌ ENTRENAR DESDE CERO (malo):
model = YOLO()  # Red neuronal sin pesos
# Requiere 500K+ imágenes, 2 semanas de entrenamiento

# ✅ TRANSFER LEARNING (bueno):
model = YOLO('yolov8n.pt')  # Pre-entrenado en COCO (80 clases)
# Solo ajustar últimas capas para tus 6 clases
# Requiere 2K imágenes, 4 horas de entrenamiento
```

**Arquitectura YOLOv8:**
```
Input (640x640)
  ↓
Backbone (ConvNet pre-entrenado)
  ├─ Conv2D layers
  ├─ Batch Normalization
  └─ SiLU activation
  ↓
Neck (Feature Pyramid Network)
  ├─ Combina features multi-escala
  └─ Detecta objetos pequeños y grandes
  ↓
Head (Detection Head)
  ├─ Bounding box regression
  ├─ Classification (6 clases)
  └─ Objectness score
  ↓
Output: [x, y, w, h, class, confidence]
```

### Early Stopping

```python
# Evita overfitting

Época 1: val_loss = 0.85
Época 2: val_loss = 0.72
Época 3: val_loss = 0.68
Época 4: val_loss = 0.67  ← Mejor
Época 5: val_loss = 0.68
Época 6: val_loss = 0.69
...
Época 19: val_loss = 0.71  ← 15 épocas sin mejorar
→ STOP

# Guardar best.pt de época 4
```

### Hiperparámetros Críticos

| Parámetro | Valor | Efecto |
|-----------|-------|--------|
| `batch` | 16 | Mayor = más rápido, requiere más RAM |
| `imgsz` | 640 | Mayor = más precisión, más lento |
| `lr0` | 0.01 | Mayor = convergencia rápida pero inestable |
| `patience` | 15 | Cuántas épocas sin mejorar antes de parar |
| `mosaic` | 1.0 | Combina 4 imágenes → mejor generalización |

---

Continuará en PARTE 3...
