import React, { useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import freewsad from '../assets/freewsad-item.webp';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
// Import Swiper styles
import 'swiper/css';


import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useContext } from 'react';
import { UrlContext } from '../context/UrlContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PlayList() {


   const { lang, url } = useContext(UrlContext);
   const [list, setList] = useState(null);
   const { t } = useTranslation()


   useEffect(() => {
      playList();
   }, [])


   const getDate = (date)=>{
      const day = new Date(date).getDate();
      const month = new Date(date).getMonth()+1;
      const year = new Date(date).getFullYear();
      return `${day}-${month}-${year}`
   }


   const playList = async () => {

      axios.get(url + lang + '/api/post/play-list/', {
         headers: {
            'Content-Type': 'application/json'
         }
      }).then(respons => {
         const data = respons.data
         const playList = data.map(item => {
            return <SwiperSlide>
               <Link to={`/playList/${item.id}/${item.slug}`}>
                  <div className="play-list-container card overflow-hidden">
                     <img src={`http://127.0.0.1:8000` + item.cover} alt="" />
                     <div class="middle">
                        <div class="hover-text h5"><span>{item.name}<br /> {getDate(item.date)}</span></div>
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
      <div className="div">
         <h2 className='h4' dir='auto'>{t('Play lists')}</h2>
         <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            style={{ cursor: 'grab' }}
            spaceBetween={50}
            slidesPerView={3}

         >

            {list}
            <SwiperSlide>
               <div className='more-play-list w-50'>
                  <Link to="/playlists" title={t('See More')}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-circle"  viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                     </svg>
                  </Link>
               </div>
            </SwiperSlide>

         </Swiper>
      </div>
   )
}
