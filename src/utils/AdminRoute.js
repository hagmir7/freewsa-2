import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export const AdminRoute = () => {
    const {user} = useContext(AuthContext);
    if(user){
        return user.is_superuser ? <Outlet /> : <Navigate to="/" />
    }else{
        return <Navigate to="/accounts/login" />
    }
}
