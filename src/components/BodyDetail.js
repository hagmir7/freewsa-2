import React, {useState, useEffect, useContext} from 'react';
import { UrlContext } from '../context/UrlContext';
import Loading from "./Loading"
import coockies from 'js-cookie';


function BodyDetail(){
    useEffect(() => {
        fetchItems();
    },[]);

    const lang = coockies.get('i18next')

    const [items, setItems] = useState(null);

    const fetchItems = async () =>{
        const data = await fetch(`https://freewsad.herokuapp.com/${lang}/api/posts/3`);
        const items = await data.json();
        const data_item = items.data;
        const item = ()=>{
            return(
                data_item.map(item => (
                    <div key={item.slug} className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                        <div className='card'>
                            <a href={`/p/${item.slug}`}>
                            <div className='content-image'>
                            <img className='post-image' alt={item.title} src={item.image} />
                            </div>
                            <div className='title-content border-top'>
                            <p className='m-2 h6'>{item.title}</p>
                            </div>
                            </a>
                        </div>
                    </div>                        
                ))
            )
        }
        setItems(item)
    }
    return(
        <div>
            <div className='row p-2 pb-3 justify-content-center'>
                {items?items:<Loading />}
            </div>
        </div>
    )
}

export default BodyDetail;