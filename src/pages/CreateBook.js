import axios from 'axios';
import React, {useState} from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { LoadingOutlined } from '@ant-design/icons';
import { UrlContext } from '../context/UrlContext';
import { message } from 'antd';


export default function CreateBook() {

    useEffect(()=>{
        getLanguage()
        LoadList()
    }, [])


    const {t} = useTranslation();
    const {url, lang} = useContext(UrlContext);


    function addSpener() {
        document.getElementById('create-book-box').classList.remove('d-none');
        document.getElementById('create-book').classList.add('d-none');
        document.getElementById('create-book-btn').setAttribute('disabled', '');
    }
    function removeSperner() {
        document.getElementById('create-book-box').classList.add('d-none');
        document.getElementById('create-book').classList.remove('d-none');
        document.getElementById('create-book-btn').removeAttribute('disabled');
    }


    

    

    const CreateBook = (e) =>{
        e.preventDefault();
        addSpener()
        const form = new FormData(e.target)
        axios.post(`${url + lang }/api/book/create`, form, {
            Headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            message.success(response.data.message)
            e.target.reset();
            removeSperner()
        }).catch(error => {
            message.error('Fail to publish book.')
            removeSperner()
        })
    }


    const GetData = ()=> {
        axios.get(`${url + lang }/api/book/create`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {

        }).catch(error => {
           
        });
    }



        // Select category & language
        const [languageOptions, setLanguageOptions] = useState(null);
        const [categoryOptions, setcategoryOptions] = useState(null);
        const [listOption, setListOption] = useState(null);

    
        // Fretch Language
        const getLanguage = () => {
            axios.get(`${url + lang }/api/post/language/`, {
                'Content-Type': 'application/json',
            }).then(function (response, success) {
                const data = response.data
                const getOptions = () => {
                    return (
                        data.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))
                    )
                }
                setLanguageOptions(getOptions);
            }).catch(function (error) {
    
            });
        }
    
        // Featch Category
        const getCategry = (e) => {
            axios.get(`${url + lang }/api/book/category/${e.target.value}`, {
                'Content-Type': 'application/json'
            }).then(function (response, success) {
                const data = response.data
                const getOptions = () => {
                    return (
                        data.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))
                    )
                }
                setcategoryOptions(getOptions);
            }).catch(error => {
                // console.clear();
    
            });
        }

        const LoadList = () =>{
            axios.get(`${url + lang }/api/book/list/`, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            }).then(response => {
                const data = response.data
                const Options =  ()=>{
                    return data.map(item => {
                        return(
                            <option key={item.id} value={item.id}>{item.name}</option>
                        )
                    })
                }
                setListOption(Options)
            })
        }





  return (
    
    <div className="container">
        <div className="row d-flex justify-content-center">
            <div className="col-md-6">
                <h1 className='h3' dir='auto'>Publish new book</h1>
                <form onSubmit={CreateBook}>

                    <input className='form-control mt-2' type="text" name='name' id='name' placeholder={t("Book name")+ '...'} required/>
                    <input className='form-control mt-2' type="text" name='author' id='author' placeholder={t("Auther")+ '...'} required/>
                    <input className='form-control mt-2' type="number" name='pages' id='pages' placeholder={t("Pages")+ '...'} required/>
                    <select name="language" id="language" onChange={getCategry} className='form-select mt-2' required>
                        <option value="">Language</option>
                        {languageOptions}
                    </select>
                    <select name="category" id="category" className='form-select mt-3' required>
                        <option value="">Category</option>
                        {categoryOptions}
                    </select>
                    <select name="book_type" id="book_type" className='form-select mt-2' required>
                        <option value="">{t("Book file")}</option>
                        <option value="PDF">PDF</option>
                        <option value="DOCS">DOCS</option>
                        <option value="TXT">TXT</option>
                        <option value="ZIP">ZIP</option>
                        <option value="RAR">RAR</option>
                    </select>
                    <select name="list" id="list" className='form-select mt-2'>
                        <option value="">{t("Play list")}</option>
                        {listOption}
                    </select>
                    <label htmlFor="image" className='mt-2 fs-6'>{t("Image")}</label>
                    <input className='form-control' type="file" name="image" accept='image/*' id="image" required/>
                    <label htmlFor="file" className='mt-2 fs-6'>{t("File")}</label>
                    <input className='form-control' type="file" name="file" id="file"  required/>
                    <textarea name="description" id="description" cols="30" rows="5" placeholder={t("Description")+'...'} className='form-control mt-2'></textarea>
                    <button type='submit' id='create-book-btn' className='mt-3 btn btn-primary w-100'>
                        <span id='create-book'>{t("Publish")}</span>
                        <LoadingOutlined className="d-none" id="create-book-box" style={{ fontSize: 24 }} />
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
