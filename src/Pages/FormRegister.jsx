import {useState} from 'react'

const FormRegister = () => {

    const [formRegister, setFormRegister] = useState({
        nombre:"",
        apellido:"",
        telefono:"",
        correo:"",
        username:"",
        password:"",
        pais:"",
        ciudad:"",
        direccion:"",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
      setFormRegister({
        ...formRegister, [e.target.name] : e.target.value
      })
    }

    const handleSubmit = async(e) => {
      e.preventDefault()

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formRegister)
      };

      const response = await fetch("http://localhost:8090/api/clientes/auth/login", options)
      setMessage(response.message)
    }
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre"  onChange={handleChange}/>
        <label htmlFor="apellido">Apellido:</label>
        <input type="text" name="apellido" id="apellido"  onChange={handleChange}/>
        <label htmlFor="telefono">Telefono:</label>
        <input type="text" name="telefono" id="telefono"  onChange={handleChange}/>
        <label htmlFor="correo">Correo:</label>
        <input type="email" name="correo" id="correo"  onChange={handleChange}/>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username"  onChange={handleChange}/>
        <label htmlFor="password">Password:</label>
        <input type="text" name="password" id="password" onChange={handleChange}/>
        <label htmlFor="pais">Pais:</label>
        <input type="text" name="pais" id="pais"  onChange={handleChange}/>
        <label htmlFor="ciudad">Ciudad:</label>
        <input type="text" name="ciudad" id="ciudad"  onChange={handleChange}/>
        <label htmlFor="direccion">Direccion:</label>
        <input type="text" name="direccion" id="direccion"  onChange={handleChange}/>
        <input type="submit" value="Registrar" />
      </form>
      {message && <h3>{message}</h3> }
    </div>
  )
}

export default FormRegister
