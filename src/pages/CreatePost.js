import axios from 'axios';
import React, {useContext, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import AuthContext from '../context/AuthContext';
import { UrlContext } from '../context/UrlContext';
import { LoadingOutlined } from '@ant-design/icons';
import JoditEditor from "jodit-react";
import { Button, Image, message } from 'antd';








export const CreatePost = () => {

    useEffect(() => {
        fetchLanguageOptions();
        LoadList();
    }, []);

    const { t } = useTranslation();
    const { authTokens } = useContext(AuthContext)
    const { url, lang } = useContext(UrlContext);
    const [image, setImage ] = useState();
    const [visible, setVisible] = useState(false);

    // Editor tools
    const editor = useRef(null);
    const [content, setContent] = useState("");
  
    const config = {
      readonly: false,
      height: 500,
      placeholder: t('Start writing')+'...'
    };

    
    // Select category & language
    const [languageOptions, setLanguageOptions] = useState(null);
    const [categoryOptions, setcategoryOptions] = useState(null);
    const [listOption, setListOption] = useState(null);
    const [display, setDisplay] = useState(false)

    // Fretch Language
    const fetchLanguageOptions = () => {
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
    const fetchCategoryOptions = (e) => {
        axios.get(`${url + lang }/api/post/category/${e.target.value}`, {
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
            console.clear();

        });
    }

    function addSpener() {
        document.getElementById('create-post-box').classList.remove('d-none');
        document.getElementById('create-post').classList.add('d-none');
        document.getElementById('create-post-btn').setAttribute('disabled', '');
    }
    function removeSperner() {
        document.getElementById('create-post-box').classList.add('d-none');
        document.getElementById('create-post').classList.remove('d-none');
        document.getElementById('create-post-btn').removeAttribute('disabled');
    }





    // Send data to server
    const createPost = (event) => {
        event.preventDefault();
        addSpener();
        const form = document.getElementById('post-form')
        let dataForm = new FormData(form);
        dataForm.append('body', content)

        if (content.length > 100) {
            axios.post(`${url + lang }/api/post/create/`, dataForm, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + String(authTokens.access)

                }
            }).then(function (data, sucess, state) {
                message.success(data.data.message);
                form.reset();
                removeSperner()
                setContent('');
            }).catch(function (error) {
                removeSperner();
            });
        } else {
            message.error("Body content must be greater than 100 character.");
            removeSperner()
        }
    }

    const addImage = (e)=>{
        if(e.target.files.length > 0 ){
            setImage(URL.createObjectURL(e.target.files[0]));
            setDisplay(true)
        }else{
            setDisplay(false)
        }
        
    }

    const ShowImage = () => {
        return(
            <div>
            <Button type="primary" className='mt-2' onClick={() => setVisible(true)}>{t('Show Image')}</Button>
            <Image width={200} style={{ display: 'none', }}
                src={image}
                preview={{
                    visible,
                    src: image,
                    onVisibleChange: (value) => {
                    setVisible(value);
                },
                }}
            />
          </div>
        )
    }


    const LoadList = () =>{
        axios.get(`${url + lang }/api/post/list/`, {
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
        <div className='container my3'>
            <div className='row d-flex'>
                <div className='col-md-6'>
                <h1 className='h4'>{t("Create new post")}</h1>
                    <form onSubmit={createPost} id="post-form">
                        <input type="text" placeholder={t("Title")} maxLength={100} name="title" className="form-control mt-3" required />
                        <input type="file" onChange={addImage} name="image" accept='image/*' className="form-control mt-3" />
                            {display ? <ShowImage />: null } 
                        <input type="text" name="tags" placeholder={t("Tags")} maxLength={150} className="form-control mt-3" required />
                        <select className='form-select mt-3' name='language' required onChange={fetchCategoryOptions}>
                            <option value={1} >{t("Language")}</option>
                            {languageOptions}
                        </select>
                        <select className='form-select mt-3' name='category' required>
                            <option value=''>{t("Category")}</option>
                            {categoryOptions}
                        </select>
                        <select className='form-select mt-3' name='list'>
                            <option value=''>{t("Play list")}</option>
                            {listOption}
                        </select>
                        <textarea placeholder={t("Description")} className="form-control mt-3" name='description' maxLength={160}></textarea>
                        <button type='submit' id='create-post-btn' className='mt-3 btn btn-primary w-100'>
                            <span id='create-post'>{t("Publish")}</span>
                            <LoadingOutlined className="d-none" id="create-post-box" style={{ fontSize: 24 }} />

                        </button>
                    </form>
                </div>
                <div className='col-md-6'>
                    <div className='mt-2'>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            placeholder="Start Typeing"
                            tabIndex={1} 
                            onBlur={(newContent) => setContent(newContent)} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
