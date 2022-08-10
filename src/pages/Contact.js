import {React, useContext, useState} from "react";
import { } from 'antd';

import { Helmet } from 'react-helmet-async';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, notification, Space ,Spin  } from 'antd';
import { useTranslation } from "react-i18next";
import { UrlContext } from "../context/UrlContext";

function Contact() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const {url, lang} = useContext(UrlContext);
  const history = useNavigate();
  const {t} = useTranslation();


  

  const openNotificationWithIcon = type => {
    notification[type]({
      message: t("Message has been sent successfully"),
      description:
        t("contact-message-success"),
    });
  };

  const contactInfo = async ()=>{
    // Send a POST request
    if(!email === "" && !name === "" && !body === ""){
      const btn = document.querySelector('#btn-contact');
      const spin = document.querySelector('#spiner');
      btn.classList.add('d-none')
      spin.classList.remove('d-none')
    }

    axios({
      method: 'post',
      url: `${url}${lang}/api/contact`,
      data: {
        "name": name,
        "email": email,
        "body": body
      }
    }).then((response =>{
      
      if(!email == "" && !name == "" && !body == ""){
        openNotificationWithIcon('success')
        setTimeout(()=>{
          history('/');
        },5000)
      }
    }));
  }

  return (
    <div className="bg-colors">
      <div className='container mb-4 p-3'>
        <div className='w-100 row justify-content-center'>
          <div className='col-sm-12 col-md-10 col-lg-6 col-xl-6 card p-3 shadow-sm'>
            <h1 className="h4">{t("Contact Us")}</h1>
            <form>
              <label htmlFor='name'>{t("Name")}</label>
              <input className='form-control mb-3' type='text' name='name' placeholder={`${t("Name")}...`} 
              value={name} onChange={(e) => setName(e.target.value)} required />

              <label htmlFor='emai'>{t("Email")}</label>
              <input className='form-control mb-3' type='email' name='email' placeholder={`${t("Email")}...`} 
              value={email} onChange={(e) => setEmail(e.target.value)} required/>

              <label htmlFor='message'>{t("Message")}</label>
              <textarea className='form-control mb-3' name='body' placeholder={`${t("Message")}...`} 
              value={body} onChange={(e) => setBody(e.target.value)} required/>
              <Button className='btn btn-ag ag-blue' id="btn-contact" type="button" onClick={contactInfo}>{t("Send Message")}</Button>
             <div id="spiner" className="d-none"><Space size="middle"> <Spin size="small"></Spin> </Space></div>
            </form>
          </div>
        </div>
      </div>
      <Helmet>
        <title>{t("Contact Us | FreeWsad")}</title>
        <link rel='canonical' href="/policy" />

      </Helmet>
    </div>
  );
}

export default Contact;