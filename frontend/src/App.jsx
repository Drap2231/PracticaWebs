import './App.css'
import { BrowserRouter, Routes, Route, UNSAFE_RSCDefaultRootErrorBoundary } from "react-router-dom";

import { useAutor } from './hooks/useAutor';
import AutorForm from './pages/AutorForm';
import AutorPage from './pages/AutorPage';

function App() {
  const { autores, agregarAutor, eliminarAutor, editarAutor, getAutor } = useAutor();
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/autores" element={<AutorPage estudiantes={autores} onEliminar={eliminarAutor} /> }></Route>
        <Route path="/autores/nuevo" element={<AutorForm onAgregar={agregarAutor} />}></Route>
        <Route path="/autores/:id/editar" element={<AutorForm onEditar={editarAutor} onGetAutor={getAutor} />}></Route>
  
      </Routes >
    </BrowserRouter >
  )
}

export default App
