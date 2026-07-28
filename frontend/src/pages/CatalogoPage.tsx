import { Link } from "react-router-dom";
import Autores from "../components/autores/Autores";
import Categorias from "../components/categorias/Categorias";

function CatalogoPage() {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h1>Catálogo</h1>
        <Link to="/libros" className="btn btn-outline-secondary">
          Volver a Mis Libros
        </Link>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <Autores />
        </div>
        <div className="col-md-6">
          <Categorias />
        </div>
      </div>
    </div>
  );
}

export default CatalogoPage;
