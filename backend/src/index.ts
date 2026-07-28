import express from "express";
import cors from "cors";
import libroRoutes from "./routes/libroRoutes";
import { logger } from "./middlewares/logger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Backend de MiBiblioteca funcionando");
});

app.use("/api/libros", libroRoutes);

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
