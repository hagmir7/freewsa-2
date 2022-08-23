import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PostCardLoading from './PostCardLading';
import { Spin, Space, message, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { UrlContext } from '../../context/UrlContext';
import coockies from 'js-cookie';
import axios from 'axios';
import RandomColors from '../RandomColors';
import Dashboard from '../../pages/Dashboard';
import AuthContext from '../../context/AuthContext';


function PostCard() {

    useEffect(() => {
        fetchItems();
        laodMore()
    }, []);

    const lang = coockies.get('i18next')
    const { url } = useContext(UrlContext);
    const [loader, setLoder] = useState(12);
    const {authTokens, user } = useContext(AuthContext);

    // Load More
    const laodMore = async () => {
        const counter = loader + 12
        setLoder(counter)
        fetchItems();

        // Desplay loader
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
                'Content-Type': "application/json"
            }
        }).then(response => {
            const data = response.data.data;
            const item = () => {
                return (
                    data.map(item => (
                            <div className="col-12 col-md-6 col-lg-4 mb-3 loading" key={item.id}>
                                <Link to={`/p/${item.slug}/`}>
                                    {item.image ?
                                        <img className="embed-responsive rounded w-100"  alt={item.title} src={item.image} sizes="25vw" />
                                        :
                                        <div style={{background: RandomColors(),  height: '200px' }} className="embed-responsive border rounded d-flex align-items-center" sizes="25vw">
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
                        )
                     )
                )
            }
            setItems(item)
        }).catch(error => {
            message.error('Loading Fail...');
            console.clear();
        })


        


    }

    const { t } = useTranslation()
    return (
        <div className='last row p-2 pb-3'>
            {authTokens? user.is_superuser ? <Dashboard /> : '' : ''} 
            {items ? items : <PostCardLoading />}
            <div className='d-flex justify-content-center mt-3'>
            <Button type="primary" id='btn'  onClick={laodMore} >
                 {t("Loading More")} 
            </Button>
                <div className='d-none' id='spiner'><Space size="middle"><Spin size="large" /></Space></div>
            </div>
        </div>
    )
}

export default PostCard;