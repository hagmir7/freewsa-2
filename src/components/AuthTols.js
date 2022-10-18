import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import React from 'react'
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import coockies from 'js-cookie';
import { UserOutlined, UserSwitchOutlined, LogoutOutlined, MenuUnfoldOutlined, GlobalOutlined} from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { LazyLoadImage } from "react-lazy-load-image-component";




function Auth() {
    const { logoutUser, userInof, userProfile, getUserIfno } = useContext(AuthContext);


    useEffect(() => {
        getUserIfno();


    }, [])
    const { t } = useTranslation();
    const langCode = coockies.get('i18next') === 'en';

    const menu = (
        <Menu
            items={[
                {
                    label: <Link to={`user/` + userInof.username} className="menu-items"><UserOutlined /> &#xa0; {t('Profile')}</Link>,
                    key: '0',
                },
                {
                    label: <Link to={`/profile/${userInof.username}/`} className='menu-items'><UserSwitchOutlined /> &#xa0; {t("Update profile")}</Link>,
                    key: '1',
                },
                {
                    label: <Link to={`/playlists`} className='menu-items'><MenuUnfoldOutlined /> &#xa0; {t("Play lists")}</Link>,
                    key: '3',
                },
                {
                    label: <Link to={`/language`} className='menu-items'><GlobalOutlined /> &#xa0; {t("Language")}</Link>,
                    key: '4',
                },
                {
                    label: <span onClick={logoutUser} className="menu-items pointer"><LogoutOutlined /> &#xa0; {t("Logout")}</span>,
                    key: '5',
                },
            ]}
        />
    );






    return (
        <div className="dropdown d-lg-block d-none bg-white mt-2">
            <Dropdown overlay={menu} trigger={['click']} >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <LazyLoadImage effect="blur" src={userProfile.avatar} width="40px" title={userInof.username} loading='eager' alt={userInof.username} height={40} className="cover border rounded-pill pointer" />
                    </Space>
                </a>
            </Dropdown>
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