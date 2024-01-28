import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import  avion  from '../iconos/avion.png'
import  crear  from '../iconos/crear.png'
import  cerrar  from '../iconos/cerrar-sesion.png'
import './NavBar.css'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import isTokenExpired from '../helpers/IsTokenExpired'
import { deleteToken } from '../features/AuthSlice'

const NavBar = () => {
  
  const user = useSelector(state => state)
  const dispatch = useDispatch()
  
  const navigate = useNavigate()
  console.log("render navbar");
  const cerrarSesion = () => {
    localStorage.removeItem("auth")
    dispatch(deleteToken())
    navigate("/login")
  }
  
  return (
    <div>
        <h1 className="text-purple-800 font-bold text-2xl ml-5">Reservas Vuelos</h1>
        <ul className='flex mx-8 my-4 gap-4'>
          {isTokenExpired(user.auth.token) && <li className=''><NavLink to="/vuelos/buscar" ><img src={avion} alt="" width="45px"/>Vuelos</NavLink></li>}
          {isTokenExpired(user.auth.token) && user.auth.rol == "ADMIN" && <li className=''><NavLink to="/vuelos/crear" ><img src={crear} alt="" width="45px"/>Crear</NavLink></li>}
          {isTokenExpired(user.auth.token) && <li className=''><button onClick={()=> cerrarSesion()}><img src={cerrar} alt="" width="45px"/>Cerrar</button></li>}
        </ul>      
    </div>
  )
}

export default NavBar
