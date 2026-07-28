# MiBiblioteca — Primer Módulo Funcional

Primera entrega del Proyecto Integrador Full-Stack. Módulo de **listado y
creación de libros**, integrando backend (Node.js + Express + TypeScript +
PostgreSQL/Prisma) y frontend (React + TypeScript + Vite).

## Estructura

```
MiBiblioteca/
├── backend/     → API REST (arquitectura MVC)
└── frontend/    → Aplicación React
```

## 1. Backend

```bash
cd backend
npm install
```

El archivo `.env` ya está incluido en este repositorio con una configuración
de ejemplo:

```
DATABASE_URL="postgresql://postgres:1234@localhost:5432/mibiblioteca"
```

> **Nota:** estas son credenciales de desarrollo local, no de producción.
> Se incluyen en el repositorio únicamente para simplificar la entrega y
> ejecución del proyecto en este contexto académico. Si tu PostgreSQL local
> tiene otro usuario, contraseña o puerto, editá el valor de
> `DATABASE_URL` en este archivo antes de continuar. En un proyecto real
> nunca se sube el `.env` a un repositorio.

Crear la base de datos y generar el cliente:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Levantar el servidor:

```bash
npm run dev
```

El servidor queda disponible en `http://localhost:3000`.

Endpoints:
- `GET  /api/libros` → lista de libros
- `POST /api/libros` → crea un libro

## 2. Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Abrir `http://localhost:5173`. La app redirige a `/libros` (listado) y
tiene un botón "Nuevo Libro" que lleva a `/libros/nuevo` (formulario).

## Modelo de datos (Libro)

| Campo           | Tipo     |
|-----------------|----------|
| id              | Int (PK) |
| titulo          | String   |
| autor           | String   |
| genero          | String?  |
| anioPublicacion | Int?     |
| portadaUrl      | String?  |
| estado          | String (default "pendiente") |
| calificacion    | Int?     |
| comentario      | String?  |
| createdAt       | DateTime |
