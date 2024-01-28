import { useEffect } from 'react';
import isTokenExpired from '../helpers/IsTokenExpired'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ProtectedRoutersAdmin = ({children}) => {
    const user = useSelector(state => state)
    const navigate = useNavigate()
    console.log(user.auth.token);
    if (!isTokenExpired(user.auth.token) || user.auth.rol == "CLIENTE") {
        return navigate('/login')
    }
    
    return children
}

export default ProtectedRoutersAdmin
