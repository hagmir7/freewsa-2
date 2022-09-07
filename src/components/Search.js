import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import freewsad from '../assets/freewsad-item.webp';
import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UrlContext } from '../context/UrlContext';

export default function Search(props) {
    const { t } = useTranslation();
    const [autoComplet, setAutoComplet] = useState(false);
    const [searchResult, setSearchResult] = useState('');
    const history = useNavigate();
    const { url, lang } = useContext(UrlContext);
    const [count, setCount] = useState(0)

    const searchHandel = (e) => {
        let query = e.target.value

        if (query.length > 1) {
            if (e.key === 'Enter') {
                setCount(0)
                setAutoComplet(false)
                history('/search/' + e.target.value);
            } else {
                setAutoComplet(true)
                const form = new FormData();
                form.append('search', query)
                axios.post(`${url + lang}/api/search`, form, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    const data = response.data;
                    setCount(data.length)
                    const result = data.map((item => {
                        return <Link to={`/p/${item.slug}`} key={item.id} className="list-group-item list-group-item-action text-start">{item.title}</Link>
                    }))
                    setSearchResult(result);
                }).catch(error => {
                    console.log(error)
                })
            }

        } else {
            setAutoComplet(false)
            setCount(0)
        }

    }
    return (
        <div className='py-4 text-center'>
            <div className='d-flex justify-content-center'>
                <div className='w-100'>
                    <img src={freewsad} alt="" />
                    <div className='d-flex justify-content-center mx-2'  >
                        <div className='position-relative search-all'>
                            <label htmlFor="search" className={`w-100 form-control shadow-sm rounded-pill ${count > 0 && 'search-content'}`}>
                                <div className='input-group rounded-pill '>
                                    <span className='input-group-text border-0 bg-white pe-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </span>
                                    <input autoComplete="off" defaultValue={props.value} onKeyUp={searchHandel} type="search" name="search" placeholder={t("Search") + "..."} id="search" className='form-control border-0' />
                                </div>
                            </label>
                            {autoComplet ? <div style={{ boxShadow: '2px 7px 7px rgb(0 0 0 / 20%)' }} className="list-group border-0 rounded-0 list-scroll freewsad-search position-absolute w-100">{searchResult}</div> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
