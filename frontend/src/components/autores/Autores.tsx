import { useEffect, useState } from "react";
import axios from "axios";

interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string | null;
}

function Autores() {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [nombre, setNombre] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");

  const cargarAutores = () => {
    axios.get("http://localhost:3000/api/autores").then(res => setAutores(res.data));
  };

  useEffect(() => {
    cargarAutores();
  }, []);

  const guardar = async () => {
    if (!nombre) {
      alert("El nombre del autor es obligatorio");
      return;
    }
    await axios.post("http://localhost:3000/api/autores", { nombre, nacionalidad });
    setNombre("");
    setNacionalidad("");
    cargarAutores();
  };

  return (
    <div>
      <h2>Autores</h2>
      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Nombre del autor"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <input
          className="form-control"
          placeholder="Nacionalidad (opcional)"
          value={nacionalidad}
          onChange={e => setNacionalidad(e.target.value)}
        />
        <button className="btn btn-primary text-nowrap" onClick={guardar}>
          Agregar
        </button>
      </div>
      <ul className="list-group">
        {autores.map(autor => (
          <li key={autor.id} className="list-group-item">
            {autor.nombre}
            {autor.nacionalidad ? ` · ${autor.nacionalidad}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Autores;
