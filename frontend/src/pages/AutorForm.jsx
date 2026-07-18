import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutorForm = (props) => {
    //Recibir funciones de props
    const { onAgregar, onEditar, onGetAutor } = props;


    //Para navegar entre pagin
    const navegar = useNavigate();

    /* Para cuando se edite un Estudiante */
    const { id } = useParams();
    const editar = !!id;

    //Setear Errores
    const [errorNombre, setError] = useState("");

    //Objeto con el nuevo Estudiante
    const [nuevoAutor, setNuevoAutor] = useState({
        nombre: ""
    });

    //Para cargar los datos del estudiante
    useEffect(() => {
        if (editar) {
            onGetAutor(id)
                .then(res => setNuevoAutor({ ...res.data }))
        }
    }, [id]);

    //Funcion para enviar el formulario
    const handlerSubmit = (e) => {
        e.preventDefault();
        if ((nuevoAutor.nombre.length >= 3)) {
            if (editar) {
                onEditar(nuevoAutor)
                    .then(() => {
                        setError("")
                        setNuevoAutor({ id: "", nombre: ""})
                        navegar("/autores")
                    })
                    .catch((mensaje) => setError(mensaje));
            }
            else {
                onAgregar(nuevoAutor)
                    .then(() => {
                        setError("")
                        setNuevoAutor({ id: "", nombre: ""})
                        navegar("/autores")
                    })
                    .catch((mensaje) => setError(mensaje));
            }
        }
        //Para hacer las validaciones
        if (nuevoAutor.nombre.length <= 3) {
            setError("El nombre debe tener 3 caracteres minimo")
        } else {
            setError("")
        }
        

    }
    return (
        <div>
            <h1>
                {editar ? "Editar Autor" : "Registrar Autor"}
            </h1>
            <button onClick={() => navegar("/autores")}>←</button>
            <hr />
            <form onSubmit={handlerSubmit}>
                <div>
                    <label htmlFor="autNombre">Nombre:</label>
                    <input
                        type="text"
                        name="autNombre"
                        id="autNombre"
                        value={nuevoAutor.nombre}
                        onChange={(e) => setNuevoAutor({ ...nuevoAutor, nombre: e.target.value })}
                        placeholder="Ingresa nombre" required />
                </div>
                <div style={{ color: "red" }}>
                    {errorNombre}
                </div>
                
                <div>
                    <input type="submit" value="Registrar"/>
                </div>
            </form>
        </div>
    )
}

export default AutorForm;