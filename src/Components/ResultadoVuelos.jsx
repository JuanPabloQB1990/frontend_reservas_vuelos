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

    const [destino, setDestino] = useState("");

    const [modalIsOpen, setIsOpen] = useState(false);
    const [escalaModal, setEscalaModal] = useState([])

    const openModal = (escala) => {
        setEscalaModal(escala)
        if (modalIsOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }

        

    }

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

    const customStyles = {
        content: {
            width: '70%',
            heigth: '50%',
            margin: 'auto'
        },
    };



    return (
        <div>
            {
                escalas.map((escala, key) => {
                    return (<div key={key}>
                        <Link onClick={()=>openModal(escala)} className="border mb-4 w-full h-[100px] rounded-md shadow-lg hover:shadow-2xl cursor-pointer flex flex-row max-lg:flex-col max-lg:h-[250px]">
                            <div className="basis-1/5 p-4 flex">
                                <p className="text-center my-4">{escala[0].aerolinea}</p>
                            </div>
                            <div className="basis-3/4 py-2">
                                <p>{escala[0].origen} - {destino}</p>
                                <p className="font-bold">{new Date(escala[0].fechaPartida).toLocaleDateString('es-co', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</p>
                                <p>{new Date(escala[0].fechaPartida).getHours()}:{new Date(escala[0].fechaPartida).getMinutes()} - {escala.length > 1 ? `${escala.length} escalas` : "Directo"}</p>
                            </div>
                            <div className="basis-1/5 border-l-2 flex flex-col justify-center items-center">
                                <p>desde</p>
                                <PrecioTotalVuelo escala={escala} />
                            </div>
                        </Link>
                    </div>)
                })
            }   
            <Modal isOpen={modalIsOpen} onRequestClose={openModal} style={customStyles}>
                <h2>Escala de Vuelos</h2>
                {
                    modalIsOpen && escalaModal.map(vuelo => {
                        return <p>{calcularTiempo(new Date(vuelo.fechaPartida), new Date(vuelo.fechaLlegada))}</p>
                    })
                }

                <button onClick={openModal}>x</button>

            </Modal>
        </div>
    );
});

export default ResultadoVuelos;
