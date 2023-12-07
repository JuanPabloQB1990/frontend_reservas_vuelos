
import { useEffect } from 'react';
import isTokenExpired from '../helpers/IsTokenExpired'
import { useNavigate, Outlet } from 'react-router-dom'

const ProtectedRouters = ({auth}) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (isTokenExpired(auth.token)) {
            return navigate('/login')
        }
    }, []);
    

  return <Outlet/>
}

export default ProtectedRouters
