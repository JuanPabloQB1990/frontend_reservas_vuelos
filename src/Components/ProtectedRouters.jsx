
import { useEffect } from 'react';
import isTokenExpired from '../helpers/IsTokenExpired'
import { useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ProtectedRouters = () => {
    const user = useSelector(state => state)
    const navigate = useNavigate()
    console.log(user);
    useEffect(() => {
        if (isTokenExpired(user.auth.token)) {
            return navigate('/login')
        }
    }, []);
    

  return <Outlet/>
}

export default ProtectedRouters
