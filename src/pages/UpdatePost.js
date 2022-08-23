import axios from 'axios';
import React, {useContext, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import AuthContext from '../context/AuthContext';
import { UrlContext } from '../context/UrlContext';
import { LoadingOutlined } from '@ant-design/icons';
import JoditEditor from "jodit-react";
import { useNavigate, useParams} from "react-router-dom";
import { Button, Image, message } from 'antd';



export default function UpdatePost() {
    useEffect(() => {
        fetchLanguageOptions();
        getPost();
    
        
    }, []);

    const { t } = useTranslation();
    const { authTokens } = useContext(AuthContext)
    const { url, lang } = useContext(UrlContext);
    // 

    const [image, setImage ] = useState(null);

    const [slug, setSlug] = useState(null)

    const { id } = useParams()

    const history = useNavigate()
    
    // Editor tools
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [visible, setVisible] = useState(false);
  
    const config = {
      readonly: false,
      height: 500,
    };

    
 



       // Select category & language
       const [languageOptions, setLanguageOptions] = useState(null);
       const [categoryOptions, setcategoryOptions] = useState(null);

    // Fretch Language
    const fetchLanguageOptions = () => {
        axios.get(`${url + lang }/api/post/language/`, {
            'Content-Type': 'application/json',
        }).then(function (response, success) {
            const data = response.data
            const getOptions = () => {
                return (
                    data.map(function(item){
                        return <option key={item.id} id={`lang-${item.id}`} value={item.id}>{item.name}</option>
                    })
                )
            }
            setLanguageOptions(getOptions);
        }).catch(function (error) {

        });
    }

    // Featch Category
    const fetchCategoryOptions = (value) => {
        if(value != ''){
            axios.get(`${url + lang }/api/post/category/${value}`, {
                'Content-Type': 'application/json'
            }).then(function (response, success) {
                const data = response.data
                const getOptions = () => {
                    return (
                        data.map(function(item){
                            if(value == item.id){
                                return <option key={item.id} selected value={item.id}>{item.name}</option>
                            }else{
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            }
                        })
                    )
                }
                setcategoryOptions(getOptions);
            }).catch(error => {
                // console.clear();
    
            });
        }

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


    
    // Get data for update
    const getPost = ()=>{
        axios.get(`${url + lang }/api/post/id/`+id, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            const data = response.data;
            setContent(data.body)
            document.getElementById('title').value = data.title;
            document.getElementById('tags').value = data.tags;
            document.getElementById('description').value = data.description;
            setSlug(data.slug);
            setImage(data.image);


            setTimeout(function(){
                document.getElementById('lang-'+data.language).setAttribute('selected', '')
                fetchCategoryOptions(data.language)
                
            }, 1000)

        }).catch(error => {
            console.log(error)
        })
    }


    // Send data to server
    const updatePost = (event) => {
        event.preventDefault();
        addSpener();
        const form = document.getElementById('post-form')
        let dataForm = new FormData(form);
        dataForm.append('body', content)

        if (content.length > 100) {
            axios.put(`${url}${lang}/api/post/update/` + id, dataForm, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            }).then(function (data, sucess, state) {
                message.success(data.data.message);
                removeSperner()
                history('/p/'+slug)
            }).catch(function (error) {
                removeSperner();
            });
        } else {
            message.error("Body content must be greater than 100 character.");
            removeSperner()
        }
    }


    const addImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
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


  return  (
    <div className='container-fluid my-2'>
    <div className='row d-flex'>
        <div className='col-md-6'>
            <h1 className='h4'>{t("Update Post")}</h1>
            <form onSubmit={updatePost} id="post-form">
                <input type="text" placeholder={t("Title")} maxLength={100} name="title" id="title" className="form-control mt-3" required />
                <input type="file" id='image' onChange={addImage} name="image" accept='image/*' className="form-control mt-3" />
                <ShowImage />
                <input type="text" id='tags' name="tags" placeholder={t("Tags")} maxLength={150} className="form-control mt-3" required />
                <select id='language' className='form-select mt-3' name='language' required onChange={((event) => { fetchCategoryOptions(event.target.value) })}>
                    <option value="" >{t("Language")}</option>
                    {languageOptions}
                </select>
                <select id='category' className='form-select mt-3' name='category' required>
                    <option value='' >{t("Category")}</option>
                    {categoryOptions}
                </select>
                <textarea id='description' placeholder={t("Description")} className="form-control mt-3" name='description' maxLength={160}></textarea>
                <button type='submit' id='create-post-btn' className='mt-3 btn btn-primary w-100'>
                    <span id='create-post'>{t("Update")}</span>
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
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                />
            </div>
        </div>
    </div>
</div>
  )  
}
