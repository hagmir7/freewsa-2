import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import logo from '../assets/img/logo-rounded-pill.webp';
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UrlContext } from "../context/UrlContext";
import { LoadingOutlined } from '@ant-design/icons';



const Register = () => {


    const history = useNavigate();
    const { loginUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const {t} = useTranslation();
    const {url, lang} = useContext(UrlContext)

    const errorBtn = ()=>{
        document.getElementById('box').classList.add('d-none');
        document.getElementById('register').classList.remove('d-none');
        document.getElementById('register-btn').removeAttribute('disabled', '')
    }

    const btnLoading = ()=>{
        document.getElementById('box').classList.remove('d-none');
        document.getElementById('register').classList.add('d-none');
        document.getElementById('register-btn').setAttribute('disabled', '')
    }

    const sendUser = async (event) => {
        btnLoading();
        const request = {
            username: event.target.username.value,
            email: event.target.email.value,
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            password: event.target.password.value,
            password2: event.target.password1.value
        }

        event.preventDefault();
        if(event.target.password.value === event.target.password1.value){
            let fetchItem = await fetch(`${url}${lang}/api/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            })

            const data = await fetchItem.json();
            if (fetchItem.status === 200) {
                if(!data.error){
                    console.log(data.message)
                    loginUser(event.target.username.value, event.target.password.value);
                    history('/');
                }else{
                    if(undefined !== data.message.username){
                        setError(data.message.username)
                        errorBtn();
                    }else if(undefined !== data.message.password){
                        setError(data.message.password)
                        errorBtn();
                    }
                }
            

            }else{
                setError(t("Email already exists."))
                errorBtn();
            }

        }else{
            setError(t("Password does not match."));
            errorBtn();
        }
    }





    return (
        <div className="bg-colors">
            <div className="container">
                <div className="row d-flex justify-content-center w-100">
                    <div className="text-center mb-1">
                        <img src={logo} alt="Freewsa" width="70px" />
                        <p className="h5 mb-1">{t("Create your account and start reading now")}</p>
                    </div>
                    <div className="col-md-5 shadow-sm card p-3">
                        <form className="mt-2" onSubmit={sendUser}>
                            {error != null ? <div className="alert alert-danger">{error}</div> : ''}
                            <input type="text" name='username' className="form-control mb-3" placeholder={t("Username")} required />
                            <input type="text" name='first_name' className="form-control mb-3" placeholder={t("First name")} required />
                            <input type="text" name='last_name' className="form-control mb-3" placeholder={t("Last name")} required />
                            <input type="email" name='email' className="form-control mb-3" placeholder={t("Email")} required />
                            <input type="password" name='password' className="form-control mb-3" placeholder={t("Password")} required />
                            <input type="password" name='password1' className="form-control mb-3" placeholder={t("Confirm password")} required />
                            <button type="submit" className="w-100 btn btn-primary my-2" id="register-btn">
                                <span id="register">{t("Register")}</span>
                                <LoadingOutlined className="d-none" id="box" style={{ fontSize: 24}} />
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row d-flex justify-content-center w-100 mt-3">
                    <div className="col-md-5 card shadow-sm p-4 text-center">
                        <p className="m-0">{t("Already have an account")} ? <Link to="/accounts/login" className="text-info">{t("Login")}</Link></p>
                    </div>
                </div>
            </div>
            <Helmet>
                <title>{t("Register")} - FreeWsad</title>
            </Helmet>
        </div>
    )
}
export default Register;