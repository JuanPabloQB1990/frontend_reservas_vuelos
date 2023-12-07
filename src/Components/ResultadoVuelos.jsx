import React, { useEffect, memo, useState } from "react";
import PrecioTotalVuelo from "./PrecioTotalVuelo";
import { useSelector } from "react-redux";

const ResultadoVuelos = memo(() => {
    useEffect(() => {
        console.log("render ResultadoVuelos");
        //console.log(escalas);
    });

    const [destino, setDestino] = useState("");

    const escalas = useSelector(state => state.scales.escalas)
    console.log(escalas);
    const obtenerDestino = () => {
        escalas[0].map(vuelo => {
            setDestino(vuelo.destino)
        })
    }

    useEffect(() => {
        if (escalas.length > 0) {
            obtenerDestino() 
        }
        
    }, [escalas]);

    
  return (
    escalas.map((escala, key)=>{
        return (<div key={key} className="border mb-4 w-full h-[100px] rounded-md shadow-lg hover:shadow-2xl cursor-pointer flex flex-row max-lg:flex-col max-lg:h-[250px]">
                    <div className="basis-1/5 p-4 flex">
                        <p className="text-center my-4">{escala[0].aerolinea}</p>
                    </div>
                    <div className="basis-3/4 py-2">
                        <p>{escala[0].origen} - {destino}</p>
                        <p className="font-bold">{new Date(escala[0].fechaPartida).toLocaleDateString('es-co', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</p>
                        <p>{new Date(escala[0].fechaPartida).getHours()}:{new Date(escala[0].fechaPartida).getMinutes()} - {escala.length > 1 ? `${escala.length} escalas` : "Directo" }</p>
                    </div>
                    <div className="basis-1/5 border-l-2 flex flex-col justify-center items-center">
                        <p>desde</p>
                        <PrecioTotalVuelo escala={escala}/>
                    </div>
                </div>)
    })   
  );
});

export default ResultadoVuelos;
