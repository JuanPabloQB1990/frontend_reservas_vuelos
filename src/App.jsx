import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import FormCrearVuelo from './Pages/FormCrearVuelo'
import BuscarVuelos from './Pages/BuscarVuelos.jsx'
import ListaVuelos from './Pages/ListaVuelos'
import FormLogin from './Pages/FormLogin'
import { useDispatch } from 'react-redux'
import ProtectedRoutersAdmin from './Components/ProtectedRoutersAdmin.jsx'
import { useEffect } from 'react'
import { addToken, deleteToken } from './features/AuthSlice.js';
import FormRegister from './Pages/FormRegister.jsx'
import NavBar from './Components/NavBar.jsx'
import ProtectedRouters from './Components/ProtectedRouters.jsx'


function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    console.log("render APP");
    
    
    if (localStorage.getItem('auth')) {
      const auth = localStorage.getItem('auth')
      console.log(auth)
      const authParse = JSON.parse(auth)
      dispatch(addToken(authParse))
    }else{
      
      dispatch(deleteToken())
      
    }
  }, []);
  
  
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path='/vuelos/crear' element = {<ProtectedRoutersAdmin><FormCrearVuelo/></ProtectedRoutersAdmin>}/>
        <Route path='/vuelos/:page/:size' element={<ProtectedRoutersAdmin><ListaVuelos/></ProtectedRoutersAdmin>}/>
        
        <Route path='/vuelos/buscar' element={<ProtectedRouters><BuscarVuelos/></ProtectedRouters>}/>
        
        <Route path='/login' element={<FormLogin/>}/>
        <Route path='/register' element={<FormRegister/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
