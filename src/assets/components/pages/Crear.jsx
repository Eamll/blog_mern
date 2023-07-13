import React from 'react'
import { useState } from 'react'
import { Global } from '../../../helpers/Global';
import { PeticionAjax } from '../../../helpers/PeticionAjax';
import { useForm } from '../../../hooks/useForm'

export const Crear = () => {
    const { formulario, enviado, cambiado } = useForm({});
    const [resultado, setResultado] = useState("No enviado");
    const guardarArticulo = async (e) => {
        e.preventDefault()
        //Recoger datos del formulario
        let nuevoArticulo = formulario;
        //Guardar articulo en el backend
        const { datos } = await PeticionAjax(Global.url + "crear", "POST", nuevoArticulo);
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
            <h1>Crear Articulo</h1>
            <p>Formulario para crear un artículo</p>
            {/* <pre>{JSON.stringify(formulario)}</pre> */}
            <strong>{resultado == "Guardado" ? "Articulo guardado con exito" : ""}</strong>
            <strong>{resultado == "Error" ? "Datos proporcionados son incorrectos" : ""}</strong>
            {/*Montar formulario*/}
            <form className='formulario' onSubmit={guardarArticulo}>
                <div className='form-group'>
                    <label htmlFor='titulo'>Titulo:</label>
                    <input type="text" name='titulo' onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor='contenido'>Contenido:</label>
                    <input type="text" name='contenido' onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor='file0'>Imagen:</label>
                    <input type="file" name='file0' id='file' />
                </div>
                <input type="submit" value="Guardar" className='btn btn-success' />
            </form>

        </div>
    )
}
