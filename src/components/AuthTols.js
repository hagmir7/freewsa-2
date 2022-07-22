import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import React from 'react'
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Auth() {
    const { logoutUser, user } = useContext(AuthContext);
    const {t} = useTranslation()
    return (
        <div className="dropdown d-lg-block d-none bg-white">
            <img src={user.avatar} width="40px" height={40}  className="cover border rounded-pill pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" />
            <ul className='dropdown-menu dropdown-menu-end animate__animated animate__flipInX animate__faster' id="avatar-menu" aria-labelledby="dropdownMenuButton1">
                <li><Link to={user.username} className="dropdown-item">{t('Profile')}</Link></li>
                <li><Link to={`/profile/${user.username}`} className='dropdown-item'>{t("Update profile")}</Link></li>
                <li><span onClick={logoutUser} className="dropdown-item pointer">{t("Logout")}</span></li>
            </ul>
        </div>
    )
}

function NotAuth() {
    const {t} = useTranslation()

    return (
        <div className="d-none d-lg-block">
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