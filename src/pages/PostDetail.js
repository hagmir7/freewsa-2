import {React, useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { UrlContext } from '../context/UrlContext';
import PostDetialContent from '../components/post/PostDetailContent';
import axios from 'axios';
import { message } from 'antd';
import PostDetailLoading from '../components/post/PostDetailLoading';

function PostDetial({match}){
  const { slug } = useParams();


  const {lang, url} = useContext(UrlContext)
    useEffect(() => {
        fetchItem();
        window.scrollTo(0, 0)
    },[slug]);


    

    const history = useNavigate()
    
    const [item, setItem] = useState(null);
    const fetchItem = async () =>{
      axios.get(`${url}${lang}/api/post/${slug}`, {
        headers: {
          Accept: 'application/json, text/plain, */*'
        }
      }).then(response => {
        const post = response.data.data;
        const data = ()=>{
          return (
            < PostDetialContent id={post.id} title={post.title} image={post.image} views={post.views}
            category_en={post.category_en} date={post.date} body={post.body} description={post.description} tags={post.tags}
            slug={slug}
           />
          )
        }
        setItem(data)

      }).catch(error => {
        message.error('Loading Fail.')
        history('/');
        console.clear();
      })
    }


    return(
        <div>
        <div className="container">
         <div className='row justify-content-center'>
         {item?item:<PostDetailLoading />}
         </div>
        </div>
      </div>
    )
}
export default PostDetial;