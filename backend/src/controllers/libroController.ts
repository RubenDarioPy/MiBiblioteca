import { Request, Response } from "express";
import { prisma } from "../db/prisma";

// GET /api/libros
export const obtenerLibros = async (
  req: Request,
  res: Response
) => {
  const libros = await prisma.libro.findMany({
    include: {
      autor: true,
      categoria: true
    },
    orderBy: { createdAt: "desc" }
  });
  res.json(libros);
};

// GET /api/libros/:id
export const obtenerLibroPorId = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const libro = await prisma.libro.findUnique({
    where: { id },
    include: {
      autor: true,
      categoria: true
    }
  });

  if (!libro) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }

  res.json(libro);
};

// POST /api/libros
export const crearLibro = async (
  req: Request,
  res: Response
) => {
  const {
    titulo,
    autorId,
    categoriaId,
    anioPublicacion,
    portadaUrl,
    estado,
    calificacion,
    comentario
  } = req.body;

  if (!titulo || !autorId || !categoriaId) {
    return res.status(400).json({
      mensaje: "Título, autor y categoría son obligatorios"
    });
  }

  const autor = await prisma.autor.findUnique({ where: { id: Number(autorId) } });
  if (!autor) {
    return res.status(400).json({ mensaje: "El autor seleccionado no existe" });
  }

  const categoria = await prisma.categoria.findUnique({ where: { id: Number(categoriaId) } });
  if (!categoria) {
    return res.status(400).json({ mensaje: "La categoría seleccionada no existe" });
  }

  const libro = await prisma.libro.create({
    data: {
      titulo,
      autorId: Number(autorId),
      categoriaId: Number(categoriaId),
      anioPublicacion: anioPublicacion ? Number(anioPublicacion) : null,
      portadaUrl,
      estado: estado || "pendiente",
      calificacion: calificacion ? Number(calificacion) : null,
      comentario
    },
    include: {
      autor: true,
      categoria: true
    }
  });

  res.status(201).json(libro);
};

// PUT /api/libros/:id
export const actualizarLibro = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);
  const {
    titulo,
    autorId,
    categoriaId,
    anioPublicacion,
    portadaUrl,
    estado,
    calificacion,
    comentario
  } = req.body;

  if (!titulo || !autorId || !categoriaId) {
    return res.status(400).json({
      mensaje: "Título, autor y categoría son obligatorios"
    });
  }

  const libroExiste = await prisma.libro.findUnique({ where: { id } });
  if (!libroExiste) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }

  const libro = await prisma.libro.update({
    where: { id },
    data: {
      titulo,
      autorId: Number(autorId),
      categoriaId: Number(categoriaId),
      anioPublicacion: anioPublicacion ? Number(anioPublicacion) : null,
      portadaUrl,
      estado,
      calificacion: calificacion ? Number(calificacion) : null,
      comentario
    },
    include: {
      autor: true,
      categoria: true
    }
  });

  res.json(libro);
};

// DELETE /api/libros/:id
export const eliminarLibro = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const libroExiste = await prisma.libro.findUnique({ where: { id } });
  if (!libroExiste) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }

  await prisma.libro.delete({ where: { id } });

  res.json({ mensaje: "Libro eliminado" });
};
