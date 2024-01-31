import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ListaEscalasCliente = () => {

    const auth = useSelector(state => state.auth)
    const { id } = useParams()

    useEffect(() => {
        getVuelosCliente()
    }, []);

   const getVuelosCliente = async() => {

    const options = {
        method: "GET",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization" : "Bearer " + auth.token 
        }
    };

    const res = await fetch(`http://localhost:8090/api/reservaciones/cliente/${id}`, options)
    const data = await res.json()
    console.log(data);
   }
  

  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}

export default ListaEscalasCliente
