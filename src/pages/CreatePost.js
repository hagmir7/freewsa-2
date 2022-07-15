import axios from 'axios';
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import AuthContext from '../context/AuthContext';
import { UrlContext } from '../context/UrlContext';

export const CreatePost = () => {

    const {t} = useTranslation();
    const {authTokens} = useContext(AuthContext)
    const {url, lang} = useContext(UrlContext);


    const createPost = (event) =>{
        event.preventDefault();
        let dataForm = new FormData();
        dataForm.append("title", event.target.title.value);
        dataForm.append('image', event.target.image.files[0], event.target.image.files[0].name); 
        dataForm.append("tags", event.target.tags.value);
        dataForm.append("language", event.target.language.value);
        dataForm.append("description", event.target.description.value);
        dataForm.append("body", event.target.body.value);



        axios.post(`${url}/${lang}/api/create-post`, dataForm, {
            method: "POST",
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
    }

  return (
    <div className='container'>
        <div className='row d-flex justify-content-center'>
            <div className='col-md-6 card shadow-sm py-3'>
                <h1 className='h4'>{t("Create new post")}</h1>
                <form onSubmit={createPost}>
                    <input type="text" placeholder={t("Title")} name="title" className="form-control mt-3" required/>
                    <input type="file" name="image" accept='image/*' className="form-control mt-3" required/>
                    <input type="text" name="tags" placeholder={t("Tags")} className="form-control mt-3" required/>
                    <select className='form-select mt-3' name='language' required>
                        <option>--- {t("Select language")} ---</option>
                        <option value='ar'>العربية</option>
                        <option value='en'>English</option>
                        <option value='fr'>Français</option>
                    </select>

                    <textarea placeholder={t("Description")} className="form-control mt-3" name='description' maxLength={160}></textarea>
                    <textarea placeholder={t("Body")} className="form-control mt-3" name='body'></textarea>

                    <button type='submit' className='mt-3 btn btn-primary'>{t("Create")}</button>

                </form>


            </div>
        </div>
    </div>
  )
}
