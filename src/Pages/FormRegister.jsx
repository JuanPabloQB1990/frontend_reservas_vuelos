import {useState} from 'react'
import ComponentLabel from '../Components/ComponentLabel';
import ComponentInput from '../Components/ComponentInput';
import ComponentButton from '../Components/ComponentButton';

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
      
    }
    
  return (
    <div className='h-auto flex justify-center items-center py-6'>
      <form onSubmit={handleSubmit} className='bg-[#270570] h-auto w-2/4 max-sm:w-4/5 rounded-lg flex flex-col items-center justify-center py-4'>
        <ComponentLabel htmlFor="nombre" text="Nombre:"/>
        {required.nombre != "" && <p className='text-red-600 pb-2'>{required.nombre}</p>}
        <ComponentInput type="text" name="nombre" id="nombre" value={formRegister.nombre} handleChange={handleChange}/>
        <ComponentLabel htmlFor="apellido" text="Apellido:"/>
        {required.apellido != "" && <p className='text-red-600 pb-2'>{required.apellido}</p>}
        <ComponentInput type="text" name="apellido" id="apellido" value={formRegister.apellido} handleChange={handleChange}/>
        <ComponentLabel htmlFor="telefono" text="Telefono:"/>
        {required.telefono != "" && <p className='text-red-600 pb-2'>{required.telefono}</p>}
        <ComponentInput type="text" name="telefono" id="telefono" value={formRegister.telefono} handleChange={handleChange}/>
        <ComponentLabel htmlFor="correo" text="Correo:"/>
        {required.correo != "" && <p className='text-red-600 pb-2'>{required.correo}</p>}
        <ComponentInput type="email" name="correo" id="correo" value={formRegister.correo} handleChange={handleChange}/>
        <ComponentLabel htmlFor="username" text="Username:"/>
        {required.username != "" && <p className='text-red-600 pb-2'>{required.username}</p>}
        <ComponentInput type="text" name="username" id="username" value={formRegister.username} handleChange={handleChange}/>
        <ComponentLabel htmlFor="password" text="Password:"/>
        {required.password != "" && <p className='text-red-600 pb-2'>{required.password}</p>}
        <ComponentInput type="text" name="password" id="password" value={formRegister.password} handleChange={handleChange}/>
        <ComponentLabel htmlFor="pais" text="País:"/>
        {required.pais != "" && <p className='text-red-600 pb-2'>{required.pais}</p>}
        <ComponentInput type="text" name="pais" id="pais" value={formRegister.pais} handleChange={handleChange}/>
        <ComponentLabel htmlFor="ciudad" text="Ciudad:"/>
        {required.ciudad != "" && <p className='text-red-600 pb-2'>{required.ciudad}</p>}
        <ComponentInput type="text" name="ciudad" id="ciudad" value={formRegister.ciudad} handleChange={handleChange}/>
        <ComponentLabel htmlFor="direccion" text="Dirección:"/>
        {required.direccion != "" && <p className='text-red-600 pb-2'>{required.direccion}</p>}
        <ComponentInput type="text" name="direccion" id="direccion" value={formRegister.direccion} handleChange={handleChange}/>
        <ComponentButton type="submit" value="Registrar"/>
        {message && <h3 className='bg-[#fa503f] text-white rounded-md px-10 py-2 font-bold'>{message}</h3>}
        
      </form>
      
    </div>
  )
}

export default FormRegister
