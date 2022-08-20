import { React, useContext } from "react";
import { } from 'antd';

import { Helmet } from 'react-helmet-async';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';
import { useTranslation } from "react-i18next";
import { UrlContext } from "../context/UrlContext";

function Contact() {
  const { url, lang } = useContext(UrlContext);
  const history = useNavigate();
  const { t } = useTranslation();




  const openNotificationWithIcon = type => {
    notification[type]({
      message: t("Message has been sent successfully"),
      description:
        t("contact-message-success"),
    });
  };


  const SendMessage = (e) => {
    e.preventDefault();
    const form = document.getElementById('form-contact')
    const formData = new FormData(form)

    const email = formData.get('email');
    const name = formData.get('name');
    const body = formData.get('body');
    console.log(body)
    if (email !== "" && name !== "" && body !== "") {
      axios({
        method: 'post',
        url: `${url}${lang}/api/contact`,
        data: formData,
      }).then((response => {
        form.reset();
        openNotificationWithIcon('success')
        setTimeout(() => {
          history('/');
        }, 4000)
      }));
    }
  }






  return (
    <div className="bg-colors">
      <div className='container mb-4 p-3'>
        <div className='w-100 row justify-content-center'>
          <div className='col-sm-12 col-md-10 col-lg-6 col-xl-6 card p-3 shadow-sm'>
            <h1 className="h4">{t("Contact Us")}</h1>
            <form id="form-contact" onSubmit={SendMessage}>
              <label htmlFor='name'>{t("Name")}</label>
              <input className='form-control mb-3' type='text' name='name' placeholder={`${t("Name")}...`} required />
              <label htmlFor='emai'>{t("Email")}</label>
              <input className='form-control mb-3' type='email' name='email' placeholder={`${t("Email")}...`} required />
              <label htmlFor='message'>{t("Message")}</label>
              <textarea className='form-control mb-3' name='body' placeholder={`${t("Message")}...`} required />
              <button type="submit" className="btn btn-sm btn-info text-white w-50 ">{t("Send Message")}</button>
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