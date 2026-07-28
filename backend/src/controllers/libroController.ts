import { Request, Response } from "express";
import { prisma } from "../db/prisma";

export const obtenerLibros = async (
  req: Request,
  res: Response
) => {
  const libros = await prisma.libro.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(libros);
};

export const crearLibro = async (
  req: Request,
  res: Response
) => {
  const {
    titulo,
    autor,
    genero,
    anioPublicacion,
    portadaUrl,
    estado,
    calificacion,
    comentario
  } = req.body;

  const libro = await prisma.libro.create({
    data: {
      titulo,
      autor,
      genero,
      anioPublicacion,
      portadaUrl,
      estado: estado || "pendiente",
      calificacion,
      comentario
    }
  });

  res.status(201).json(libro);
};
