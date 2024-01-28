import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ComponentLabel from '../Components/ComponentLabel';
import ComponentInput from '../Components/ComponentInput';
import ComponentButton from '../Components/ComponentButton';
import ComponentInputError from '../Components/ComponentInputError';

const FormCrearVuelo = () => {
    const [tipoVuelos, setTipoVuelos] = useState([]);
    const [aerolineas, setAerolineas] = useState([]);
    const [required, setRequired] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const auth = useSelector(state => state.auth)

    
    useEffect(() => {
      
      if (auth.token != "") {
        
        const cargarTipoVuelos = async(urlTipoVuelos, urlAerolineas) => {

          const options = {
              method: "GET",
              headers: { 
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin" : "http://localhost:5173",
                "Authorization" : "Bearer " + auth.token
              },
          };

          const [resTipoVuelos, resAerolineas] = await Promise.all([
              fetch(urlTipoVuelos, options),
              fetch(urlAerolineas, options),
          ]);

          const dataTipoVuelos = await resTipoVuelos.json();
          const dataAerolineas = await resAerolineas.json();
          setTipoVuelos(dataTipoVuelos);
          setAerolineas(dataAerolineas);
          
        }

        const urlTipoVuelos = "http://localhost:8090/api/tipo_vuelos"
        const urlAerolineas = "http://localhost:8090/api/aerolineas"

        cargarTipoVuelos(urlTipoVuelos, urlAerolineas);
      }
      
    }, [auth.token]);

    const [formVuelos, setFormVuelos] = useState({
        origen: "",
        destino:"",
        fechaPartida:"",
        fechaLlegada:"",
        precio: "",
        asientos: "",
        idTipoVuelo: "",
        idAerolinea: ""
    });

    const handleChange = (e) => {
        setFormVuelos({
            ...formVuelos,
            [e.target.name]:e.target.value,
        });
    }
    
    const handleSubmit = async(e) => {
      e.preventDefault();

      setRequired({})

      console.log(formVuelos);
      const formEnvio = {
        origen: formVuelos.origen,
        destino:formVuelos.destino,
        fechaPartida:formVuelos.fechaPartida,
        fechaLlegada:formVuelos.fechaLlegada,
        precio: formVuelos.precio,
        asientos: formVuelos.asientos,
        tipoVuelo: {
            idTipoVuelo: formVuelos.idTipoVuelo
        },
        aerolinea: {
            idAerolinea: formVuelos.idAerolinea
        }
      }
      
      const options = {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization" : "Bearer " + auth.token 
        },
        body: JSON.stringify(formEnvio)
      };
      
      const response = await fetch("http://localhost:8090/api/vuelos/vuelo", options)

      if (!response.ok) {
        const data = await response.json();
        setRequired(data)
        console.log(data);
      }else{
        const data = await response.json();
        setMessage(data.message)
      }
      
    }
    
  return (
    <div className='h-auto flex justify-center items-center py-6'>
      <form onSubmit={handleSubmit} className='bg-[#270570] h-auto w-2/4 max-sm:w-4/5 rounded-lg flex flex-col items-center justify-center py-4'>
        <ComponentLabel htmlFor="origen" text="Origen:"/>
        <ComponentInput type="text" name="origen" id="origen" value={formVuelos.origen} handleChange={handleChange}/>
        
        <ComponentLabel htmlFor="destino" text="destino:"/>
        <ComponentInput type="text" name="destino" id="destino" value={formVuelos.destino} handleChange={handleChange}/>

        <ComponentLabel htmlFor="fechaPartida" text="fecha partida:"/>
        <ComponentInput type="datetime-local" name="fechaPartida" id="fechaPartida" value={formVuelos.fechaPartida} handleChange={handleChange}/>

        <ComponentLabel htmlFor="fechaLlegada" text="fecha llegada:"/>
        <ComponentInput type="datetime-local" name="fechaLlegada" id="fechaLlegada" value={formVuelos.fechaLlegada} handleChange={handleChange}/>

        <ComponentLabel htmlFor="precio" text="precio:"/>
        <ComponentInput type="number" name="precio" id="precio" value={formVuelos.precio} handleChange={handleChange}/>

        <ComponentLabel htmlFor="numAsientos" text="asientos:"/>
        <ComponentInput type="number" name="asientos" id="numAsientos" value={formVuelos.asientos} handleChange={handleChange}/>

        <ComponentLabel htmlFor="tipoVuelo" text="Seleccione el tipo de vuelo:"/>
        <select onChange={handleChange} name="idTipoVuelo" id="tipoVuelo" className='my-4'>
            <option value="">--</option>
            {tipoVuelos.map((tipoVuelo, key) => {
              return <option key={key} value={formVuelos.idTipoVuelo === null ? "" : tipoVuelo.idTipoVuelo }>{tipoVuelo.nombre}</option>
            })}
        </select>

        <ComponentLabel htmlFor="aerolinea" text="Seleccione la Aerolinea"/>
        <select onChange={handleChange} name="idAerolinea" id="aerolinea" className='my-4'>
        <option value="">--</option>
            {aerolineas.map((aerolinea, key)=>{
              return <option key={key} value={formVuelos.idAerolinea === null ? "" : aerolinea.idAerolinea }>{aerolinea.nombre}</option>
            })}
        </select>
        <ComponentButton type="submit" value="Crear Vuelo"/>
      </form>
    </div>
  )
}

export default FormCrearVuelo
