import React from 'react';
import axios from 'axios';
import { message } from 'antd';
import GetDate from './GetDate';
import { useContext } from 'react';
import { UrlContext } from '../context/UrlContext';

export default function PlayListItem(props) {

    const {lang, url} = useContext(UrlContext)

    React.useEffect(()=>{
        getPlayList();
        window.scroll(0,0)
    },[props.slug])


    const [playList, setPlayList] = React.useState('');

    const getPlayList = async () => {
        axios.get(`${url}${lang}/api/post/list/crud/${props.id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(respons => {
            setPlayList(respons.data);
        }).catch(error => {
            message.error("Can't load play list details.")
        })
    }



    return (
        <div className="col-12 col-md-7 col-lg-8 col-xl-8 mb-3 m-0">
            <article className="mt-2">
                <h1 className='h4 m-0'>{playList.name}</h1>
                <div className='d-flex align-items-center'>
                    <span className='fs-6 mt-1'> &#xa0;{GetDate(playList.date)}</span>
                </div>
                <div className='mt-2 fs-6' style={{whiteSpace:'pre-wrap'}}>{playList.description}</div>
            </article>
        </div>
    )
}
