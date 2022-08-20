import { Avatar, Button, List, Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';










const Posts = () => {

  useEffect(() => {
    featchData();
    loadMore();
}, []);


  const [data, setData] = useState(null);
  const [count , setCount] = useState(12);  


  const addSpener = ()=>{
    document.getElementById('load-btn').setAttribute('disabled', '');
    document.getElementById('load-spenr').classList.remove('d-none');
    document.getElementById('load-more').classList.add('d-none');
  }

  const removeSpener = ()=>{
    document.getElementById('load-btn').removeAttribute('disabled');
    document.getElementById('load-spenr').classList.add('d-none');
    document.getElementById('load-more').classList.remove('d-none');
  }



  const loadMore = async ()=>{
    addSpener();
    const counter = count * 2;
    setCount(counter);
    featchData();
    
  }




  function deletePost(id){
    console.log('working')
    axios.delete(`http://127.0.0.1:8000/en/api/post/delete/${id}`, {
    'Content-Type' : 'application/json'
    }).then(function(respons){
      console.log(respons);
    });
  }








  // Get Posts 
  const featchData = ()=>{
    axios.get(`http://127.0.0.1:8000/en/api/posts/${count}/`, {
      'Content-Type': 'application/json'
    }).then(respons =>{
      removeSpener();
  
      setData(function(){
        return (
          <List
          itemLayout="horizontal"
          dataSource={respons.data.data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Link to={`/p/${item.slug}`}><img src={`http://127.0.0.1:8000` + item.image} className='rounded'  width='60px' height='50px' /> </Link>}
                title={<Link to={`/p/${item.slug}`}>{item.title}</Link>}
                description={item.description}
              />
          <div>
            <button className='mx-2 btn btn-success btn-sm' ><i className="bi bi-pencil-square"></i></button>
            <button className='mx-2 btn btn-danger btn-sm' id='btn-delete'><i className="bi bi-trash"></i></button>
          </div>
            </List.Item>
          )}
        />
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
                <span id='load-spenr' className='d-none'><LoadingOutlined style={{fontSize: 24,}}/></span>
                <span id='load-more'>Loading more</span>
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
