import { Router } from "express";
import {
  obtenerCategorias,
  crearCategoria
} from "../controllers/categoriaController";

const router = Router();

router.get("/", obtenerCategorias);
router.post("/", crearCategoria);

export default router;
