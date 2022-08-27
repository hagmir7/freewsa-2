import React from 'react'
import RandomColors from '../components/RandomColors';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import PostCardLoading from '../components/post/PostCardLading';
import { UrlContext } from '../context/UrlContext';




export default function SearchPage() {
    React.useEffect(()=>{
        searchHandel()
    },[])
    const { query } = useParams()
    const [searchResult, setSearchResult] = React.useState('');
    const {url, lang } = React.useContext(UrlContext);
    
    const searchHandel = () => {
        const form = new FormData();
        // console.log(query)
        form.append('search', query)
        axios.post(`${url + lang}/api/search`, form, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            const data = response.data;
            const result = data.map((item => {
                return (
                    <div className="col-12 col-md-6 col-lg-4 mb-3 loading" key={item.id}>
                    <Link to={`/p/${item.slug}/`}>
                        {item.image ?
                            <img className="embed-responsive rounded w-100" alt={item.title} src={item.image} sizes="25vw" />
                            :
                            <div style={{ background: RandomColors(), height: '200px' }} className="embed-responsive border rounded d-flex align-items-center" sizes="25vw">
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
            }))
            setSearchResult(result);
        }).catch(error => {
            console.log(error)
        })

    }

    return (
        <div className='last row p-2 pb-3'>
            {searchResult ? searchResult : <PostCardLoading />}
        </div>
    )
}
