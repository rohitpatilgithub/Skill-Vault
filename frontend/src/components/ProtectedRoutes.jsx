import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router';

const ProtectedRoutes = ({ children }) => {

    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        setToken(sessionStorage.getItem('token'));
        setLoading(false);
    },[])

    if(loading){
        return <div>Loading...</div>
    }

    if(!token){
        return <Navigate to='/' replace/>;
    }

  return children;
}

export default ProtectedRoutes;