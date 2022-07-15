import {React, useEffect, useState} from 'react';
import Content from '../components/Content';
import LoadingDetail from '../components/LoadignDetail';
import JsCookies from 'js-cookie';
import { useParams } from "react-router-dom";

function Detial({match}){
    useEffect(() => {
        fetchItem();
    },[]);


    const { id } = useParams();
    
    const currentLanguageCode = JsCookies.get("i18next")
    const [item, setItem] = useState(null);
    const fetchItem = async () =>{
        const fetchItem = await fetch(`https://freewsad.herokuapp.com/${currentLanguageCode}/api/english_detail/${id}`);
        const item = await fetchItem.json();
        const data_item = item.data;
        const data = ()=>{
          return (
            < Content id={data_item.id} title={data_item.title} image={data_item.image} views={data_item.views}
            category_en={data_item.category_en} date={data_item.date} body={data_item.body} description={data_item.description} tags={item.tags}
           />
          )
        }
        setItem(data)
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