import React, { useContext } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { UrlContext } from '../../context/UrlContext';
import AuthContext from '../../context/AuthContext';






export default function ChangeAvatar() {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);
    const { url, lang } = useContext(UrlContext);


    const success = () => {
        const avatar = document.querySelector('#avatar');
        const image = document.querySelector('.ant-image-img');
        image.setAttribute('src', URL.createObjectURL(avatar.files[0]));
    }

    const sendAvatar = async (event) => {
        event.preventDefault();
        addSpener('avatar');

        const formDate = new FormData();
        formDate.append('avatar', event.target.avatar.files[0], event.target.avatar.files[0].name);
        axios.put(`${url}${lang}/api/update/avatar/` + user.user_id, formDate, {
            headers: {
                'content-type': 'multipart/form-data'
            }

        })
            .then(res => {
                message.success(t("Avatar updated successfully"))
                removeSpener('avatar')
            }).catch(err => {
                removeSpener('avatar');
                message.error(t("Can't updated Avatar."));
            }


            )
    };



    const addSpener = (woner) => {
        document.getElementById(woner + '-box').classList.remove('d-none');
        document.getElementById(woner + '-save').classList.add('d-none');
        document.getElementById(woner + '-btn').setAttribute('disabled', '')
    }

    const removeSpener = (woner) => {
        document.getElementById(woner + '-box').classList.add('d-none');
        document.getElementById(woner + '-save').classList.remove('d-none');
        document.getElementById(woner + '-btn').removeAttribute('disabled');
    }


    return (
        <div className='card mt-3 p-2'>
            <form onSubmit={sendAvatar}>
                <label className='mb-2 h6'>{t("Change profile image")}</label>
                <input type="file" className='form-control' onChange={success} id='avatar' name='avatar' required />
                <button type="submit" id="avatar-btn" className="btn btn-primary px-4 mt-2 btn-sm w-50">
                    <span id="avatar-save">{t("Save Changes")}</span>
                    <LoadingOutlined className="d-none" id="avatar-box" style={{ fontSize: 24 }} />
                </button>
            </form>
        </div>
    )
}
