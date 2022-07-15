
import {React, useEffect, useState} from 'react';
import BookDetailContent from '../components/BookDetailContent';
import LoadingDetail from '../components/LoadignDetail';
import { useParams } from 'react-router-dom';



const BookDetail = ({match})=>{

    useEffect(() => {
        fetchItem();
    },[]);
    
    const [item, setItem] = useState(null);
    const { id } = useParams();
    const fetchItem = async () =>{
        const fetchItem = await fetch(`https://www.freedaz.com/en/api/book/${id}`);
        const item = await fetchItem.json();
        const data = ()=>{
          return (
            <BookDetailContent
             name={item.name} image={item.image} description={item.description} id={id}
             data={item.date} tags={item.tags} pages={item.pages} book_file={item.book_file}
             language={item.language} type_file={item.type_file}
            />
          )
        }
        setItem(data)
    }


    return (
        <>
        <div>{item?item:<LoadingDetail />}</div>
        </>

    )
}

export default BookDetail;