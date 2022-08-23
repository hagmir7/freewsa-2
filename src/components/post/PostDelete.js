import axios from 'axios'
import React, {useContext} from 'react'
import { UrlContext } from '../../context/UrlContext';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';


export default function PostDelete(props) {
    const {url, lang} = useContext(UrlContext);
    const history = useNavigate();
    const { t } = useTranslation();


    

    const Delete = ()=>{
        if(window.confirm(t("Are you sur you want to delete The Post")+ "?")){
            axios.delete(`${url}${lang}/api/post/delete/` + props.id, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            }).then(respons =>{
                message.success(respons.data.message);
                history('/');
            }).then(error =>{
                console.log(error.data.message)
            })
        }
    }

    return (
        <div className='py-3'>
            <Link to={'/post/update/' + props.id} className='btn btn-success btn-sm mx-2'>{t('Update')}</Link>
            <button className='btn btn-sm btn-danger' onClick={Delete}>{t('Delete')}</button>
        </div>
    )



}
