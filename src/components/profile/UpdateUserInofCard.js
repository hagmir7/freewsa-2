import React from 'react';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { UrlContext } from '../../context/UrlContext';
import { LoadingOutlined } from '@ant-design/icons';


const addSpenerUser = (woner)=>{
    document.getElementById(woner+'-box').classList.remove('d-none');
    document.getElementById(woner+'-save').classList.add('d-none');
    document.getElementById(woner+'-btn').setAttribute('disabled', '')
  }
  
  const removeSpenerUser = (woner)=>{
    document.getElementById(woner+'-box').classList.add('d-none');
    document.getElementById(woner+'-save').classList.remove('d-none');
    document.getElementById(woner+'-btn').removeAttribute('disabled');
  }




export default function UpdateUserInofCard(props) {
    const { userInof } = useContext(AuthContext);
    const {t} = useTranslation();
    const {lang, url} = useContext(UrlContext);
    const updateInfo = async (event) => {
        event.preventDefault();
        addSpenerUser('user');

        const response = await fetch(`${url}${lang}/api/update/user/${userInof.username}`, {
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
        if(response.status == 200){
            message.success(data.message)
            removeSpenerUser('user')
        }else{
            removeSpenerUser('user')
            message.error(data.message)
        }

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
                 <button type="submit" id="user-btn" className="btn btn-primary px-4 btn-sm w-50">
                        <span id="user-save">{t("Save Changes")}</span> 
                        <LoadingOutlined className="d-none" id="user-box" style={{ fontSize: 24}} />
                </button>

                </div>
            </div>
        </div>
    </form>
</div>
  )
}







