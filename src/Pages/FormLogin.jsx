import React, { useState } from 'react'
import ComponentLabel from '../Components/ComponentLabel';
import ComponentInput from '../Components/ComponentInput';
import ComponentButton from '../Components/ComponentButton';
import ComponentInputError from '../Components/ComponentInputError';
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {

    const [formLogin, setFormLogin] = useState({
        username:"",
        password:""
    });

    const navigate = useNavigate()

    const [errorUsername, setErrorUserName] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [messageError, setMessageError] = useState("")

    const handleChange = (e) => {
        setFormLogin({
            ...formLogin, [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e) => {
      e.preventDefault()

      setErrorUserName("")
      setErrorPassword("")

      if (formLogin.username === "") {
        setErrorUserName("El username es requerido")
      
      }

      if (formLogin.password === "") {
        setErrorPassword("El password es requerido")
      }
      
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formLogin)
      };

      const response = await fetch("http://localhost:8090/api/clientes/auth/login", options)
      
      const data = await response.json();
      
      if (response.status == 400) {
        setMessageError(data.errorMessage)
        return
      }
      
      localStorage.setItem('auth', JSON.stringify(data))
      navigate('/vuelos/buscar');
    }
    
  return (
    <div className='h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='bg-[#270570] h-auto w-1/4 max-sm:w-4/5 rounded-lg py-4 flex flex-col items-center justify-center'>
        <ComponentLabel htmlFor="username" text="Username:"/>
        {errorUsername != "" && <ComponentInputError error={errorUsername}/>}
        <ComponentInput type="text" name="username" id="username" value={formLogin.username} handleChange={handleChange}/>
        <ComponentLabel htmlFor="password" text="Password:"/>
        {errorPassword != "" && <ComponentInputError error={errorPassword}/>}
        <ComponentInput type="text" name="password" id="password" value={formLogin.password} handleChange={handleChange}/>
        <ComponentButton type="submit" value="Ingresar"/>
        {messageError && <ComponentInputError error={messageError}/>}
      </form>
    </div>
  )
}

export default FormLogin
