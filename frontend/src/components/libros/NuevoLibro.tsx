import { useEffect, useState } from "react";
import axios from "axios";

interface Autor {
  id: number;
  nombre: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

function NuevoLibro() {
  const [titulo, setTitulo] = useState("");
  const [autorId, setAutorId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [anioPublicacion, setAnioPublicacion] = useState("");
  const [estado, setEstado] = useState("pendiente");

  const [autores, setAutores] = useState<Autor[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/autores").then(res => setAutores(res.data));
    axios.get("http://localhost:3000/api/categorias").then(res => setCategorias(res.data));
  }, []);

  const guardar = async () => {
    if (!titulo || !autorId || !categoriaId) {
      alert("Título, autor y categoría son obligatorios");
      return;
    }

    await axios.post(
      "http://localhost:3000/api/libros",
      {
        titulo,
        autorId,
        categoriaId,
        anioPublicacion: anioPublicacion ? Number(anioPublicacion) : null,
        estado
      }
    );
    alert("Libro agregado");
    setTitulo("");
    setAutorId("");
    setCategoriaId("");
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
      <select
        className="form-select mb-2"
        value={autorId}
        onChange={e => setAutorId(e.target.value)}
      >
        <option value="">Seleccionar autor...</option>
        {autores.map(autor => (
          <option key={autor.id} value={autor.id}>{autor.nombre}</option>
        ))}
      </select>
      <select
        className="form-select mb-2"
        value={categoriaId}
        onChange={e => setCategoriaId(e.target.value)}
      >
        <option value="">Seleccionar categoría...</option>
        {categorias.map(categoria => (
          <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
        ))}
      </select>
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
      <p className="mt-3">
        ¿El autor o la categoría no existen todavía?{" "}
        <a href="/catalogo">Agregalos acá</a>.
      </p>
    </div>
  );
}

export default NuevoLibro;
