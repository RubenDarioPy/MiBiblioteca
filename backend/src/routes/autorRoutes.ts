import { Router } from "express";
import {
  obtenerAutores,
  crearAutor
} from "../controllers/autorController";

const router = Router();

router.get("/", obtenerAutores);
router.post("/", crearAutor);

export default router;
