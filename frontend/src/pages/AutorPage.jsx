import { useNavigate } from "react-router-dom";
import Autor from "../components/Autor";
import { getId } from "../utils/normalizador";
import { useState, useEffect } from "react";


const AutorPage = (props) => {
    //Se trae la lista de estudiantesw
    const { autores, onEliminar } = props;
    const [listaAutores, setListaAutores] = useState([]);

    //Para usar la funcion
    const navegar = useNavigate()

    useEffect(() => {
        if (autores) {
            setListaAutores(autores);
        }
    }, [autores]);

    return (
        <div>
            <h1>Autores</h1>
            <button onClick={() => navegar("/autores/nuevo")}>+</button>
            <hr />
            {
                listaAutores.map((autor) => {
                    const id = getId(autor)
                    return (<div key={id}> <Autor nombre={autor.nombre}/>
                        <button onClick={() => navegar(`/autores/${id}/detalle`)}>Detalle</button>
                        <span>   </span>
                        <button onClick={() => onEliminar(id)}
                            >Eliminar</button>
                        <h3>--------------------------------------------------------------------------</h3>
                    </div>
                    )
                })
            }
        </div>
    )
}
export default AutorPage;