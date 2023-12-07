import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar';
import FormBusquedaVuelos from '../Components/FormBusquedaVuelos';
import ResultadoVuelos from '../Components/ResultadoVuelos';

const FormBuscarVuelos = () => {
    
    useEffect(() => {
      console.log("render buscar vuelos");
    });

    return (
        <div>
          <NavBar/>
          <div className='flex flex-row mx-12 gap-6 h-auto max-lg:flex-col'>
            <div>
              <FormBusquedaVuelos/>
            </div>
            <div className='basis-3/4 h-auto'>
              <ResultadoVuelos />
            </div>
          </div>
        </div>
        
    )
}

export default FormBuscarVuelos
