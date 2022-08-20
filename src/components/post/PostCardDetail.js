import React, {useState, useEffect, useContext} from 'react';
import { UrlContext } from '../../context/UrlContext';
import Loading from "../Loading"


function PostCardDetail(){
    useEffect(() => {
        fetchItems();
    },[]);

    const [items, setItems] = useState(null);
    const {url, lang} = useContext(UrlContext)

    const fetchItems = async () =>{
        const data = await fetch(`${url}${lang}/api/posts/3`);
        const items = await data.json();
        const data_item = items.data;
        const item = ()=>{
            return(
                data_item.map(item => (
                    <div className="col-12 col-md-6 col-lg-4 mb-3" key={item.id}>
                        <a href={`/p/${item.slug}/`}>
                            {item.image ?
                                <img className="card-img-top m-0 p-0 border rounded" style={{ objectFit: 'contain' }} alt={item.title} src={item.image} sizes="25vw" />
                                :
                                <div className="embed-responsive border rounded d-flex align-items-center" style={{ height: '200px' }} sizes="25vw">
                                    <div className="h3 text-black text-center m-auto">{item.title}</div>
                                </div>
                            }
                        </a>
                        <div className="card-body m-0 p-0 mt-2">
                            <a href={`/p/${item.slug}/`}>
                                <div className="card-title h5 my-0 py-0 text-muted">{item.title.length > 40 ? item.title.slice(0, 40).concat('...') : item.title}</div>
                            </a>
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
    return(
        <div>
            <div className='row p-2 pb-3 justify-content-center'>
                {items?items:<Loading />}
            </div>
        </div>
    )
}

export default PostCardDetail;