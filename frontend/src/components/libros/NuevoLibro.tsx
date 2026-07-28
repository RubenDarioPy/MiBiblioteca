import { useState } from "react";
import axios from "axios";

function NuevoLibro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [anioPublicacion, setAnioPublicacion] = useState("");
  const [estado, setEstado] = useState("pendiente");

  const guardar = async () => {
    await axios.post(
      "http://localhost:3000/api/libros",
      {
        titulo,
        autor,
        genero,
        anioPublicacion: anioPublicacion ? Number(anioPublicacion) : null,
        estado
      }
    );
    alert("Libro agregado");
    setTitulo("");
    setAutor("");
    setGenero("");
    setAnioPublicacion("");
    setEstado("pendiente");
  };

  return (
    <div>
      <h2>Nuevo Libro</h2>
      <input
        className="form-control mb-2"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Autor"
        value={autor}
        onChange={e => setAutor(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Género"
        value={genero}
        onChange={e => setGenero(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Año de publicación"
        value={anioPublicacion}
        onChange={e => setAnioPublicacion(e.target.value)}
      />
      <select
        className="form-select mb-3"
        value={estado}
        onChange={e => setEstado(e.target.value)}
      >
        <option value="pendiente">Pendiente</option>
        <option value="en_progreso">En progreso</option>
        <option value="leido">Leído</option>
      </select>
      <button className="btn btn-primary" onClick={guardar}>
        Guardar
      </button>
    </div>
  );
}

export default NuevoLibro;
