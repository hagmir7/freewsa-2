import { Button, Empty, message, Space, Spin } from 'antd';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import GetDate from '../components/GetDate';
import PlayListCartLoading from '../components/playList/PlayListCartLoading';
import RandomColors from '../components/RandomColors';
import { UrlContext } from '../context/UrlContext';
// lazy loding settings
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loading from '.././assets/loading-image.svg';



export default function AllPlayLists() {

  useEffect(() => {
    onLoadMore();
  }, [])
  const [list, setList] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [btnVisible, setBtnVisible] = React.useState(true);
  const [loader, setLoader] = React.useState(false)
  const { url, lang } = React.useContext(UrlContext);

  const [isPlayList, setIsPlayList] = React.useState(false);
  const { t } = useTranslation();






  const getList = () => {
    setLoader(true)
    axios({
      method: 'GET',
      url: `${url + lang}/api/all/posts/play-lists`,
      params: { page: page }
    }).then(response => {

      setList(prevList => {
        return [...new Set([...prevList, response.data.data.map(item => {
          setIsPlayList(true);
          return (
            <ListCards key={item.id} id={item.id} image={item.cover} slug={item.slug} title={item.name} date={GetDate(item.date)} />
          )
        }


        )])]
      })
      setBtnVisible(response.data.has_next)
      setLoader(false)
    }).catch(error => {
      setLoader(false)
    })
  }
  const onLoadMore = () => {
    setPage(page + 1)
    getList();
  }



  return (
    <div className='container'>
      <div className='row'>
        {list === '' ? <PlayListCartLoading /> : isPlayList === false ? <Empty description={t("No playlists")} className='my-3' /> : list}
      </div>
      <div className="d-flex justify-content-center mt-4">
        {loader ? <Space size="middle"><Spin /></Space> : btnVisible ? <Button onClick={onLoadMore}>Load more</Button> : ''}
      </div>
    </div>
  )
}


const ListCards = (props) => {

  const {t} = useTranslation();
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-3 loading p-2" key={props.id}>
      <Link to={`/playList/${props.id}/${props.slug}/`}>
        {props.image ? <LazyLoadImage className="rounded w-100" effect='blur' height='auto' placeholderSrc={Loading} alt={props.title} src={props.image}  />:
          <div style={{ background: RandomColors(), height: '200px' }} className="border rounded d-flex align-propss-center" >
            <div className="h3 text-black text-center m-auto">{props.title}</div>
          </div>
        }
      </Link>
      <div className="card-body m-0 p-0 mt-2">
        <Link to={`/playList/${props.id}/${props.slug}/`}>
          <div dir='auto' className="h5 my-0 py-0 text-muted">{props.title.length > 40 ? props.title.slice(0, 40).concat('...') : props.title}</div>
        </Link>
          <small className="text-muted mr-2 h6">{t("At")} {props.date} </small>
      </div>
    </div>
  )
}