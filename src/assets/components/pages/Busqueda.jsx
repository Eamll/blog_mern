import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { Global } from '../../../helpers/Global';
import { PeticionAjax } from '../../../helpers/PeticionAjax';
import { Listado } from './Listado';



export const Busqueda = () => {
    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const params = useParams();

    useEffect(() => {
        conseguirArticulos();
    }, []);

    useEffect(() => {
        conseguirArticulos();
    }, [params]);

    const conseguirArticulos = async () => {

        const { datos, cargando } = await PeticionAjax(Global.url + "buscar/" + params.busqueda, "GET");

        if (datos.status === "success") {
            setArticulos(datos.articulos);
        } else {
            setArticulos([]);
        }
        setCargando(false);
    }

    return (
        <>
            {cargando ? "Cargando..." :
                (
                    articulos.length >= 1 ?
                        <Listado articulos={articulos} setArticulos={setArticulos} />
                        : <h1>No hay articulos</h1>
                )
            }
        </>
    )
}
