
import {React, useContext, useEffect, useState} from 'react';
import BookDetailContent from '../components/BookDetailContent';
import LoadingDetail from '../components/LoadignDetail';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';
import { UrlContext } from '../context/UrlContext';


const BookDetail = ({match})=>{


    useEffect(() => {
        fetchItem();
    },[]);

    const history = useNavigate();
    const {url, lang} = useContext(UrlContext)
    
    const [item, setItem] = useState(null);
    const { id } = useParams();






    const fetchItem = async () =>{
      axios({
        method: 'GET',
        url: `${url + lang}/api/book/${id}?format=json`,
      }).then((response => {

        const item = response.data;
        const data = ()=>{
          return (
            <BookDetailContent
             name={item.name} image={item.image} description={item.description} id={id}
             data={item.date} tags={item.tags} pages={item.pages} book_file={item.file}
             language={item.language} type_file={item.file_type}
            />
          )
        }
        setItem(data)
      })).catch((error) => {
        setItem(<NotFoundPage/>)
      });;
    }


    return (
        <>
        <div>{item?item:<LoadingDetail />}</div>
        </>

    )
}

export default BookDetail;