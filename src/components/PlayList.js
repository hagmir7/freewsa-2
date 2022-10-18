import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Empty, Tooltip } from 'antd';
import Cookies from 'js-cookie';
// Import Swiper styles
import 'swiper/css';
// lazy loding settings
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useContext } from 'react';
import { UrlContext } from '../context/UrlContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PlayListCartLoading from './playList/PlayListCartLoading';

export default function PlayList() {

   useEffect(() => {
      playList();
   },[Cookies.get('i18next')])


   const { lang, url } = useContext(UrlContext);
   const [list, setList] = useState(null);
   const { t } = useTranslation();
   const [isPlayList, setIsPlayList] = useState(false);
   




   // Date fromate
   const getDate = (date) => {
      const day = new Date(date).getDate();
      const month = new Date(date).getMonth() + 1;
      const year = new Date(date).getFullYear();
      return `${day}-${month}-${year}`
   }


   const playList = () => {
      axios.get(`${url}${lang}/api/post/play-list/`, {
         headers: {
            'Content-Type': 'application/json'
         }
      }).then(respons => {
         const data = respons.data
         const playList = data.map(item => {
            setIsPlayList(true)
            return <SwiperSlide>
               <Link to={`/playList/${item.id}/${item.slug}`} key={item.slug}>
                  <div className="play-list-container rounded overflow-hidden">
                     <LazyLoadImage  src={item.cover} height="100%" width="100%" alt={item.name} effect='blur' />
                     <div className="middle">
                        <div className="hover-text h5"><span>{item.name}<br /> {getDate(item.date)}</span></div>
                     </div>
                  </div>
               </Link>
            </SwiperSlide>
         })
         setList(playList);
      }).catch(error => {
         console.log(error)
      })
   }




   return (
      <div className="div play-list">
         {/* Play list Header */}
         <div className='d-flex justify-content-between bg-white p-2 rounded shadow-sm mb-2'>
            <h2 className='h4 m-0' dir='auto'>{t('Play lists')}</h2>
            <div><Link to='/playlists' className='fs-6 mx-3'>{t("See All")} { Cookies.get('i18next') === 'ar' ? <span>&#x2190;</span> : <span>&#x2192;</span>} </Link></div>
         </div>
         
         <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            style={{ cursor: 'grab' }}
            spaceBetween={50}
            slidesPerView={3}

         >

            {list == null ? <PlayListCartLoading /> : isPlayList === false ? <Empty description={t("No playlists")} className='my-3' /> :  list}
            {list == null ? '' : isPlayList === false ? '' :
               <SwiperSlide>
                  <div className='more-play-list w-50'>
                     <Tooltip placement="right" title={t('See All')} color='blue' key='blue'>
                        <Link to="/playlists" >
                           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                           </svg>
                        </Link>
                     </Tooltip>

                  </div>
               </SwiperSlide>}


         </Swiper>
      </div>
   )
}
