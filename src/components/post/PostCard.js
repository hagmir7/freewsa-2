import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { Spin, Space, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { UrlContext } from '../../context/UrlContext';
import coockies from 'js-cookie';
import axios from 'axios';


function PostCard() {

    useEffect(() => {
        fetchItems();
        laodMore()
    }, []);

    const lang = coockies.get('i18next')
    const { url } = useContext(UrlContext);
    const [loader, setLoder] = useState(12)

    // Load More
    const laodMore = async () => {
        const counter = loader + 12
        setLoder(counter)
        fetchItems();
    }


    //  Book Spener Function
    const spin = () => {
        let btn = document.querySelector('#btn');
        let spiner = document.getElementById('spiner')
        btn.classList.toggle('d-none')
        spiner.classList.toggle('d-none')
        setTimeout(function () {
            btn.classList.toggle('d-none')
            spiner.classList.toggle('d-none')
        }, 3000)
    }



    const [items, setItems] = useState(null);
    const fetchItems = () => {
        axios.get(`${url}${lang}/api/posts/${loader}/`, {
            headers: {
                // Accept: "application/json, text/plain, */*",
                'Content-Type': "application/json"
            }
        }).then(response => {
            const data = response.data.data;
            const item = () => {
                return (
                    data.map(item => (
                        <div className="col-12 col-md-6 col-lg-4 mb-3" key={item.id}>
                            <Link to={`/p/${item.slug}/`}>
                                {item.image ?
                                    <img className="card-img-top m-0 p-0 border rounded" style={{ objectFit: 'contain' }} alt={item.title} src={item.image} sizes="25vw" />
                                    :
                                    <div className="embed-responsive border rounded d-flex align-items-center" style={{ height: '200px' }} sizes="25vw">
                                        <div className="h3 text-black text-center m-auto">{item.title}</div>
                                    </div>
                                }
                            </Link>
                            <div className="card-body m-0 p-0 mt-2">
                                <Link to={`/p/${item.slug}/`}>
                                    <div className="card-title h5 my-0 py-0 text-muted">{item.title.length > 40 ? item.title.slice(0, 40).concat('...') : item.title}</div>
                                </Link>
                                <p className="card-text">
                                    <small className="text-muted">
                                        <span className="mr-2 h6">{item.date}</span>
                                    </small>
                                </p>
                            </div>
                        </div>
                    ))
                )
            }
            setItems(item)
        }).catch(error => {
            message.error('Loading Fail...')
            console.log(error)
        })


        


    }

    const { t } = useTranslation()
    return (
        <div className='last row p-2 pb-3'>
            {items ? items : <Loading />}
            <div className='d-flex justify-content-center mt-3'>
                <button className='btn btn-info h1 text-white rounded-pill btn-sm' id='btn' onClick={laodMore} ><span onClick={spin}>{t("Loading More")}</span></button>
                <div className='d-none' id='spiner'><Space size="middle"><Spin size="large" /></Space></div>
            </div>
        </div>
    )
}

export default PostCard;