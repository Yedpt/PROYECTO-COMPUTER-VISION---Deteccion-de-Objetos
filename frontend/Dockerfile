# Frontend Dockerfile - React + Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Build de producción
RUN npm run build

# Etapa de producción con nginx
FROM nginx:alpine

# Copiar build al directorio de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración custom de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
