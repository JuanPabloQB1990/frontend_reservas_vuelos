import React, { useEffect, memo, useState } from "react";
import PrecioTotalVuelo from "./PrecioTotalVuelo";
import Modal from 'react-modal';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import calcularTiempo from "../helpers/CalcularTiempos";

const ResultadoVuelos = memo(() => {

    Modal.setAppElement("body");

    useEffect(() => {
        console.log("render ResultadoVuelos");

    });

    const escalas = useSelector(state => state.scales.escalas)

    const [destino, setDestino] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [escalaModal, setEscalaModal] = useState([])
    const [cambioEscalas, setCambioEscalas] = useState([])

    const openModal = (escala) => {

        setEscalaModal(escala)
        
        if (modalIsOpen) {
            setIsOpen(false)
            setCambioEscalas([])
        } else {
            setIsOpen(true)
            if (escala.length > 1) {
            
                setCambioEscalas([...cambioEscalas, `espera de ${calcularTiempo(new Date(escala[0].fechaLlegada), new Date(escala[1].fechaPartida))} en ${escala[0].destino} (cambio de avion)`])
                if (escalaModal.length > 2) {
                    setCambioEscalas([...cambioEscalas, `espera de ${calcularTiempo(new Date(escala[1].fechaLlegada), new Date(escala[2].fechaPartida))} en ${escala[1].destino} (cambio de avion)`])
                }
    
            }
        }

    }

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

    const customStyles = {
        content: {
            width: '70%',
            heigth: '50%',
            margin: 'auto',
        }
    };
    
    let contEscala = 0

    const comprarVuelo = (escalas) => {
        console.log(escalas);
    }

    return (
        <div>
            {
                escalas.map((escala, key) => {
                    return (<div className="border rounded-md flex my-5 hover:shadow-lg flex-row max-md:flex-col" key={key}>
                                <Link onClick={() => openModal(escala)} className="w-full h-[120px] max-md:h-auto cursor-pointer flex flex-row max-md:flex-col max-md:border-b-2">
                                    <div className="basis-1/5 p-4 flex">
                                        <p className="text-center my-4">{escala[0].aerolinea}</p>
                                    </div>
                                    <div className="basis-3/4 p-4">
                                        <p>{escala[0].origen} - {destino}</p>
                                        <p className="font-bold">{new Date(escala[0].fechaPartida).toLocaleDateString('es-co', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</p>
                                        <p className="inline">{new Date(escala[0].fechaPartida).getHours()}:{new Date(escala[0].fechaPartida).getMinutes()} - </p>{escala.length >= 2 ? <p className="inline">{escala.length - 1} escala{escala.length > 2 ? "s" : ""}</p> : <p className="inline text-[#03a691]">Directo</p>}
                                    </div>
                                </Link>    
                                <div className="basis-1/5 md:border-l-2 h-[120px] flex flex-col justify-center items-center">
                                    <p>desde</p>
                                    <PrecioTotalVuelo escala={escala} />
                                    <button className="bg-[#270570] hover:bg-[#554479] text-white py-1 px-4 my-2 rounded-md" onClick={()=>comprarVuelo(escala)}>Comprar</button>
                                </div>
                            </div>)
                })
            }
            <Modal isOpen={modalIsOpen} onRequestClose={openModal} style={customStyles}>
                <div>
                    <button className="" onClick={openModal}>X</button>
                </div>

                {
                    modalIsOpen && escalaModal.map((vuelo, key) => {

                        contEscala++
                        
                        return <div key={key} className="w-full p-4 m-3 border-2">
                                    <div  className="">
                                        <div className="flex flex-row justify-between p-4">
                                            <div>{vuelo.aerolinea}</div>
                                            <div className="text-center"><p >codigo: {vuelo.codVuelo}</p><p>clase: {vuelo.tipoVuelo}</p></div>
                                        </div>
                                        <div className="flex flex-row p-4">
                                            <div className="basis-1/3 text-center"><p >{new Date(vuelo.fechaPartida).toLocaleDateString('es-co', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</p><p className="font-bold text-2xl">{new Date(vuelo.fechaPartida).getHours()}:{new Date(vuelo.fechaPartida).getMinutes()}</p><p>{vuelo.origen}</p></div>
                                            <div className="basis-1/3 text-center"><p>duracion</p><p className="font-semibold">{calcularTiempo(new Date(vuelo.fechaPartida), new Date(vuelo.fechaLlegada))}</p></div>
                                            <div className="basis-1/3 text-center"><p >{new Date(vuelo.fechaLlegada).toLocaleDateString('es-co', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</p><p className="font-bold text-2xl">{new Date(vuelo.fechaLlegada).getHours()}:{new Date(vuelo.fechaLlegada).getMinutes()}</p><p>{vuelo.destino}</p></div>
                                        </div>                                      
                                    </div>
                                    {contEscala < escalaModal.length && <div className="p-4 border-2 text-center">
                                                                            <p>{cambioEscalas[contEscala-1]}</p>
                                                                        </div>}
                               </div>
                    })
                }

            </Modal>
        </div>
    );
});

export default ResultadoVuelos;
