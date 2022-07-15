import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import LoadingDetail from '../components/LoadignDetail';
import { UserInfo, UpdateUserInfo, ProfileUpdate } from '../components/ProfileCard';
import axios from 'axios';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthContext from '../context/AuthContext';
import { UrlContext } from '../context/UrlContext';

export const UpdateProfile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);

    const history = useNavigate();
    const {t} = useTranslation();
    const {user} = useContext(AuthContext);
    const {url, lang} = useContext(UrlContext);

    useEffect(() => {
        getData()
    }, [])


    let getData = async () => {
        const response = await fetch(`${url}/${lang}/api/user/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        if (response.status === 200) {
            setProfile(data);
        } else {
            history('/accounts/login');
        }
    }

    const sendAvatar = async (event) => {
        event.preventDefault();
        console.log(event.target.avatar.files[0]);
        console.log(event.target.avatar.files[0].name);


        const formDate = new FormData();
        formDate.append('avatar', event.target.avatar.files[0], event.target.avatar.files[0].name);
        axios.put(`${url}/${lang}/api/update/avatar/`+user.user_id, formDate, {
            headers: {
                'content-type': 'multipart/form-data'
            }

        })
        .then(res => {
            message.success(t("Avatar updated successfully"))
        }).catch(err => console.log(err))
    };


    const success = ()=>{
        const avatar = document.querySelector('#avatar');
        const image = document.querySelector('.ant-image-img');
        image.setAttribute('src', URL.createObjectURL(avatar.files[0]));
    }






    const Html = () => {
        return (
            <div className="container">
                <div className="main-body">
                    <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">

                        <UserInfo
                            username={profile[0].username}
                            first_name={profile[0].first_name}
                            last_name={profile[0].last_name}
                            email={profile[0].email}
                            avatar={profile[1].avatar}
                            country={profile[1].country}
                            bio={profile[1].bio}
                            city={profile[1].city}
                            phone={profile[1].phone}
                        />

                        <div className='card mt-3 p-2'>
                            <form onSubmit={sendAvatar}>
                                <label className='mb-2 h6'>{t("Change profile image")}</label>
                                <input type="file" className='form-control' onChange={success} id='avatar' name='avatar' required />
                                <button type='submit'  className='btn btn-primary mt-3 text-white' >{t("Change")}</button>
                            </form>
                        </div>
                    </div>

                        <div className='col-md-8'>
                            <UpdateUserInfo
                                username={profile[0].username}
                                first_name={profile[0].first_name}
                                last_name={profile[0].last_name}
                                email={profile[0].email}
                                avatar={profile[1].avatar}
                                country={profile[1].country}
                                bio={profile[1].bio}
                                city={profile[1].city}
                                phone={profile[1].phone}

                            />


                            <ProfileUpdate
                                gander={profile[1].gander}
                                first_name={profile[0].first_name}
                                last_name={profile[0].last_name}
                                email={profile[0].email}
                                avatar={profile[1].avatar}
                                country={profile[1].country}
                                bio={profile[1].bio}
                                city={profile[1].city}
                                phone={profile[1].phone}

                            />


                        </div>
                    </div>

                </div>
            </div>
        )
    }



    return (profile != null ? <Html /> : <LoadingDetail />)

}