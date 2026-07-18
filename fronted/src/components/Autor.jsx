//Para mostrar a un solo estudiante en toda la lista

const Autor = (props) => {
    const {nombre} = props

    return(
        <div>
            <h2>{nombre}</h2>
            
        </div>
    )
}

export default Autor;