import React from 'react'
import { NavLink } from 'react-router-dom'
import  avion  from '../iconos/avion.png'
import  crear  from '../iconos/crear.png'
import  login  from '../iconos/login.png'
import './NavBar.css'
import { useSelector } from "react-redux";
import isTokenExpired from '../helpers/IsTokenExpired'

const NavBar = () => {
  const user = useSelector(state => state)
  console.log(user);
  return (
    <div>
        <h1 className="text-purple-800 font-bold text-2xl ml-5">Reservas Vuelos</h1>
        <ul className='flex mx-8 my-4 gap-4'>
            <li className=''><NavLink to="/vuelos/buscar" ><img src={avion} alt="" width="45px"/>Vuelos</NavLink></li>
            {!isTokenExpired(user.auth.token) && user.auth.rol == "ADMIN" && <li className=''><NavLink to="/vuelos/crear" ><img src={crear} alt="" width="45px"/>Crear</NavLink></li>}
            {isTokenExpired(user.auth.token) && !user.auth.rol != "" && <li className=''><NavLink to="/login" ><img src={login} alt="" width="45px"/>login</NavLink></li>}
        
        </ul>      
    </div>
  )
}

export default NavBar
