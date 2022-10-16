import { Button, message, Space, Spin  } from 'antd';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetDate from '../components/GetDate';
import RandomColors from '../components/RandomColors';
import { UrlContext } from '../context/UrlContext';

export default function AllPlayLists() {

  useEffect(()=>{
    onLoadMore();
  }, [])
  const [list, setList] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [btnVisible, setBtnVisible] = React.useState(true);
  const [loader, setLoader] = React.useState(false)
  const {url, lang} = React.useContext(UrlContext);





  const getList = () => {
    setLoader(true)
    axios({
      method: 'GET',
      url: `${url + lang}/api/all/posts/play-lists`,
      params: { page: page }
    }).then(response => {
      setList(prevList => {
        return [...new Set([...prevList, response.data.data.map(item => <ListCards key={item.id} id={item.id} image={item.cover} slug={item.slug} title={item.name} date={GetDate(item.date)} />)])]
      })
      setBtnVisible(response.data.has_next)
      setLoader(false)
    }).catch(error => {
      setLoader(false)
    })
  }
  const onLoadMore = ()=>{
    setPage(page + 1)
    getList();
  }



  return (
    <div>
      <div className='row'>
        {list}
      </div>
      <div className="d-flex justify-content-center">
        {loader ? <Space size="middle"><Spin /></Space> : btnVisible ? <Button onClick={onLoadMore}>Load more</Button> : ''}
      </div>
    </div>
  )
}


const ListCards = (props) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-3 loading p-2" key={props.id}>
      <Link to={`/playList/${props.id}/${props.slug}/`}>
        {props.image ?
          <img className="embed-responsive rounded w-100" alt={props.title} src={props.image} sizes="25vw" />
          :
          <div style={{ background: RandomColors(), height: '200px' }} className="embed-responsive border rounded d-flex align-propss-center" sizes="25vw">
            <div className="h3 text-black text-center m-auto">{props.title}</div>
          </div>
        }
      </Link>
      <div className="card-body m-0 p-0 mt-2">
        <Link to={`/playList/${props.id}/${props.slug}/`}>
          <div className="card-title h5 my-0 py-0 text-muted">{props.title.length > 40 ? props.title.slice(0, 40).concat('...') : props.title}</div>
        </Link>
        <p className="card-text">
          <small className="text-muted">
            <span className="mr-2 h6">{props.date}</span>
          </small>
        </p>
      </div>
    </div>
  )
}