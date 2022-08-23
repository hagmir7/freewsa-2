import { Avatar, Button, List, message, Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Lang from '../Lang';
import { useContext } from 'react';
import { UrlContext } from '../../context/UrlContext';










const Posts = () => {

  useEffect(() => {
    featchData();
    loadMore();
  }, []);


  const [data, setData] = useState(null);
  const [count, setCount] = useState(12);
  const { t } = useTranslation();
  const {lang , url} = useContext(UrlContext);


  const addSpener = () => {
    document.getElementById('load-btn').setAttribute('disabled', '');
    document.getElementById('load-spenr').classList.remove('d-none');
    document.getElementById('load-more').classList.add('d-none');
  }

  const removeSpener = () => {
    document.getElementById('load-btn').removeAttribute('disabled');
    document.getElementById('load-spenr').classList.add('d-none');
    document.getElementById('load-more').classList.remove('d-none');
  }



  const loadMore = async () => {
    addSpener();
    const counter = count * 2;
    setCount(counter);
    featchData();

  }




  function deletePost(e) {
    if (window.confirm(t("Are you sur you want to delete The Post") + '?')) {
      axios.delete(`${url + lang}/api/post/delete/${e.target.id}`, {
        'Content-Type': 'application/json'
      }).then(function (respons) {
        // Remve Li elememt
        (e.target.parentElement).parentElement.remove()
        // Desplay message
        message.success(respons.data.message)
      }).catch(error => {
        message.error("Fail To Delete try agen.")
      })
    }
  }








  // Get Posts 
  const featchData = () => {
    axios.get(`${url + lang}/api/posts/${count}/`, {
      'Content-Type': 'application/json'
    }).then(respons => {
      removeSpener();

      setData(function () {
        return (
          <div className='pt-2'>
            <Lang />
            <List
              itemLayout="horizontal"
              dataSource={respons.data.data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Link to={`/p/${item.slug}`}>{item.image ? <img src={item.image} className='rounded' width='60px' height='50px' /> : ''} </Link>}
                    title={<Link to={`/p/${item.slug}`}>{item.title}</Link>}
                    description={ <div>{item.description} <br/><span>{item.date}</span></div>}
                  />
                  <div>
                    <Link to={`/post/update/` + item.id} className='mx-2 btn btn-success btn-sm' ><i className="bi bi-pencil-square"></i></Link>
                    <button className='mx-2 btn btn-danger btn-sm' onClick={deletePost} id={'' + item.id}><i className="bi bi-trash"></i></button>
                  </div>
                </List.Item>
              )}
            />
          </div>
        )
      })
    })
  }





  return (
    <div className='container mt-3'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-8 card border'>
          {data}
          <div className='text-center'>
            <Button className='w-50 my-2' id='load-btn' onClick={loadMore}>
              <span id='load-spenr' className='d-none'><LoadingOutlined style={{ fontSize: 24, }} /></span>
              <span id='load-more'>Loading more</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
