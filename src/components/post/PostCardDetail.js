import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UrlContext } from '../../context/UrlContext';
import RandomColors from '../RandomColors';
import PostCardLoading from './PostCardLading';


function PostCardDetail() {
    const [items, setItems] = useState(null);
    const { url, lang } = useContext(UrlContext)

    useEffect(() => {
        fetchItems();
    }, []);



    const fetchItems = async () => {
        const data = await fetch(`${url}${lang}/api/posts/3`);
        const items = await data.json();
        const data_item = items.data;
        const item = () => {
            return (
                data_item.map(item => (
                    <div className="col-12 col-md-6 col-lg-4 mb-3" key={item.id}>
                        <Link to={`/p/${item.slug}/`}>
                            {item.image ?
                                <img className="card-img-top m-0 p-0 border rounded" style={{ objectFit: 'contain' }} alt={item.title} src={item.image} sizes="25vw" />
                                :
                                <div style={{ height: '200px', background: RandomColors() }} className="embed-responsive border rounded d-flex align-items-center" sizes="25vw">
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
    }
    return (
        <div>
            <div className='row p-2 pb-3 justify-content-center'>
                {items ? items : <PostCardLoading />}
            </div>
        </div>
    )
}

export default PostCardDetail;