import {React, useContext, useEffect, useState} from 'react';
import Content from '../components/Content';
import LoadingDetail from '../components/LoadignDetail';
import { useNavigate, useParams } from "react-router-dom";
import { UrlContext } from '../context/UrlContext';

function Detial({match}){

  const {lang, url} = useContext(UrlContext)
    useEffect(() => {
        fetchItem();
    },[]);


    const { slug } = useParams();

    const history = useNavigate()
    
    const [item, setItem] = useState(null);
    const fetchItem = async () =>{
        const fetchItem = await fetch(`${url}${lang}/api/post/${slug}`);
        const item = await fetchItem.json();
        const data_item = item.data;
        const data = ()=>{
          return (
            < Content id={data_item.id} title={data_item.title} image={data_item.image} views={data_item.views}
            category_en={data_item.category_en} date={data_item.date} body={data_item.body} description={data_item.description} tags={item.tags}
            slug={slug}
           />
          )
        }
        setItem(data)
        if(fetchItem.status !== 200){
          history('*')
        }
    }


    return(
        <div>
        <div className="container">
         <div className='row justify-content-center'>
         {item?item:<LoadingDetail />}
         </div>
        </div>
      </div>
    )
}
export default Detial;