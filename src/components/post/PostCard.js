import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import PostCardLoading from './PostCardLading';
import { Spin, Space, message, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { UrlContext } from '../../context/UrlContext';
import coockies from 'js-cookie';
import axios from 'axios';
import PlayList from '../PlayList';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PostCardComponent from './PostCardComponent';




function PostCard() {


    const lang = coockies.get('i18next')
    const { url } = useContext(UrlContext);
    const [loader, setLoder] = useState(0);
    const [spiner, setSpener] = useState(false);
    const observer = useRef();
    const [more, setMore] = useState(true)

    useEffect(() => {
        fetchItems();
        laodMore()
    }, [more]);


    const lastPostElement = useCallback(node => {
        // if (loader) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setMore(node)
            }
        })
        if (node) observer.current.observe(node);
    }, [loader])

    // Load More
    const laodMore = async () => {
        // Desplay loader

        const counter = loader + 12
        setLoder(counter)
        fetchItems();
        setSpener(true);


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
                    data.map((item, index) => {
                        if (data.length === index + 1) {
                            return <PostCardComponent lastPostElement={lastPostElement} slug={item.slug} title={item.title} date={item.date} image={item.image} />
                        } else {
                            return <PostCardComponent slug={item.slug} title={item.title} date={item.date} image={item.image} />
                        }
                    }
                    )
                )
            }
            setItems(item)
            setSpener(false);
        }).catch(error => {
            message.error('Loading Fail...');
            // console.clear();
        })





    }

    const { t } = useTranslation()



    return (
        <div className='last row p-2 pb-3'>
            <PlayList />
            <h2 className='h4 mt-2 p-2 shadow-sm bg-white rounded mx-2' dir='auto' lang='auto'>{t("Popular Posts")}</h2>
            {items ? items : <PostCardLoading />}
            <div className='d-flex justify-content-center mt-3'>
                {
                    spiner ? <Space size="middle"><Spin size="large" /></Space>
                        : <Button type="primary" id='btn' onClick={laodMore} > {t("Loading More")}  </Button>
                }
            </div>
        </div>
    )
}

export default PostCard;