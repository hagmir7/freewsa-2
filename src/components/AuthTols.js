import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import React from 'react'
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import coockies from 'js-cookie';



function Auth() {
    const { logoutUser, userInof, userProfile, getUserIfno } = useContext(AuthContext);
    const [menu, setMenu] = useState(false);


    useEffect(() => {
        getUserIfno();


    }, [])


    const { t } = useTranslation();
    const langCode = coockies.get('i18next') === 'en';



    return (
        <div className="dropdown d-lg-block d-none bg-white mt-2" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
            <img src={userProfile.avatar} width="40px" title={userInof.username} loading='eager' alt={userInof.username} height={40} className="cover border rounded-pill pointer" />
            {
                menu ?
                    <ul className={`dropdown-menu d-block ${langCode ? 'end' : 'start'}-0  animate__animated animate__flipInX animate__faster`}>
                        <li><Link to={`user/` + userInof.username} className="dropdown-item">{t('Profile')}</Link></li>
                        <li><Link to={`/profile/${userInof.username}/`} className='dropdown-item'>{t("Update profile")}</Link></li>
                        <li><span onClick={logoutUser} className="dropdown-item pointer">{t("Logout")}</span></li>
                    </ul>
                    :
                    <></>
            }

        </div>
    )
}

function NotAuth() {
    const { t } = useTranslation()

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