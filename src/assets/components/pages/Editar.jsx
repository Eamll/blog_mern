import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Global } from '../../../helpers/Global';
import { PeticionAjax } from '../../../helpers/PeticionAjax';
import { useForm } from '../../../hooks/useForm'

export const Editar = () => {
    const { formulario, enviado, cambiado } = useForm({});
    const [resultado, setResultado] = useState("No enviado");
    const [articulo, setArticulo] = useState([]);
    const params = useParams();
    useEffect(() => {
        conseguirArticulo();
    }, [])
    const conseguirArticulo = async () => {

        const { datos } = await PeticionAjax(Global.url + "articulo/" + params.id, "GET");

        if (datos.status === "success") {
            setArticulo(datos.articulo);
        }

    }


    const editarArticulo = async (e) => {
        e.preventDefault()
        //Recoger datos del formulario
        let nuevoArticulo = formulario;
        //Guardar articulo en el backend
        const { datos } = await PeticionAjax(Global.url + "articulo/" + params.id, "PUT", nuevoArticulo);
        if (datos.status === "success") {
            setResultado("Guardado");
        } else {
            setResultado("Error");
        }
        //Subir imagen
        const fileInput = document.querySelector("#file");

        if (datos.status === "success" && fileInput.files[0]) {
            setResultado("Guardado");

            const formData = new FormData();
            formData.append("file0", fileInput.files[0]);
            const subida = await PeticionAjax(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);

            if (subida.datos.status === "success") {
                setResultado("Guardado");
            } else {
                setResultado("Error");
            }
        }
        console.log(datos);
    }
    return (
        <div className='jumbo'>
            <h1>Editar Articulo</h1>
            <p>Formulario para editar: {articulo.titulo}</p>
            {/* <pre>{JSON.stringify(formulario)}</pre> */}
            <strong>{resultado == "Guardado" ? "Articulo guardado con exito" : ""}</strong>
            <strong>{resultado == "Error" ? "Datos proporcionados son incorrectos" : ""}</strong>
            {/*Montar formulario*/}
            <form className='formulario' onSubmit={editarArticulo}>
                <div className='form-group'>
                    <label htmlFor='titulo'>Titulo:</label>
                    <input type="text" name='titulo' onChange={cambiado} defaultValue={articulo.titulo} />
                </div>

                <div className='form-group'>
                    <label htmlFor='contenido'>Contenido:</label>
                    <input type="text" name='contenido' onChange={cambiado} defaultValue={articulo.contenido} />
                </div>

                <div className='form-group'>
                    <label htmlFor='file0'>Imagen:</label>
                    <div className='mascara'>
                        {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
                        {articulo.imagen == "default.png" && <img src='https://i.blogs.es/8d2420/650_1000_java/1366_2000.png' />}
                    </div>
                    <input type="file" name='file0' id='file' />
                </div>
                <input type="submit" value="Guardar" className='btn btn-success' />
            </form>

        </div>
    )
}
