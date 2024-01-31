import React, { useEffect, useState } from 'react'
import calcularTiempo from '../helpers/CalcularTiempos';
import { useDispatch, useSelector } from 'react-redux';
import isTokenExpired from '../helpers/IsTokenExpired';
import { useNavigate } from 'react-router-dom';
import sweetAlert2 from "sweetalert2"
import { addFormBusqueda } from '../features/EscalasSlice';

const FinalizarCompraVuelo = () => {

    const [escalaComprar, setEscalaComprar] = useState([]);
    const [cambioEscalas, setCambioEscalas] = useState([]);
    const [totalEscalas, setTotalEscalas] = useState(0);
    const [cliente, setCliente] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formBusqueda = useSelector(state => state.scales.formBusqueda)
    const auth = useSelector(state => state.auth)
    
    useEffect(() => {
        sessionStorage.setItem('ultimaPaginaVisitada', window.location.href)
        const escalaComprar = JSON.parse(localStorage.getItem('escalaComprar'))
        setEscalaComprar(escalaComprar)

        if (escalaComprar.length > 1) {
                
            setCambioEscalas([...cambioEscalas, `espera de ${calcularTiempo(new Date(escalaComprar[0].fechaLlegada), new Date(escalaComprar[1].fechaPartida))} en ${escalaComprar[0].destino} (cambio de avion)`])
            if (escalaComprar.length > 2) {
                setCambioEscalas([...cambioEscalas, `espera de ${calcularTiempo(new Date(escalaComprar[1].fechaLlegada), new Date(escalaComprar[2].fechaPartida))} en ${escalaComprar[1].destino} (cambio de avion)`])
            }

        }
        getCliente()

        if (localStorage.getItem('formBuscar')) {
            const formBuscar = JSON.parse(localStorage.getItem('formBuscar'))
            
            dispatch(addFormBusqueda(formBuscar))
        }
    }, []);

    
    const sumTotalEscalas = () => {
        let arrTotalVuelos = [];
        escalaComprar.map((escala) => {
            
            arrTotalVuelos.push(escala.precio);
            //setTotalEscalas(arrTotalVuelos);
        });
    
        const totalSumaVuelos = arrTotalVuelos.reduce((acc, vuelo) => {
          return acc + vuelo;
        }, 0);
        
        setTotalEscalas(totalSumaVuelos*formBusqueda.asientos);
    };

    useEffect(() => {
        sumTotalEscalas();
    }, [escalaComprar]);

    
    let contEscala = 0

    const getCliente = async() => {
      
        const options = {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization" : "Bearer " + auth.token 
            }
        };

        const res = await fetch(`http://localhost:8090/api/admin/cliente/${auth.idCliente}`,options)
        const data = await res.json()
        
        setCliente(data)
    }
    
    const pagarVuelo = async() => {
        const escalaEnvio = {
            idVuelo1 : escalaComprar[0].idVuelo,
            idVuelo2 : escalaComprar[1] ? escalaComprar[1].idVuelo : null,
            idVuelo3 : escalaComprar[2] ? escalaComprar[2].idVuelo : null,
            asientos : formBusqueda.asientos,
            idCliente : auth.idCliente
        }

        const options = {
            method: "POST",
            headers: { 
              "Content-Type": "application/json", 
              "Authorization" : "Bearer " + auth.token 
            },
            body: JSON.stringify(escalaEnvio)
        };
          
          
        if (isTokenExpired(auth.token) ) {
        const response = await fetch("http://localhost:8090/api/reservaciones/reservacion", options)
          
            if (!response.ok) {
                    const data = await response.json();
                    setMessage(data.errorMessage)
                    sweetAlert2.fire({
                        title: "Lo sentimos",
                        text: `${message}`,
                        icon: "error"
                    });
            } else {
                    const data = await response.json();
                    setMessage(data)
                    sweetAlert2.fire({
                        title: "Compra Finalizada",
                        text: `${message}`,
                        icon: "success"
                    });
                    navigate("/vuelos/buscar")
            }
        } else {
            sweetAlert2.fire({
                title: "Su sesion a finalizado",
                text: "That thing is still around?",
                icon: "error"
              });
            navigate("/login")
        }

    }
   
  return (
    <div className='w-full '>
      <h1 className='text-center font-bold text-2xl'>¡Falta poco! finaliza tu compra</h1>
      {
        escalaComprar.map((vuelo, key) => {   
            contEscala++
                return  <div key={key} className="p-4 m-3 border-2">
                            <div  className="">
                                    <div className="flex flex-row justify-between p-4">
                                        <div>{vuelo.aerolinea}</div>
                                        <div className="text-center"><p >codigo: {vuelo.codVuelo}</p><p>clase: {vuelo.tipoVuelo}</p></div>
                                    </div>
                                    <div className="flex flex-row p-4">
                                        <div className="basis-1/3 text-center"><p >{new Date(vuelo.fechaPartida).toLocaleDateString('es-co', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</p><p className="font-bold text-2xl">{new Date(vuelo.fechaPartida).getHours() < 10 ? "0"+new Date(vuelo.fechaPartida).getHours() : new Date(vuelo.fechaPartida).getHours()}:{new Date(vuelo.fechaPartida).getMinutes() < 10 ? "0"+new Date(vuelo.fechaPartida).getMinutes() : new Date(vuelo.fechaPartida).getMinutes()}</p><p>{vuelo.origen}</p></div>
                                        <div className="basis-1/3 text-center"><p>duracion</p><p className="font-semibold">{calcularTiempo(new Date(vuelo.fechaPartida), new Date(vuelo.fechaLlegada))}</p></div>
                                        <div className="basis-1/3 text-center"><p >{new Date(vuelo.fechaLlegada).toLocaleDateString('es-co', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</p><p className="font-bold text-2xl">{new Date(vuelo.fechaLlegada).getHours() < 10 ? "0"+new Date(vuelo.fechaLlegada).getHours() : new Date(vuelo.fechaLlegada).getHours()}:{new Date(vuelo.fechaLlegada).getMinutes() < 10 ? "0"+new Date(vuelo.fechaLlegada).getMinutes() : new Date(vuelo.fechaLlegada).getMinutes()}</p><p>{vuelo.destino}</p></div>
                                    </div>                                      
                            </div>
                                {contEscala < escalaComprar.length && <div className="p-4 border-2 text-center">
                                                                            <p>{cambioEscalas[contEscala-1]}</p>
                                                                        </div>}
                        </div>
                    })
                }
                <div className='ml-4'>
                    <h2 className='text-center font-bold text-lg'>Datos del Comprador</h2>
                    <p className='font-bold text-lg'><span className='font-semibold'>Nombres:</span> <span className='font-normal'>{cliente.nombre}</span></p>
                    <p className='font-bold text-lg'><span className='font-semibold'>Apellidos:</span> <span className='font-normal'>{cliente.apellido}</span></p>
                    <p className='font-bold text-lg'><span className='font-semibold'>Pais:</span> <span className='font-normal'>{cliente.pais}</span></p>
                    <p className='font-bold text-lg'><span className='font-semibold'>Ciudad:</span> <span className='font-normal'>{cliente.ciudad}</span></p>
                    <p className='font-bold text-lg'><span className='font-semibold'>Total a Pagar:</span> <span className='font-normal'>{totalEscalas.toFixed(3)} $</span></p>
                    <button className="bg-[#270570] hover:bg-[#554479] text-white py-1 px-4 my-2 rounded-md" onClick={()=> pagarVuelo()}>Pagar</button>
                </div>
            
    </div>
  )
}

export default FinalizarCompraVuelo
