import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

function LibrosFetch() {
  const [libros, setLibros] = useState<Libro[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/libros")
      .then(res => res.json())
      .then(data => setLibros(data))
      .catch(error => console.log(error));
  }, []);

  const eliminarLibro = async (id: number) => {
    const confirmar = window.confirm("¿Desea eliminar este libro?");
    if (confirmar) {
      await axios.delete(`http://localhost:3000/api/libros/${id}`);
      // Actualizar la lista sin volver a consultar
      setLibros(libros.filter(libro => libro.id !== id));
    }
  };

  return (
    <div>
      <h2>Mis Libros</h2>
      {libros.length === 0 ? (
        <p>No hay libros registrados todavía.</p>
      ) : (
        <ul className="list-group">
          {libros.map(libro => (
            <li
              key={libro.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{libro.titulo}</strong> — {libro.autor.nombre}
                {" · "}{libro.categoria.nombre}
                {libro.anioPublicacion ? ` · ${libro.anioPublicacion}` : ""}
                {" "}
                <span className="badge bg-secondary">{libro.estado}</span>
              </div>
              <div>
                <Link
                  to={`/libros/editar/${libro.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Editar
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarLibro(libro.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LibrosFetch;
