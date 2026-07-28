import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LibrosPage from "./pages/LibrosPage";
import NuevoLibroPage from "./pages/NuevoLibroPage";
import EditarLibroPage from "./pages/EditarLibroPage";
import CatalogoPage from "./pages/CatalogoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/libros" />}
        />
        <Route
          path="/libros"
          element={<LibrosPage />}
        />
        <Route
          path="/libros/nuevo"
          element={<NuevoLibroPage />}
        />
        <Route
          path="/libros/editar/:id"
          element={<EditarLibroPage />}
        />
        <Route
          path="/catalogo"
          element={<CatalogoPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
