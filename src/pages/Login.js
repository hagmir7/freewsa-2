import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import logo from '../assets/img/logo-rounded-pill.webp';
import AuthContext from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { LoadingOutlined } from '@ant-design/icons';


const Login = () => {

    let {login} = useContext(AuthContext);
    const {t} = useTranslation()
    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center w-100">
                    <div className="text-center mb-1">
                            <img src={logo}  alt="Freewsa" width="70px" />
                            <p className="h5 mb-1">{t("Log in to manage your account")}</p>
                    </div>
                    <div className="col-md-5 shadow-sm card p-3">
                        <div id="alert-login"></div>
                        <form onSubmit={login}>
                            <label htmlFor="username" className="text-muted h6">{t('Username')}</label>
                            <input type="text" name='username' className="form-control mb-3" placeholder={t("Enter your username")}/>
                            <label htmlFor="password" className="text-muted h6">{t("Password")}</label>
                            <input type="password" name='password' className="form-control mb-3" placeholder={t("Enter your password")}/>
                            <button type="submit" id="login-btn" className="w-100 btn btn-primary my-2">
                                <span id="login">{t("Login")}</span> 
                                <LoadingOutlined className="d-none" id="box" style={{ fontSize: 24}} />
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row d-flex justify-content-center w-100 mt-3">
                    <div className="col-md-5 card shadow-sm p-4 text-center">
                        <p className="m-0">{t("Not yet registered")} ? <Link to="/accounts/register" className="text-info">{t("Create your account")}</Link></p>
                    </div>
                </div>
            </div>
            <Helmet>
                <title>{t("Login")} - FreeWsad</title>
            </Helmet>
        </div>
    )
}


export default Login;