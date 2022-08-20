import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import React from 'react'
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";




function Auth() {
    const { logoutUser, userInof, userProfile , getUserIfno} = useContext(AuthContext);
    useEffect(() => {
        getUserIfno();
    
      
    }, [])
    
    
    const {t} = useTranslation()


    return (
        <div className="dropdown d-lg-block d-none bg-white mt-2">
            <img src={userProfile.avatar} width="40px" alt={userInof.username} height={40}  className="cover border rounded-pill pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" />
            <ul className='dropdown-menu dropdown-menu-end animate__animated animate__flipInX animate__faster' id="avatar-menu" aria-labelledby="dropdownMenuButton1">
                <li><Link to={`user/`+userInof.username} className="dropdown-item">{t('Profile')}</Link></li>
                <li><Link to={`/profile/${userInof.username}/`} className='dropdown-item'>{t("Update profile")}</Link></li>
                <li><span onClick={logoutUser} className="dropdown-item pointer">{t("Logout")}</span></li>
            </ul>
        </div>
    )
}

function NotAuth() {
    const {t} = useTranslation()

    return (
        <div className="d-none d-lg-block mt-2">
            <Link to='/accounts/login' className="btn-primary btn rounded-pill mx-2">{t("Log in")} </Link>
            <Link to='/accounts/register' className="btn-defaul border btn-outline-defaul btn rounded-pill mx-2">{t("Register")} </Link>
        </div>
    )
}


const AuthTols = () => {
    const { user } = useContext(AuthContext);
    return user ? (<Auth />) : <NotAuth />
}

export default AuthTols;