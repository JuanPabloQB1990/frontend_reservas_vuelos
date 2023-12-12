import React from 'react'
import { NavLink } from 'react-router-dom'
import  avion  from '../iconos/avion.png'
import './NavBar.css'


const NavBar = () => {
  return (
    <div>
        <h1 className="text-purple-800 font-bold text-2xl ml-5">Reservas Vuelos</h1>
        <ul className='flex mx-8 my-4'>
            <li className=''><NavLink to="/vuelos/buscar" className={({ isActive }) => isActive ? "active" : "desactive"}><img src={avion} alt="" width="45px"/>Vuelos</NavLink></li>
        </ul>
      
    </div>
  )
}

export default NavBar
