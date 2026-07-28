import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Autor {
  id: number;
  nombre: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

interface Libro {
  id: number;
  titulo: string;
  anioPublicacion: number | null;
  estado: string;
  autor: Autor;
  categoria: Categoria;
}

function EditarLibro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [autorId, setAutorId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [anioPublicacion, setAnioPublicacion] = useState("");
  const [estado, setEstado] = useState("pendiente");

  const [autores, setAutores] = useState<Autor[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Cargar autores, categorías y datos del libro
  useEffect(() => {
    axios.get("http://localhost:3000/api/autores").then(res => setAutores(res.data));
    axios.get("http://localhost:3000/api/categorias").then(res => setCategorias(res.data));

    const obtenerLibro = async () => {
      const respuesta = await axios.get<Libro>(
        `http://localhost:3000/api/libros/${id}`
      );
      setTitulo(respuesta.data.titulo);
      setAutorId(String(respuesta.data.autor.id));
      setCategoriaId(String(respuesta.data.categoria.id));
      setAnioPublicacion(
        respuesta.data.anioPublicacion ? String(respuesta.data.anioPublicacion) : ""
      );
      setEstado(respuesta.data.estado);
    };
    obtenerLibro();
  }, [id]);

  const actualizar = async () => {
    await axios.put(
      `http://localhost:3000/api/libros/${id}`,
      {
        titulo,
        autorId,
        categoriaId,
        anioPublicacion: anioPublicacion ? Number(anioPublicacion) : null,
        estado
      }
    );
    alert("Libro actualizado correctamente");
    navigate("/libros");
  };

  return (
    <div>
      <h2>Editar Libro</h2>
      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Autor</label>
        <select
          className="form-select"
          value={autorId}
          onChange={e => setAutorId(e.target.value)}
        >
          <option value="">Seleccionar autor...</option>
          {autores.map(autor => (
            <option key={autor.id} value={autor.id}>{autor.nombre}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <select
          className="form-select"
          value={categoriaId}
          onChange={e => setCategoriaId(e.target.value)}
        >
          <option value="">Seleccionar categoría...</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Año de publicación</label>
        <input
          type="text"
          className="form-control"
          value={anioPublicacion}
          onChange={e => setAnioPublicacion(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Estado</label>
        <select
          className="form-select"
          value={estado}
          onChange={e => setEstado(e.target.value)}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en_progreso">En progreso</option>
          <option value="leido">Leído</option>
        </select>
      </div>
      <button className="btn btn-success" onClick={actualizar}>
        Guardar cambios
      </button>
    </div>
  );
}

export default EditarLibro;
