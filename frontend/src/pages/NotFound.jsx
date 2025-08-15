import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const NotFound = () => {

    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
        navigate('/')
        },1000);
    },[])

  return (
    <div>Page not found</div>
  )
}

export default NotFound