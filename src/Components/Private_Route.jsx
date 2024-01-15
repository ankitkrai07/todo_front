import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const Private_Route = ({children}) => {

    const isAuth = useSelector((store) => store.authReducer.isAuth);

    if(!isAuth){
        return <Navigate to='/login' />
    }
  return children
}

export default Private_Route