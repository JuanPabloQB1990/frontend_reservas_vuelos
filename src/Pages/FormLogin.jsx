import React, { useState } from 'react'


const FormLogin = () => {

    const [formLogin, setFormLogin] = useState({
        username:"",
        password:""
    });

    const handleChange = (e) => {
        setFormLogin({
            ...formLogin, [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e) => {
      e.preventDefault()
      
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formLogin)
      };

      const response = await fetch("http://localhost:8090/api/clientes/auth/login", options)
      const data = await response.json();
      localStorage.setItem('auth', JSON.stringify(data))
    }
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username"  onChange={handleChange}/>
        <label htmlFor="password">Password:</label>
        <input type="text" name="password" id="password" onChange={handleChange}/>
        <input type="submit" value="Ingresar" />
      </form>
    </div>
  )
}

export default FormLogin
