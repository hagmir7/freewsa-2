import React from 'react';
import RandomColors from './RandomColors';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UrlContext } from '../context/UrlContext';
import { Empty } from 'antd';



export default function PlayListCards(props) {

    React.useEffect(() => {
        getPlayListItems();
    }, [props.id])

    const { url, lang } = React.useContext(UrlContext);

    const [item, setItem] = React.useState(null)

    const getPlayListItems = () => {
        axios.get(`${url}${lang}/api/play-list/posts/${props.id}`, {
            headers: {
                'Content-Type': "application/json"
            }
        }).then(response => {
            const data = response.data.map(item => {
                return (<CardItem key={item.id} slug={item.slug} id={item.slug} title={item.slug} image={item.image} date={item.date} />)
            })
            setItem(data);
            if(!response.data.length > 0){
                setItem(true)
            }

            
        }).catch(error => {
            console.log(error)
        })
    }





    return (
        <div className='last row p-2 pb-3'>{item === true? <Empty description={`No posts for this play list.`}  /> : item}</div>
    )
}


function CardItem(props) {
    return (

        <div className="col-12 col-md-6 col-lg-4 mb-3 loading p-2" key={props.id}>
            <Link to={`/p/${props.slug}/`}>
                {props.image ?
                    <img className="embed-responsive rounded w-100" alt={props.title} src={props.image} sizes="25vw" />
                    :
                    <div style={{ background: RandomColors(), height: '200px' }} className="embed-responsive border rounded d-flex align-propss-center" sizes="25vw">
                        <div className="h3 text-black text-center m-auto">{props.title}</div>
                    </div>
                }
            </Link>
            <div className="card-body m-0 p-0 mt-2">
                <Link to={`/p/${props.slug}/`}>
                    <div className="card-title h5 my-0 py-0 text-muted">{props.title.length > 40 ? props.title.slice(0, 40).concat('...') : props.title}</div>
                </Link>
                <p className="card-text">
                    <small className="text-muted">
                        <span className="mr-2 h6">{props.date}</span>
                    </small>
                </p>
            </div>
        </div>
    )
}