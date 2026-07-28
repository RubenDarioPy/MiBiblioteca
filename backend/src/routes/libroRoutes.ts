import { Router } from "express";
import {
  obtenerLibros,
  crearLibro
} from "../controllers/libroController";

const router = Router();

router.get("/", obtenerLibros);
router.post("/", crearLibro);

export default router;
