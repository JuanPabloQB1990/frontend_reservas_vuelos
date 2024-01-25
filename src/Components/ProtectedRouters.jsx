
import { useEffect } from 'react';
import isTokenExpired from '../helpers/IsTokenExpired'
import { useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ProtectedRouters = () => {
    const user = useSelector(state => state)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isTokenExpired(user.auth.token) && user.auth.rol == "CLIENTE" && user.auth.rol == "EMPLEADO") {
            return navigate('/login')
        }
    }, []);
    

  return <Outlet/>
}

export default ProtectedRouters
