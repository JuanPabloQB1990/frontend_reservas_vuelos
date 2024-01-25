import React, { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { addScales } from "../features/EscalasSlice";
import { addError } from "../features/ErrorVueloSlice";


const FormBusquedaVuelos = memo(() => {
   
    console.log("render form busqueda");
  
    const [formBuscar, setformBuscar] = useState({
      origen: null,
      destino: null,
      fechaPartida: null,
    });

    const dispatch = useDispatch()

    const handleChange = (e) => {
      setformBuscar({ ...formBuscar, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const { origen, destino, fechaPartida } = formBuscar;

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (fechaPartida == null) {
        
        try {
          const response = await fetch(`http://localhost:8090/api/vuelos/busqueda/criterio?origen=${origen}&destino=${destino}`, options);
          
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.errorMessage);
          }
          const data = await response.json();
          dispatch(addScales(data));
          
        } catch (error) {
          dispatch(addError(error.message))
        }
       
      } else {
        try {
          const response = await fetch(`http://localhost:8090/api/vuelos/busqueda/criterio?origen=${origen}&destino=${destino}&fechaPartida=${fechaPartida}`, options);
          
          if (!response.ok) {
            throw new Error(data.errorMessage);
          }
          const data = await response.json();
          dispatch(addScales(data));
          
        } catch (error) {
          dispatch(addError(error.message))
        }
      }
    };

    return (
      <div className="basis-1/4 bg-[#270570] text-white p-4 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2" htmlFor="origen">
            Origen
          </label>
          <input
            className="mb-4 p-4 rounded-md text-black"
            value={formBuscar.origen === null ? "" : formBuscar.origen}
            onChange={handleChange}
            placeholder="ingresa desde donde viaja"
            type="text"
            name="origen"
            id="origen"
          />

          <label className="mb-2" htmlFor="destino">
            Destino
          </label>
          <input
            className="mb-4 p-4 rounded-md text-black"
            value={formBuscar.destino === null ? "" : formBuscar.destino}
            onChange={handleChange}
            placeholder="ingresa hacia donde viaja"
            type="text"
            name="destino"
            id="destino"
          />

          <label className="mb-2" htmlFor="fechaPartida">
            Fecha Partida
          </label>
          <input
            className="mb-4 p-4 rounded-md text-black"
            value={
              formBuscar.fechaPartida === null ? "" : formBuscar.fechaPartida
            }
            onChange={handleChange}
            type="date"
            name="fechaPartida"
            id="fechaPartida"
          />

          <input
            className="bg-[#fa503f] cursor-pointer hover:bg-red-800 font-bold rounded-full py-2"
            type="submit"
            value="Buscar"
          />
        </form>
      </div>
    );
  }
);

export default FormBusquedaVuelos;
