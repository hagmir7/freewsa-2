import axios from 'axios';
import React, {useState} from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { LoadingOutlined } from '@ant-design/icons';
import { UrlContext } from '../context/UrlContext';
import CreateLanguage from '../components/CreateLanguage';
import { Button, Image as ImageElement, message } from 'antd';


export default function CreateBook() {

    useEffect(() => {
        LoadList();
        fetchLanguageOptions();
    }, [])


    const { t } = useTranslation();
    const { url, lang } = useContext(UrlContext);
    // Get list of language
    // Select category & language & List
    const [languageOptions, setLanguageOptions] = useState(null);
    const [categoryOptions, setcategoryOptions] = useState(null);
    const [listOption, setListOption] = useState(null);
    // Spenner settings
    const [spenner, setSpenner] = useState(false)
    const [image, setImage] = useState('')

    const [imageDisplay, setImageDisplay] = useState(false);
    const [placeholder ,setPlaceholder] = useState(false);
    const [visible, setVisible] = useState(false);

    

    const CreateBook = (e) => {
        e.preventDefault();
        setSpenner(true)
        const formData = new FormData(e.target);
        if(image.length > 0) formData.append('image', image)
        axios.post(`${url + lang}/api/book/create`, formData, {
            Headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            message.success(response.data.message)
            e.target.reset();
            setSpenner(false)
        }).catch(error => {
            message.error(t('Fail to publish book.'))
            setSpenner(false)
            console.log(error);
        })
    }

    
    // Fretch Language
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
    const getCategry = (e) => {
        axios.get(`${url + lang}/api/book/category/${e.target.value}`, {
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
            message.error("Fail to load category.")

        });
    }

    // Laod book play list
    const LoadList = () => {
        axios.get(`${url + lang}/api/book/list/`, {
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
        }).catch(error=>{
            message.error("Fail to load category.")
        })
    }



    
    const addImage = (e) => {
        const imageFile = e.target.files[0];
        const src = URL.createObjectURL(imageFile);
        let canvase = document.createElement('canvas');
        let ctx = canvase.getContext('2d');
        const newImage = new Image();
        newImage.src = src;
        newImage.onload = function () {
            canvase.width = newImage.width;
            canvase.height = newImage.height;
            ctx.drawImage(newImage, 0, 0);
            const webpImage = canvase.toDataURL("image/webp", 1);
            var byteString = atob(webpImage.split(',')[1]);
            var mimeString = webpImage.split(',')[0].split(':')[1].split(';')[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            setImage(new File([blob], imageFile.name.split('.')[0] + '.webp'))

        
        }
        setImageDisplay(true);
        setPlaceholder(URL.createObjectURL(imageFile))

    }


    const ShowImage = () => {
        return (
            <div>
                <Button type="primary" className='mt-2' onClick={() => setVisible(true)}>{t('Show Image')}</Button>
                <ImageElement width={200} style={{ display: 'none', }}
                    src={placeholder}
                    preview={{
                        visible,
                        src: placeholder,
                        onVisibleChange: (value) => {
                            setVisible(value);
                        },
                    }}
                />
            </div>
        )
    }




  return (
    
    <div className="container">
        <div className="row d-flex justify-content-center">
            <div className="col-md-6">
                <h1 className='h3' dir='auto'>{t("Publish new book")}</h1>
                <form onSubmit={CreateBook}>
                    <input className='form-control mt-2' maxLength={80} type="text" name='name' id='name' placeholder={t("Book name")+ '...'} required/>
                    <input className='form-control mt-2' maxLength={50} type="text" name='author' id='author' placeholder={t("Author")+ '...'} required/>
                    <input className='form-control mt-2' type="number" name='pages' id='pages' placeholder={t("Pages")+ '...'} required/>
                    <div className="mt-2 d-flex">
                    <select name="language" id="language" onChange={getCategry} className='form-select' required>
                        <option value="">{t("Language")}</option>
                        {languageOptions}
                    </select>
                    <CreateLanguage />
                    </div>

                      <div className="mt-2 d-flex">
                          <select name="category" id="category" className='form-select' required>
                              <option value="">{t("Category")}</option>
                              {categoryOptions}
                          </select>
                          <Button type="dashed" className='mx-1 mt-1'>+</Button>
                      </div>
                          <select name="book_type" id="book_type" className='form-select mt-2' required>
                              <option value="">{t("Book file")}</option>
                              <option value="PDF">PDF</option>
                              <option value="DOCS">DOCS</option>
                              <option value="TXT">TXT</option>
                              <option value="ZIP">ZIP</option>
                              <option value="RAR">RAR</option>
                          </select>
                          
                      <div className="d-flex mt-2">
                          <select name="list" id="list" className='form-select'>
                              <option value="">{t("Play list")}</option>
                              {listOption}
                          </select>
                          <Button type="dashed" className='mx-1 mt-1'>+</Button>
                      </div>
                    <label htmlFor="image"  className='mt-2 fs-6'>{t("Image")}</label>
                    <input className='form-control' onChange={addImage} type="file" accept='image/*' id="image" required/>
                    {imageDisplay ? <ShowImage /> : <></>}

                    <label htmlFor="file" className='mt-2 fs-6'>{t("File")}</label>
                    <input className='form-control' type="file" accept='.doc,.docx,.pdf,.txt,.zip,.rar' name="file" id="file"  required/>
                    <textarea maxLength={300} name="description" id="description" cols="30" rows="5" placeholder={t("Description")+'...'} className='form-control mt-2'></textarea>
                    <button type='submit' className='mt-3 btn btn-primary w-100'>
                            {spenner ? <LoadingOutlined style={{ fontSize: 24 }} />
                            : <span>{t("Publish")}</span>}
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
