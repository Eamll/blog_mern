import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Footer, Header, Nav, Sidebar } from '../assets/components/layouts/layouts'
import { Articulo } from '../assets/components/pages/Articulo'

import { Articulos } from '../assets/components/pages/Articulos'
import { Busqueda } from '../assets/components/pages/Busqueda'
import { Crear } from '../assets/components/pages/Crear'
import { Editar } from '../assets/components/pages/Editar'
import { Inicio } from '../assets/components/pages/Inicio'
export const Rutas = () => {
    return (
        <BrowserRouter>
            {/**Layoute */}
            <Header />
            <Nav />
            {/**Contenido central y rutas*/}
            <section id="content" className='content'>
                <Routes>
                    <Route path='/' element={<Inicio />} />
                    <Route path='/inicio' element={<Inicio />} />
                    <Route path='/articulos' element={<Articulos />} />
                    <Route path='/crear-articulos' element={<Crear />} />
                    <Route path='/buscar/:busqueda' element={<Busqueda />} />
                    <Route path='/articulo/:id' element={<Articulo />} />
                    <Route path='/editar/:id' element={<Editar />} />
                    <Route path='*' element={
                        <div className='jumbo'>
                            Error 404
                        </div>
                    } />
                </Routes>
            </section>
            <Sidebar />
            <Footer />
        </BrowserRouter>
    )
}
