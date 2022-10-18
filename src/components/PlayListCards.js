import React from 'react';
import RandomColors from './RandomColors';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UrlContext } from '../context/UrlContext';
import { Empty } from 'antd';
import PostCardLoading from './post/PostCardLading';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PostCardComponent from './post/PostCardComponent';



export default function PlayListCards(props) {

    React.useEffect(() => {
        getPlayListItems();
    }, [props.id])

    const { url, lang } = React.useContext(UrlContext);

    const [item, setItem] = React.useState(null)

    const {t} = useTranslation();

    const getPlayListItems = () => {
        axios.get(`${url}${lang}/api/play-list/posts/${props.id}`, {
            headers: {
                'Content-Type': "application/json"
            }
        }).then(response => {
            const data = response.data.map(item => {
                return (<CardItem key={item.id} slug={item.slug} id={item.slug} title={item.title} image={item.image} date={item.date} />)
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
        <div className='last row p-2 pb-3'>{item === null ? <PostCardLoading /> :  item === true? <Empty description={t("No posts for this play list.`")}  /> : item}</div>
    )
}


function CardItem(props) {
    return <PostCardComponent slug={props.slug} title={props.title} date={props.date} image={props.image} />

    
}