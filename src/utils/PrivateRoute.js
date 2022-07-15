import React from 'react'
import {Outlet, Navigate} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';


export const PrivateRoute = ()=>{

  const {user} = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/accounts/login" />
 
}