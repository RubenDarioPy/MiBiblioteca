import { useEffect, useState } from "react";
import axios from "axios";

interface Categoria {
  id: number;
  nombre: string;
}

function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nombre, setNombre] = useState("");

  const cargarCategorias = () => {
    axios.get("http://localhost:3000/api/categorias").then(res => setCategorias(res.data));
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const guardar = async () => {
    if (!nombre) {
      alert("El nombre de la categoría es obligatorio");
      return;
    }
    await axios.post("http://localhost:3000/api/categorias", { nombre });
    setNombre("");
    cargarCategorias();
  };

  return (
    <div>
      <h2>Categorías</h2>
      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Nombre de la categoría"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <button className="btn btn-primary text-nowrap" onClick={guardar}>
          Agregar
        </button>
      </div>
      <ul className="list-group">
        {categorias.map(categoria => (
          <li key={categoria.id} className="list-group-item">
            {categoria.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categorias;
