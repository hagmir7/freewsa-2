import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Spin, Space, Button } from 'antd';
import BookCardLoading from '../components/book/BookCardLoading';
import jsCookie from 'js-cookie';
import { useTranslation } from 'react-i18next';
import Lang from '../components/Lang';
import { UrlContext } from '../context/UrlContext';



function Book() {

    const [loader, setLoder] = useState(12)
    const currentLanguageCode = jsCookie.get('i18next')
    useEffect(() => {
        fetchItems();
        laodMore()

    }, [currentLanguageCode]);

    

    const {url} = useContext(UrlContext);
    const {t} = useTranslation()
     // Load More
    const laodMore = async () => {
        const counter = loader + 12
        setLoder(counter)
        fetchItems();

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
    const fetchItems = async () => {
        const data = await fetch(`${url + currentLanguageCode}/api/books/${loader}/`);

        const items = await data.json();
        const data_item = items.data;


        const item = () => {
            return (
                data_item.map(item => (
                    <div key={item.slug}  className="book-card col-6 col-sm-6 col-md-3 col-lg-3 col-xl-2 mt-2 px-2">
                        <div className="card card-book shadow-sm overflow-hidden h-100 m-0">
                            <Link to={`/book/${item.slug}/`} className='h-100'>
                                <img className="h-100" src={item.image} width="100%" alt={item.title} />
                            </Link>
                        </div>
                    </div>
                ))
            )
        }
        setItems(item)
    }


    return (
        <Fragment>
            <div className='container-xxl p-0'>
                <div className='last row p-2 pb-3'>
                    <Lang />
                    {items ? items : <BookCardLoading />}
                </div>
                <div className='d-flex justify-content-center'>
                <Button type="primary" id='btn'  onClick={laodMore} >
                  {t("Loading More")}
                </Button>
                <div className='d-none' id='spiner'><Space size="middle"><Spin size="large" /></Space></div>

                </div>
            </div>
            <Helmet>
                <title>{t("Books - Freewsad")}</title>
                <meta name="description" content='It is a digital library of electronic and international books and novels that contains books and novels in all fields in PDF & DOC format.' ></meta>
                <link rel='canonical' href={`/books`} />
                <meta name="keywords" content="books,library,electronic,novels,pdf books,programmig book,python book,learn programmming" />
            </Helmet>
        </Fragment>

    )
}

export default Book;