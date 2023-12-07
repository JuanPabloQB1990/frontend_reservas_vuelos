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
    const [required, setRequired] = useState({});

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

      const response = await fetch("http://localhost:8090/api/clientes/auth/registro", options)
      const message = await response.json()
      
      if (response.status === 400) {
        setRequired(message)
      } else {
        setRequired({})
        setMessage(message.errorMessage)
      }
      console.log(message);
    }
    
  return (
    <div className ='max-w-md h-full mx-auto flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='bg-[rgb(39,5,112)] text-white w-full min-h-max mt-4 py-6 flex flex-col items-center rounded-lg'>
        <label htmlFor="nombre" className='mb-2'>Nombre:</label>
        {required.nombre != "" && <p className='text-red-600 pb-2'>{required.nombre}</p>}
        <input type="text" name="nombre" id="nombre" className='mb-6 w-10/12 text-black rounded-md' value={formRegister.nombre} onChange={handleChange}/>
        <label htmlFor="apellido" className='mb-2'>Apellido:</label>
        {required.apellido != "" && <p className='text-red-600 pb-2'>{required.apellido}</p>}
        <input type="text" name="apellido" id="apellido" className='mb-6 w-10/12 text-black rounded-md' value={formRegister.apellido} onChange={handleChange}/>
        <label htmlFor="telefono" className='mb-2'>Telefono:</label>
        {required.telefono != "" && <p className='text-red-600 pb-2'>{required.telefono}</p>}
        <input type="text" name="telefono" id="telefono" className='mb-6 w-10/12 text-black rounded-md' value={formRegister.telefono} onChange={handleChange}/>
        <label htmlFor="correo" className='mb-2'>Correo:</label>
        {required.correo != "" && <p className='text-red-600 pb-2'>{required.correo}</p>}
        <input type="email" name="correo" id="correo" className='mb-6 w-10/12 text-black rounded-md' value={formRegister.correo} onChange={handleChange}/>
        <label htmlFor="username" className='mb-2'>Username:</label>
        {required.username != "" && <p className='text-red-600 pb-2'>{required.username}</p>}
        <input type="text" name="username" id="username" className='mb-6 w-10/12 text-black rounded-md' value={formRegister.username} onChange={handleChange}/>
        <label htmlFor="password" className='mb-2'>Password:</label>
        {required.password != "" && <p className='text-red-600 pb-2'>{required.password}</p>}
        <input type="text" name="password" id="password" className='mb-6 w-10/12 text-black rounded-md' value={formRegister.password} onChange={handleChange}/>
        <label htmlFor="pais" className='mb-2'>Pais:</label>
        {required.pais != "" && <p className='text-red-600 pb-2'>{required.pais}</p>}
        <input type="text" name="pais" id="pais" className='mb-6 w-10/12 text-black rounded-md' value={formRegister.pais} onChange={handleChange}/>
        <label htmlFor="ciudad" className='mb-2'>Ciudad:</label>
        {required.ciudad != "" && <p className='text-red-600 pb-2'>{required.ciudad}</p>}
        <input type="text" name="ciudad" id="ciudad" className='mb-6 w-10/12 text-black rounded-md' value={formRegister.ciudad} onChange={handleChange}/>
        <label htmlFor="direccion" className='mb-2'>Direccion:</label>
        {required.direccion != "" && <p className='text-red-600 pb-2'>{required.direccion}</p>}
        <input type="text" name="direccion" id="direccion" className='mb-6 w-10/12 text-black rounded-md' value={formRegister.direccion} onChange={handleChange}/>
        <input type="submit" value="Registrar" className="bg-[#fa503f] w-10/12 cursor-pointer mb-4 hover:bg-red-800 font-bold rounded-full py-2"/>
        {message && <h3 className='bg-[#fa503f] text-white rounded-md px-10 py-2 font-bold'>{message}</h3> }
        
      </form>
      
    </div>
  )
}

export default FormRegister
