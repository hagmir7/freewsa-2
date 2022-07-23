
import {React, useContext, useEffect, useState} from 'react';
import BookDetailContent from '../components/BookDetailContent';
import LoadingDetail from '../components/LoadignDetail';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const BookDetail = ({match})=>{


    useEffect(() => {
        fetchItem();
    },[]);
    
    const [item, setItem] = useState(null);
    const { id } = useParams();






    const fetchItem = async () =>{
      axios({
        method: 'GET',
        url: `https://www.freedaz.com/en/api/book/${id}?format=json`,
      }).then((response => {
        console.log(response.data)
        const item = response.data;
        const data = ()=>{
          return (
            <BookDetailContent
             name={item.name} image={item.image} description={item.description} id={id}
             data={item.date} tags={item.tags} pages={item.pages} book_file={item.file}
             language={item.language} type_file={item.type_file}
            />
          )
        }
        setItem(data)
      }));
    }


    return (
        <>
        <div>{item?item:<LoadingDetail />}</div>
        </>

    )
}

export default BookDetail;