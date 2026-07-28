import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LibrosPage from "./pages/LibrosPage";
import NuevoLibroPage from "./pages/NuevoLibroPage";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
