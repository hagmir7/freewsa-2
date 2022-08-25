import { message } from 'antd'
import axios from 'axios'
import React, {createContext, useContext, useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import { UrlContext } from './UrlContext'


export const LanguageContext = createContext({})



export default function LanguageProvider({ children }) {

    

    const {url, lang} = useContext(UrlContext);
    const [language, setLanguage ] = useState();
    const { t } = useTranslation();

    useEffect(() => {
        langList()
    }, [])


    // Language list 
     let langList = async () =>{
        axios.get(url+lang+"/api/language/list", {
            Headers: {
                'Content-Type': "application/json"
            }
        }).then(response => {
            setLanguage(response.data)
        }).catch(error => {
           message.error(t("Fail to load languages."))
        })
    }


    // Create Language
    let CreateLang = async (e)=>{
        // setSpenner(true)
        const form = document.getElementById('language-form');
        const dataForm = new FormData(form);
        if(dataForm.get('name') !== '' && dataForm.get('code') !== ''){
            axios.post(`${url + lang }/api/language/crud/1`, dataForm, {
                Headers: {
                    'Content-Type': "application/json"
                }
            }).then(response => {
                message.success(response.data.message)
                form.reset();
                // setSpenner(false);
                langList()
            }).catch(error => {
                // setSpenner(false);
                const errors = error.request.responseText;
                if(JSON.parse(errors).code){
                    message.error(JSON.parse(errors).code)
                }else if(JSON.parse(errors).name){
                    message.error(JSON.parse(errors).name)
                }else{
                    message.error(JSON.parse(errors).message)
                }
            })
        }

    }



    





    const contextData = {
        CreateLang : CreateLang,
        language: language
    }

  return (
    <LanguageContext.Provider value={contextData} >
      { children }
    </LanguageContext.Provider>
  )
}
