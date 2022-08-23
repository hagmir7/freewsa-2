import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import NotFoundPage from '../pages/NotFoundPage';

export const AdminRoute = () => {
    const {user} = useContext(AuthContext);
    if(user){
        return user.is_superuser ? <Outlet /> : <NotFoundPage />
    }else{
        return <Navigate to="/accounts/login" />
    }
}
