import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { Global } from '../../../helpers/Global';
import { PeticionAjax } from '../../../helpers/PeticionAjax';
import { Listado } from './Listado';



export const Articulo = () => {
    const [articulo, setArticulo] = useState([]);
    const [cargando, setCargando] = useState(true);
    const params = useParams();
    useEffect(() => {
        conseguirArticulo();
    }, [])

    const conseguirArticulo = async () => {

        const { datos, cargando } = await PeticionAjax(Global.url + "articulo/" + params.id, "GET");

        // let peticion = await fetch(url, { method: "GET" });
        // let datos = await peticion.json();


        if (datos.status === "success") {
            setArticulo(datos.articulo);
        }
        setCargando(false);
    }

    return (
        <div className='jumbo'>
            {
                cargando ? "Cargando..." :
                    <>
                        <div className='mascara'>
                            {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
                            {articulo.imagen == "default.png" && <img src='https://i.blogs.es/8d2420/650_1000_java/1366_2000.png' />}
                        </div>
                        <h1>{articulo.titulo}</h1>
                        <span>{articulo.fecha}</span>
                        <p>{articulo.contenido}</p>
                    </>
            }
        </div>
    )
}
