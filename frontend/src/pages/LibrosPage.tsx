import { Link } from "react-router-dom";
import LibrosFetch from "../components/libros/LibrosFetch";

function LibrosPage() {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h1>MiBiblioteca</h1>
        <div>
          <Link
            to="/catalogo"
            className="btn btn-outline-secondary me-2"
          >
            Autores y Categorías
          </Link>
          <Link
            to="/libros/nuevo"
            className="btn btn-primary"
          >
            Nuevo Libro
          </Link>
        </div>
      </div>
      <hr />
      <LibrosFetch />
    </div>
  );
}

export default LibrosPage;
