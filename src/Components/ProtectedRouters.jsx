import { useEffect } from 'react';
import isTokenExpired from '../helpers/IsTokenExpired'
import { useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ProtectedRouters = ({children}) => {
    const user = useSelector(state => state)
    const navigate = useNavigate()
    
    if (!isTokenExpired(user.auth.token)) {            
        return navigate('/login')
    }
    
  return children
}

export default ProtectedRouters
