import { useEffect, useState } from "react";

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  genero: string | null;
  anioPublicacion: number | null;
  estado: string;
}

function LibrosFetch() {
  const [libros, setLibros] = useState<Libro[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/libros")
      .then(res => res.json())
      .then(data => setLibros(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Mis Libros</h2>
      {libros.length === 0 ? (
        <p>No hay libros registrados todavía.</p>
      ) : (
        <ul className="list-group">
          {libros.map(libro => (
            <li key={libro.id} className="list-group-item">
              <strong>{libro.titulo}</strong> — {libro.autor}
              {libro.genero ? ` · ${libro.genero}` : ""}
              {libro.anioPublicacion ? ` · ${libro.anioPublicacion}` : ""}
              {" "}
              <span className="badge bg-secondary">{libro.estado}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LibrosFetch;
