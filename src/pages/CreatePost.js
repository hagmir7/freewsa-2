import { message } from 'antd';
import axios from 'axios';
import React, { Component, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import AuthContext from '../context/AuthContext';
import { UrlContext } from '../context/UrlContext';
import { Editor,  } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorConvertToHTML from '../components/Editor';
import { LoadingOutlined } from '@ant-design/icons';

import { Select } from 'antd';
import axiosInstance, { AxiosInstance } from '../utils/axiosInstance';









export const CreatePost = () => {

    useEffect(() => {
        fetchLanguageOptions();
        getPost();
    }, []);

    const {t} = useTranslation();
    const {authTokens} = useContext(AuthContext)
    const {url, lang} = useContext(UrlContext);

    // Select category & language
    const [languageOptions, setLanguageOptions] = useState(null);
    const [categoryOptions, setcategoryOptions] = useState(null);

    // Fretch Language
    const fetchLanguageOptions = ()=>{
        axios.get('http://127.0.0.1:8000/en/api/post/language/', {
            'Content-Type': 'application/json',
        }).then(function(response, success){
            const data = response.data
            const getOptions = ()=>{
                return (
                    data.map(item =>(
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                )
            } 
            setLanguageOptions(getOptions);
        }).catch(function(error){
            console.log(error)
            
        });
    }

    // Featch Category
    const fetchCategoryOptions = (e)=>{
        axios.get(`http://127.0.0.1:8000/en/api/post/category/${e.target.value}`, {
            'Content-Type': 'application/json'
        }).then(function(response, success){
            const data = response.data
            const getOptions = ()=>{
                return (
                    data.map(item =>(
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                )
            } 
            setcategoryOptions(getOptions);
        }).catch(error =>{
            console.log(error)

        });
    }

    function addSpener(){
        document.getElementById('create-post-box').classList.remove('d-none');
        document.getElementById('create-post').classList.add('d-none');
        document.getElementById('create-post-btn').setAttribute('disabled', '');
    }
    function removeSperner(){
        document.getElementById('create-post-box').classList.add('d-none');
        document.getElementById('create-post').classList.remove('d-none');
        document.getElementById('create-post-btn').removeAttribute('disabled');
    }

    const getPost = async ()=>{
        let response = await axiosInstance.get('/api/post/get/')
        if(response.status === 200){
            console.log(response.data)
        }
    }



    // Send data to server
    const createPost = (event) =>{
        event.preventDefault();
        addSpener();
        const form = document.getElementById('post-form')
        let dataForm = new FormData(form);
        const body = document.getElementById('body');
        dataForm.append('body', body.value)
        console.log(body.value)
        if(body.value.length > 100 ){
            axios.post(`${url}${lang}/api/create-post`, dataForm, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization':'Bearer ' + String(authTokens.access)

                }
            }).then(function (data, sucess, state) {
                message.success(data.data.message);
                body.value = '<p></p>';
                form.reset();
                removeSperner()
            }).catch(function (error) {
                removeSperner();
                console.log(error)
                // const errors = error.response.data
                // for (let item in errors) {
                //     message.error(errors[item][0])
                // }
            });
        }else{
            message.error("Body content must be greater than 100 character.");
            removeSperner()
        }


        
    }

  return (
    <div className='container my3'>
        <h1 className='h4'>{t("Create new post")}</h1>
        <div className='row d-flex'>
            <div className='col-md-6'>
                <form onSubmit={createPost} id="post-form">
                    <input type="text" placeholder={t("Title")} maxLength={100} name="title" className="form-control mt-3" required/>
                    <input type="file" name="image" accept='image/*' className="form-control mt-3"/>
                    <input type="text" name="tags" placeholder={t("Tags")} maxLength={150} className="form-control mt-3" required/>
                    <select className='form-select mt-3' name='language' required onChange={fetchCategoryOptions}>
                        <option value={1} >--- {t("Select language")} ---</option>
                        {languageOptions}
                    </select>
                    <select className='form-select mt-3' name='category' required>
                        <option value=''>--- {t("Select category")} ---</option>
                        {categoryOptions}
                    </select>
                    <textarea placeholder={t("Description")} className="form-control mt-3" name='description' maxLength={160}></textarea>
                    <button  type='submit' id='create-post-btn' className='mt-3 btn btn-primary w-100'>
                    <span id='create-post'>{t("Create")}</span>
                    <LoadingOutlined className="d-none" id="create-post-box" style={{ fontSize: 24}} />

                    </button>
                </form>
            </div>
            <div className='col-md-6'>
            <div className='mt-2'>
                <EditorConvertToHTML />
            </div>
            </div>
        </div>
    </div>
  )
}
