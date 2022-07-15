import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { Spin, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { UrlContext } from '../context/UrlContext';


function Card(){

    useEffect(() => {
        fetchItems();
        laodMore()
    },[]);

    const {lang, url} = useContext(UrlContext);

    const [loader, setLoder] = useState(12)

    // Load More
    const laodMore = async () => {
        const counter = loader + 12
        setLoder(counter)
        fetchItems();
    }


    //  Book Spener Function
    const spin = ()=>{
        let btn = document.querySelector('#btn');
        let spiner = document.getElementById('spiner')
        btn.classList.toggle('d-none')
        spiner.classList.toggle('d-none')
        setTimeout(function(){
            btn.classList.toggle('d-none')
            spiner.classList.toggle('d-none')
        },3000)
    }
    


    const [items, setItems] = useState(null);
    const fetchItems = async () =>{
        const data = await fetch(`${url}${lang}/api/posts/${loader}`);

        const items = await data.json();
        const dataItem = items.data;

        const item = ()=>{
            return(
                dataItem.map(item => (
                    <div key={item.id} className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4' title={item.title}>
                        <div className='card'>
                            <Link to={`/p/${item.slug}`}>
                            <div className='content-image'>
                            <img className='post-image' alt={item.title} src={item.image} />
                            </div>
                            <div className='title-content border-top'>
                            <p className='m-2 h6' dir='auto'>{item.title.length > 40 ? item.title.slice(0,40).concat('...') : item.title}</p>
                            </div>
                            </Link>
                            
                        </div>
                    </div>                        
        
                    ))
            )
        }

        setItems(item)
        

    }

    const {t} = useTranslation()
    return(
        <div className='last row p-2 pb-3'>
            {items?items:<Loading />}
            <div className='d-flex justify-content-center mt-3'>
                <button className='btn btn-info h1 text-white rounded-pill' id='btn' onClick={laodMore} ><span onClick={spin}>{t("Load More")}</span></button>  
                <div className='d-none' id='spiner'><Space size="middle"><Spin size="large" /></Space></div>
            </div>
        </div>
    )
}

export default Card;