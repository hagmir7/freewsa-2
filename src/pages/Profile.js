import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import LoadingDetail from '../components/LoadignDetail';
import { UserInfo, UserInfoCard } from '../components/ProfileCard';
import { UrlContext } from '../context/UrlContext';
import NotFoundPage from './NotFoundPage';


export const Profile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const {url, lang} = useContext(UrlContext);
    const history = useNavigate();

    useEffect(() => {
        getData()
    }, [])


    let getData = async () => {
        const response = await fetch(`${url}${lang}/api/user/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .catch((error) => {
            console.error('Error:', error);
          });
        const data = await response.json()
        if (response.status === 200) {
            setProfile(data);
            console.log(data)
        } else {
            history('/accounts/login');
        }
    }


    const Html = () => {
        return (
            <div className="container">
                <div className="main-body">
                    <div className="row gutters-sm">
                        <div className='col-md-4'>
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
                        </div>



                        <div className='col-md-8 '>
                        <UserInfoCard
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
                        </div>
                    </div>

                </div>
            </div>
        )
    }



    return (profile != null ? <Html /> : <LoadingDetail />)
}
