import React, { useState } from 'react'
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

export const UserInfo = (props) => {

    const {t} = useTranslation()   
    return (
            <div className="card">
                <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                        <Image
                            width={150}
                            height={150}
                            src={`http://127.0.0.1:8000` + props.avatar}
                            className="rounded-circle cover border overflow-hidden"
                        />
                        <div className="mt-3">
                            <h4>{props.first_name} {props.last_name}</h4>
                            <p className="text-secondary mb-1">{props.bio}</p>
                            <p className="text-muted font-size-sm">{props.country}, {props.city}</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}



export const UserInfoCard = (props) => {


    const { user } = useContext(AuthContext);
    const isAuth = user === null ? false : true;
    const {t} = useTranslation();

    return (
            <div className="card py-3">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("Full Name")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {props.first_name} {props.last_name}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("Email")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {props.email}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("Phone")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {props.phone}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("Address")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {props.country}, {props.city}
                        </div>
                    </div>

                    {isAuth ? user.username === props.username ? (
                        <div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-12">
                                    <Link to={`/profile/${props.username}`} className="btn btn-primary">{t("Edit")}</Link>
                                </div>
                            </div>
                        </div>
                    ) : '' : ''}

                </div>
            </div>
    )
}



export const UpdateUserInfo = (props) => {

    const { user } = useContext(AuthContext);
    const {t} = useTranslation();


    const updateInfo = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://127.0.0.1:8000/en/api/update/user/${user.username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: event.target.username.value,
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value,
                email: event.target.email.value,
            })
        })
        const data = await response.json();
        response.status == 200 ? message.success(data.message) : message.error(data.message);

    }
    return (
        <div className="card">
            <form onSubmit={updateInfo}>
                <div className="card-body">
                    <div id='alert'></div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("Username")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" required name='username' readOnly className="form-control" defaultValue={props.username} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("First name")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" required name='first_name' className="form-control" defaultValue={props.first_name} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("Last name")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" required name='last_name' className="form-control" defaultValue={props.last_name} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("Email")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="email" required name='email' className="form-control" defaultValue={props.email} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-9 text-secondary">
                            <input type="submit" className="btn btn-primary px-4" value={t("Save Changes")} />
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}



export const ProfileUpdate = (props) => {
    const { user } = useContext(AuthContext);
    const {t} = useTranslation();
    const UpdateProfile = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://127.0.0.1:8000/en/api/update/profile/${user.user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: event.target.phone.value,
                gander: event.target.gander.value,
                country: event.target.country.value,
                city: event.target.city.value,
                bio: event.target.bio.value,
            })
        })
        const data = await response.json();
        response.status == 200 ? message.success(data.message) : message.error(data.message);


    }

    const gander = ['Male', "Famele"]

    return (
        <div className="card mt-3">
            <form onSubmit={UpdateProfile}>
                <div className="card-body">
                    <div id='alert2'></div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("Phone")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" required name='phone' className="form-control" defaultValue={props.phone} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("Country")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" required name='country' className="form-control" defaultValue={props.country} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("City or town")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" required name='city' className="form-control" defaultValue={props.city} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("Gander")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <select className='form-select' name='gander' required>
                                <option value="Male">{t("Male")}</option> 
                                <option value="Famele">{t("Famele")}</option> 
                            </select>

                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("Bio")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <textarea required name='bio' className="form-control" defaultValue={props.bio}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-9 text-secondary">
                            <input type="submit" className="btn btn-primary px-4" value={t("Save Changes")} />
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}


