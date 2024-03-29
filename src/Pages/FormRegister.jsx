import {useState} from 'react'
import ComponentLabel from '../Components/ComponentLabel';
import ComponentInput from '../Components/ComponentInput';
import ComponentButton from '../Components/ComponentButton';
import Modal from 'react-modal';
import ComponentInputError from '../Components/ComponentInputError';

const FormRegister = () => {

    Modal.setAppElement("body");

    const [formRegister, setFormRegister] = useState({
        nombre:"",
        apellido:"",
        telefono:"",
        correo:"",
        username:"",
        password:"",
        pais:"",
        ciudad:"",
        direccion:""
    });
    const [message, setMessage] = useState("");
    const [required, setRequired] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
      setFormRegister({
        ...formRegister, [e.target.name] : e.target.value
      })
    }

    const handleSubmit = async(e) => {
      e.preventDefault()
      
      setRequired({})
      setMessage("")
      
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formRegister)
      };

      const response = await fetch("http://localhost:8090/api/clientes/auth/registro", options)
      const message = await response.json()
      console.log(message);


      if (response.status === 400) {
        return setRequired(message)
      } 

      if (response.status === 404) {
        return setMessage(message.errorMessage)
      }

      setRequired({})
      setMessage("")
      setFormRegister({
        nombre:"",
        apellido:"",
        telefono:"",
        correo:"",
        username:"",
        password:"",
        pais:"",
        ciudad:"",
        direccion:""
      })

      setIsOpen(true)
      
    }

    const customStyles = {
      content: {
          width: '500px',
          heigth: '300px',
          margin: 'auto',
      }
    };

  const openModal = () => {
    setIsOpen(false)
  }
    
  return (
    <div className='h-auto flex justify-center items-center py-6'>
      <form onSubmit={handleSubmit} className='bg-[#270570] h-auto w-2/4 max-sm:w-4/5 rounded-lg flex flex-col items-center justify-center py-4'>
        <ComponentLabel htmlFor="nombre" text="Nombre:"/>
        {required.nombre != "" && <ComponentInputError error={required.nombre}/>}
        <ComponentInput type="text" name="nombre" id="nombre" value={formRegister.nombre} handleChange={handleChange}/>
        <ComponentLabel htmlFor="apellido" text="Apellido:"/>
        {required.apellido != "" && <ComponentInputError error={required.apellido}/>}
        <ComponentInput type="text" name="apellido" id="apellido" value={formRegister.apellido} handleChange={handleChange}/>
        <ComponentLabel htmlFor="telefono" text="Telefono:"/>
        {required.telefono != "" && <ComponentInputError error={required.telefono}/>}
        <ComponentInput type="text" name="telefono" id="telefono" value={formRegister.telefono} handleChange={handleChange}/>
        <ComponentLabel htmlFor="correo" text="Correo:"/>
        {required.correo != "" && <ComponentInputError error={required.correo}/>}
        <ComponentInput type="email" name="correo" id="correo" value={formRegister.correo} handleChange={handleChange}/>
        <ComponentLabel htmlFor="username" text="Username:"/>
        {required.username != "" && <ComponentInputError error={required.username}/>}
        <ComponentInput type="text" name="username" id="username" value={formRegister.username} handleChange={handleChange}/>
        <ComponentLabel htmlFor="password" text="Password:"/>
        {required.password != "" && <ComponentInputError error={required.password}/>}
        <ComponentInput type="text" name="password" id="password" value={formRegister.password} handleChange={handleChange}/>
        <ComponentLabel htmlFor="pais" text="País:"/>
        {required.pais != "" && <ComponentInputError error={required.pais}/>}
        <ComponentInput type="text" name="pais" id="pais" value={formRegister.pais} handleChange={handleChange}/>
        <ComponentLabel htmlFor="ciudad" text="Ciudad:"/>
        {required.ciudad != "" && <ComponentInputError error={required.ciudad}/>}
        <ComponentInput type="text" name="ciudad" id="ciudad" value={formRegister.ciudad} handleChange={handleChange}/>
        <ComponentLabel htmlFor="direccion" text="Dirección:"/>
        {required.direccion != "" && <ComponentInputError error={required.direccion}/>}
        <ComponentInput type="text" name="direccion" id="direccion" value={formRegister.direccion} handleChange={handleChange}/>
        <ComponentButton type="submit" value="Registrar"/>
        {message && <h3 className='bg-[#fa503f] text-white rounded-md px-10 py-2 font-bold'>{message}</h3>}
        
      </form>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div>
          <button onClick={openModal}>X</button>
        </div>
        <div className='flex justify-center items-center h-[300px]'>
          <h1 className='bg-green-600 py-4 px-8 font-extrabold'>Se ha registrado satisfactoriamente</h1>
        </div>
      </Modal>
    </div>
  )
}

export default FormRegister
