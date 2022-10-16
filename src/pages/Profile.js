import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import LoadingDetail from '../components/LoadignDetail';
import { UrlContext } from '../context/UrlContext';
import { UserInfoCard } from '../components/profile/UserInfoCard';
import { UserInofCardBio } from '../components/profile/UserInfoCardBio';
import NotFoundPage from './NotFoundPage'


export const Profile = () => {
    const { username } = useParams();
    const [data, setData ] = useState(null)
    const {url, lang} = useContext(UrlContext);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        getData()
    }, [username])


    let getData = async () => {
        const response = await fetch(`${url}${lang}/api/user/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        response.status === 200 ? setData(data) : setStatus(response.status);
    }


    const HTML = () => {
        return (
            <div className="container">
                <div className="main-body">
                    <div className="row gutters-sm">
                        <div className='col-md-4'>
                        <UserInofCardBio
                            username={data[0].username}
                            first_name={data[0].first_name}
                            last_name={data[0].last_name}
                            email={data[0].email}
                            avatar={data[1].avatar}
                            country={data[1].country}
                            bio={data[1].bio}
                            city={data[1].city}
                            phone={data[1].phone}
                        />
                        </div>



                        <div className='col-md-8 '>
                        <UserInfoCard
                            username={data[0].username}
                            first_name={data[0].first_name}
                            last_name={data[0].last_name}
                            email={data[0].email}
                            avatar={data[1].avatar}
                            country={data[1].country}
                            bio={data[1].bio}
                            city={data[1].city}
                            phone={data[1].phone}
                        />
                        </div>
                    </div>

                </div>
            </div>
        )
    }




    return (data !== null ? <HTML /> : status === 404 ? <NotFoundPage /> :  <LoadingDetail />  );
}
