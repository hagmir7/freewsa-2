import React from 'react'
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export const UserInfoCard = (props) => {


    const { user } = useContext(AuthContext);
    const isAuth = user === null ? false : true;
    const {t} = useTranslation();

    return (
            <div className="card py-3">
                <div className="card-body p-0">
                <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">{t("Username")}</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {props.username}
                        </div>
                    </div>
                    <hr />
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
                                    <Link to={`/profile/${props.username}/`} className="btn btn-primary">{t("Edit")}</Link>
                                </div>
                            </div>
                        </div>
                    ) : '' : ''}

                </div>
            </div>
    )
}