# 🐳 Guía de Docker - Detección de Logos

## 📋 Requisitos Previos

- Docker Desktop instalado
- Docker Compose v2.0+
- Al menos 4GB de RAM disponible
- Puerto 80, 8000 y 5432 libres

## 🚀 Inicio Rápido

### 1. Clonar el repositorio

```bash
git clone <tu-repo>
cd PROYECTO-COMPUTER-VISION---Deteccion-de-Objetos
```

### 2. Levantar los servicios

```bash
docker-compose up -d
```

Este comando:
- ✅ Descarga las imágenes necesarias (postgres, node, python)
- ✅ Construye backend y frontend
- ✅ Crea la base de datos PostgreSQL
- ✅ Inicia todos los servicios

### 3. Verificar que todo funciona

```bash
docker-compose ps
```

Deberías ver:
```
logo_detection_backend    running
logo_detection_frontend   running
logo_detection_db         running
```

### 4. Acceder a la aplicación

- 🌐 **Frontend**: http://localhost
- 🔧 **Backend API**: http://localhost:8000
- 📖 **Docs API**: http://localhost:8000/docs

## 🛠️ Comandos Útiles

### Ver logs en tiempo real

```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo frontend
docker-compose logs -f frontend
```

### Reiniciar servicios

```bash
# Todos
docker-compose restart

# Solo backend
docker-compose restart backend
```

### Detener servicios

```bash
# Detener pero mantener datos
docker-compose stop

# Detener y eliminar contenedores (mantiene volúmenes)
docker-compose down

# Eliminar TODO (incluyendo base de datos)
docker-compose down -v
```

### Reconstruir imágenes

Si cambias código:

```bash
# Reconstruir todo
docker-compose up -d --build

# Reconstruir solo backend
docker-compose up -d --build backend
```

### Acceder a un contenedor

```bash
# Backend
docker exec -it logo_detection_backend bash

# Base de datos
docker exec -it logo_detection_db psql -U logouser -d logo_detection
```

## 📁 Estructura de Volúmenes

```yaml
volumes:
  - ./backend/app:/app/app              # Hot reload backend
  - ./backend/temp:/app/temp            # Vídeos temporales
  - ./yolo/training/.../weights:/models # Modelo YOLO (read-only)
  - postgres_data:/var/lib/postgresql/data  # Datos de DB (persistentes)
```

## 🔧 Configuración

### Variables de Entorno

Configuradas en `docker-compose.yml`:

```yaml
DATABASE_URL: postgresql://logouser:logopass@postgres:5432/logo_detection
MODEL_PATH: /models/best.pt
CONF_THRESHOLD: 0.4
IMG_SIZE: 640
```

### Puertos

| Servicio  | Puerto Host | Puerto Contenedor |
|-----------|-------------|-------------------|
| Frontend  | 80          | 80                |
| Backend   | 8000        | 8000              |
| PostgreSQL| 5432        | 5432              |

## 🐛 Troubleshooting

### Error: "puerto ya en uso"

```bash
# Verificar qué usa el puerto
netstat -ano | findstr :8000

# Cambiar puerto en docker-compose.yml
ports:
  - "8001:8000"  # host:contenedor
```

### Error: "modelo no encontrado"

Verificar que existe:
```
yolo/training/logos_v15_stretch_640/weights/best.pt
```

### Error: conexión a base de datos

```bash
# Verificar logs de postgres
docker-compose logs postgres

# Recrear contenedor de DB
docker-compose down
docker-compose up -d postgres
```

### Limpiar todo y empezar de cero

```bash
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

## 📊 Monitoreo

### Uso de recursos

```bash
docker stats
```

### Espacio en disco

```bash
docker system df
```

## 🚀 Producción

Para deploy en producción:

1. **Cambiar contraseñas** en `docker-compose.yml`
2. **Usar secretos** de Docker/Kubernetes
3. **Habilitar SSL** (Nginx + Let's Encrypt)
4. **Configurar backups** de PostgreSQL
5. **Limitar recursos**:

```yaml
backend:
  deploy:
    resources:
      limits:
        cpus: '2'
        memory: 4G
```

## 📝 Notas

- ✅ Hot reload habilitado en desarrollo
- ✅ Base de datos persiste entre reinicios
- ✅ Modelo YOLO montado como read-only
- ✅ Nginx optimizado con gzip y cache
- ⚠️ No usar contraseñas por defecto en producción

## 🆘 Soporte

Si algo no funciona:

1. Verificar logs: `docker-compose logs -f`
2. Verificar estado: `docker-compose ps`
3. Recrear servicios: `docker-compose down && docker-compose up -d`
