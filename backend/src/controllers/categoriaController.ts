import { Request, Response } from "express";
import { prisma } from "../db/prisma";

export const obtenerCategorias = async (
  req: Request,
  res: Response
) => {
  const categorias = await prisma.categoria.findMany({
    orderBy: { nombre: "asc" }
  });
  res.json(categorias);
};

export const crearCategoria = async (
  req: Request,
  res: Response
) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({
      mensaje: "El nombre de la categoría es obligatorio"
    });
  }

  const existe = await prisma.categoria.findUnique({ where: { nombre } });
  if (existe) {
    return res.status(400).json({
      mensaje: "Esa categoría ya existe"
    });
  }

  const categoria = await prisma.categoria.create({
    data: { nombre }
  });

  res.status(201).json(categoria);
};
