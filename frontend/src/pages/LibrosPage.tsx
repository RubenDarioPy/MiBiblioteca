import { Link } from "react-router-dom";
import LibrosFetch from "../components/libros/LibrosFetch";

function LibrosPage() {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h1>MiBiblioteca</h1>
        <Link
          to="/libros/nuevo"
          className="btn btn-primary"
        >
          Nuevo Libro
        </Link>
      </div>
      <hr />
      <LibrosFetch />
    </div>
  );
}

export default LibrosPage;
