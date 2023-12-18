import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import FormCrearVuelo from './Pages/FormCrearVuelo'
import BuscarVuelos from './Pages/BuscarVuelos.jsx'
import ListaVuelos from './Pages/ListaVuelos'
import FormLogin from './Pages/FormLogin'
import { useSelector, useDispatch } from 'react-redux'
import ProtectedRouters from './Components/ProtectedRouters'
import { useEffect } from 'react'
import { addToken } from './features/AuthSlice.js';
import FormRegister from './Pages/FormRegister.jsx'


function App() {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const auth = localStorage.getItem('auth')
    if (auth) {
      const authParse = JSON.parse(auth)
      dispatch(addToken(authParse))
    }
  }, []);
  
  return (
    <BrowserRouter>
    
      <Routes>
        <Route element={<ProtectedRouters/>}>
          <Route path='/vuelos/crear' element = {<FormCrearVuelo/>}/>
          <Route path='/vuelos/:page/:size' element={<ListaVuelos/>}/>
        </Route>
        <Route path='/vuelos/buscar' element={<BuscarVuelos/>}/>
        <Route path='/login' element={<FormLogin/>}/>
        <Route path='/register' element={<FormRegister/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
