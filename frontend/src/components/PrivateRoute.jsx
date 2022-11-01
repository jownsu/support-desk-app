import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner';

const PrivateRoute = ({children}) => {

    const { loggedIn, loading } = useAuthStatus();

    if(loading){
        return <Spinner /> 
    }

    return loggedIn ? children : <Navigate to='/login' />
}

export default PrivateRoute