import React from 'react';
import axios from 'axios';
import { message } from 'antd';
import GetDate from './GetDate';
import { useContext } from 'react';
import { UrlContext } from '../context/UrlContext';
import LoadingDetail from './LoadignDetail';
import { useTranslation } from 'react-i18next';
import GoogleAd from '../ads/GoogleAd';


export default function PlayListItem(props) {

    const {lang, url} = useContext(UrlContext)

    React.useEffect(()=>{
        getPlayList();
        window.scroll(0,0)
    },[props.slug])

    const {t} = useTranslation()


    const [playList, setPlayList] = React.useState(null);

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
        <>
        { playList === null ? <LoadingDetail /> :
            <div className="col-12 col-md-7 col-lg-8 col-xl-8 mb-3 m-0">
            <article className="mt-2">
                <h1 className='h4 m-0' dir='auto'>{playList.name}</h1>
                <div className='d-flex align-items-center'>
                    <span className='fs-6 mt-1' dir='auto'>{t('At')} &#xa0;{GetDate(playList.date)}</span>
                </div>
                <div className='mt-2 fs-6' dir='auto' style={{whiteSpace:'pre-wrap'}}>{playList.description}</div>
                <GoogleAd slot="4567237334" googleAdId="ca-pub-6043226569102012"/>
            </article>
        </div>
        }
        
        
        
        </>
       
    )
}
