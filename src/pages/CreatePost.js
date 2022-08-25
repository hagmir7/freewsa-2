import axios from 'axios';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { UrlContext } from '../context/UrlContext';
import { LoadingOutlined } from '@ant-design/icons';
import JoditEditor from "jodit-react";
import { Button, Image, message } from 'antd';
import CreateLanguage from '../components/CreateLanguage';
import CreateCategory from '../components/CreateCategory';


export const CreatePost = () => {
    const { t } = useTranslation();
    const { url, lang } = useContext(UrlContext);
    const [image, setImage] = useState();
    const [visible, setVisible] = useState(false);

    const [spenner, setSpenner] = useState(false);


    // Editor tools
    const editor = useRef(null);
    const [content, setContent] = useState("");

    const config = {
        readonly: false,
        height: 500,
        placeholder: t('Start writing') + '...'
    };


    // Select category & language
    const [languageOptions, setLanguageOptions] = useState(null);
    const [categoryOptions, setcategoryOptions] = useState(null);
    const [listOption, setListOption] = useState(null);
    const [imageDisplay, setImageDisplay] = useState(false)


    let fetchLanguageOptions = async () => {
        axios.get(url+lang+"/api/language/list", {
            Headers: {
                'Content-Type': "application/json"
            }
        }).then(response => {
            const data = response.data
            const getOptions = () => {
                return (
                    data.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                )
            }
            setLanguageOptions(getOptions)
        }).catch(error => {
            message.error(t("Fail to load language."))
        })
    }




    // Featch Category
    const fetchCategoryOptions = (e) => {
        axios.get(`${url + lang}/api/post/category/${e.target.value}`, {
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
            message.error(t("Fail to load category"))
            console.clear();

        });
    }















    // Send data to server
    const createPost = (event) => {
        event.preventDefault();
        setSpenner(true);
        const form = document.getElementById('post-form')
        let dataForm = new FormData(form);
        dataForm.append('body', content)

        if (content.length > 100) {
            axios.post(`${url + lang}/api/post/create/`, dataForm, {
                headers: {
                    'Content-Type': 'application/json',

                }
            }).then(function (data, sucess, state) {
                message.success(data.data.message);
                setSpenner(false)
                form.reset();
                setContent('');
            }).catch(function (error) {
                setSpenner(false)
            });
        } else {
            message.error("Body content must be greater than 100 character.");
            setSpenner(false)
        }
    }

    const addImage = (e) => {
        if (e.target.files.length > 0) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setImageDisplay(true)
        } else {
            setImageDisplay(false)
        }

    }

    const ShowImage = () => {
        return (
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


    const LoadList = () => {
        axios.get(`${url + lang}/api/post/list/`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            const data = response.data
            const Options = () => {
                return data.map(item => {
                    return (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                })
            }
            setListOption(Options)
        })
    }


    useEffect(() => {
        LoadList();
        fetchLanguageOptions();


    }, []);

    return (
        <div className='container my3'>
            <div className='row d-flex'>
                <div className='col-md-6'>
                    <h1 className='h4'>{t("Create new post")}</h1>
                    <form onSubmit={createPost} id="post-form">
                        <input type="text" placeholder={t("Title")} maxLength={100} name="title" className="form-control mt-3" required />
                        <input type="file" onChange={addImage} name="image" accept='image/*' className="form-control mt-3" />
                        {imageDisplay ? <ShowImage /> : null}
                        <input type="text" name="tags" placeholder={t("Tags")} maxLength={150} className="form-control mt-3" required />
                        <div className="d-flex mt-2">
                            <select className='form-select' name='language' required onChange={fetchCategoryOptions}>
                                <option value=''>{t("Language")}</option>
                                {languageOptions}
                            </select>
                            <CreateLanguage />
                        </div>

                        <div className="d-flex mt-2">
                            <select className='form-select' name='category' required>
                                <option value=''>{t("Category")}</option>
                                {categoryOptions}
                            </select>
                            <CreateCategory />
                        </div>

                        <div className="d-flex mt-2">
                            <select className='form-select' name='list'>
                                <option value=''>{t("Play list")}</option>
                                {listOption}
                            </select>
                            <Button type="dashed" className='mx-1 mt-1'>+</Button>
                        </div>

                        <textarea placeholder={t("Description")} className="form-control mt-3" name='description' maxLength={160}></textarea>
                        <button type='submit' className='mt-3 btn btn-primary w-100'>
                            {spenner ? <LoadingOutlined style={{ fontSize: 24 }} />
                                : <span>{t("Publish")}</span>}
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
