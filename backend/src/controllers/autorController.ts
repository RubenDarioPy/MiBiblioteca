import { Request, Response } from "express";
import { prisma } from "../db/prisma";

export const obtenerAutores = async (
  req: Request,
  res: Response
) => {
  const autores = await prisma.autor.findMany({
    orderBy: { nombre: "asc" }
  });
  res.json(autores);
};

export const crearAutor = async (
  req: Request,
  res: Response
) => {
  const { nombre, nacionalidad } = req.body;

  if (!nombre) {
    return res.status(400).json({
      mensaje: "El nombre del autor es obligatorio"
    });
  }

  const autor = await prisma.autor.create({
    data: { nombre, nacionalidad }
  });

  res.status(201).json(autor);
};
