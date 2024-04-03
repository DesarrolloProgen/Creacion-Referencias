import "./App.css";
import CreateReference from "./pages/CreateReference/createreference";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route,  } from "react-router-dom";
import { Structure } from "./pages/Structures/Structure";
function App() {
  return (
    <div>
      <header className="main-header">
        <Link to="/create-reference">Crear Referencia</Link>
        <Link to="/modify-structure">Crear/Modificar Estructura</Link>
      </header>

      <Routes>
        <Route path="/create-reference" element={<CreateReference />}> 
          
        </Route>
        <Route path="/modify-structure" element={<Structure/>}>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
