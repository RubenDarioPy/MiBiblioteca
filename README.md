# MiBiblioteca

Proyecto Integrador Full-Stack. 

## Estructura

```
MiBiblioteca/
├── backend/     → API REST (arquitectura MVC)
└── frontend/    → Aplicación React
```

## Modelo de datos

```
Autor 1 ──< N Libro
Categoria 1 ──< N Libro
```

| Entidad   | Campos                                                        |
|-----------|----------------------------------------------------------------|
| Autor     | id, nombre, nacionalidad?                                     |
| Categoria | id, nombre (único)                                             |
| Libro     | id, titulo, autorId (FK), categoriaId (FK), anioPublicacion?, portadaUrl?, estado (default "pendiente"), calificacion?, comentario?, createdAt |

## 1. Backend

```bash
cd backend
npm install
```

El `.env` ya incluye una configuración de desarrollo local:

```
DATABASE_URL="postgresql://postgres:1234@localhost:5432/mibiblioteca"
```

> Ajustá usuario/contraseña/puerto si tu PostgreSQL local es distinto.

Aplicar la migración con las nuevas relaciones y generar el cliente:

```bash
npx prisma migrate dev --name relaciones_autor_categoria
npx prisma generate
```

Levantar el servidor:

```bash
npm run dev
```

Disponible en `http://localhost:3000`.

### Endpoints

| Método | Ruta                  | Descripción                          |
|--------|------------------------|---------------------------------------|
| GET    | /api/libros            | Lista libros (con autor y categoría) |
| GET    | /api/libros/:id        | Obtiene un libro por id              |
| POST   | /api/libros            | Crea un libro (valida autor/categoría existentes) |
| PUT    | /api/libros/:id        | Actualiza un libro                   |
| DELETE | /api/libros/:id        | Elimina un libro                     |
| GET    | /api/autores           | Lista autores                        |
| POST   | /api/autores           | Crea un autor                        |
| GET    | /api/categorias        | Lista categorías                     |
| POST   | /api/categorias        | Crea una categoría (valida duplicados) |

## 2. Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Abrir `http://localhost:5173`.

### Rutas de la aplicación

- `/libros` → listado de libros, con botones Editar / Eliminar
- `/libros/nuevo` → formulario de creación (selecciona autor y categoría)
- `/libros/editar/:id` → formulario de edición
- `/catalogo` → gestión de Autores y Categorías (listar + crear)

> **Nota:** antes de cargar un libro necesitás al menos un Autor y una
> Categoría creados desde `/catalogo`.
