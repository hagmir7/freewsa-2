import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import LoadingDetail from '../components/LoadignDetail';
import { UserInofCardBio } from '../components/profile/UserInfoCardBio';
import { UrlContext } from '../context/UrlContext';

import ChangeAvatar from '../components/profile/ChangeAvatar';
import UpdateProfileCard from '../components/profile/UpdateProfileCard';
import UpdateUserInofCard from '../components/profile/UpdateUserInofCard';









export const UpdateProfile = () => {
    
    const { username } = useParams();
    const [profile, setProfile] = useState(null);

    const history = useNavigate();
    const {url, lang} = useContext(UrlContext);

    useEffect(() => {
        getUserInfo()
    }, [])


    let getUserInfo = async () => {
        const response = await fetch(`${url}${lang}/api/user/${username}`, {
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


    const Html = () => {
        return (
            <div className="container">
                <div className="main-body">
                    <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserInofCardBio
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
                        <ChangeAvatar />
                    </div>
                    <div className='col-md-8'>
                        <UpdateUserInofCard
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


                        <UpdateProfileCard
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