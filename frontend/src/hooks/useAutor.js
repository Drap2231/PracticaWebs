import { useState, useEffect } from "react";
import { api } from "../utils/api"
import { getId } from "../utils/normalizador";

//Gestionar el estado y las conexiones a la API que afecta al estado
export const useAutor = () => {
    //Variable de estado
    const [autores, setAutores] = useState([]);
    //Para renderizar por primera vez
    useEffect(() => {
        
        api.get("/api/autores")
            .then((res) => {
                setAutores(res.data)
            })
            .catch((err) => {
                const mensaje = err.response?.data?.message ?? "Error al cargar autores";
                throw mensaje;
            })
    }, [])

    //Para agregar nuevo Autor
    const agregarAutor = (nuevoAutor) => {
        return api.post("/api/autores", nuevoAutor)
            .then((res) => {
                setAutores(prev => ([...prev, res.data]))
            })
            .catch((err) => {
                const mensaje = err.response?.data?.message ?? "Error al registrar";
                throw mensaje;
            })

    }

    const eliminarAutor = (id) => {
        
        api.delete(`/api/autores/${id}`)

            .then(() => {
                console.log("Autor eliminado", id)
                setAutores(prev => prev.filter(e => getId(e) !== id))
            })
            .catch(err => {
                const mensaje = err.response?.data?.message ?? "Error al eliminar al autor";
                throw mensaje;
            })
    }

    const editarAutor = (editadoAutor) => {
        const id = getId(editadoAutor)
        return api.put(`/api/autores/${id}`, editadoAutor)
            .then(res => setAutores(prev =>
                prev.map(e => getId(e) === id ? res.data : e)
            ))
            .catch((err) => {
                const mensaje = err.response?.data?.message ?? "Error al editar el autor";
                throw mensaje;
            })
    }

    const getAutor = (id) => {
        return api.get(`/api/autores/${id}`)
            .then(res => res)
            .catch((err) => {
                const mensaje = err.response?.data?.message ?? "Error al obtener los datos del autor";
                throw mensaje;
            })
    }
    return { autores, agregarAutor, eliminarAutor, editarAutor, getAutor };
}
