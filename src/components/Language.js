import { message } from 'antd';
import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { UrlContext } from '../context/UrlContext';


export default function Language() {
    const [language, setLanguage] = useState();
    const {url, lang} = useContext(UrlContext);

    useEffect(() => {
        langList()
    }, [])
    // Language list 
    let langList = async () => {
        axios.get(url+lang+"/api/language/list", {
            Headers: {
                'Content-Type': "application/json"
            }
        }).then(response => {
            setLanguage(response.data)
        }).catch(error => {
            message.error(t("Fail to loade langauge."))
        })
    }


    return language
}





