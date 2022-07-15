import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import GoogleAd from "../ads/GoogleAd";
import axios from "axios";
import coockies from 'js-cookie';
import { Spin } from 'antd';


const DownloadModal = (props) => {

    const { t } = useTranslation()
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const [email, setEmail] = useState('');

    const sendEmail= () => {
        if(email != ''){
            axios({
                method: 'POST',
                url: 'https://www.freedaz.com/en/api/save-email',
                data: {
                  "email": email,
                }
              }).then((response =>{
                    document.querySelector('#spin').classList.remove('d-none')
                    coockies.set('email', 'valid');
                    window.location.href = props.link;
            }));
        }else{
            document.querySelector('#message').classList.remove('d-none');
            document.querySelector('.email').classList.add('border-danger');
        }

    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {t("DOWNLOAD")}
            </Button>
            <Modal title={t("Download Book")} footer={false} visible={isModalVisible} onCancel={handleCancel}>
                <lable htmlfor='email' className="name h5 mb-2" dir='auto'>{t("Enter your email to download")}</lable>
                <input type='email' onChange={(event)=>{ setEmail(event.target.value)}} placeholder={t("Email...")} className="form-control email" name="email" id="email" />
                <strong className='text-danger d-none' id='message'>{t("Enter your email please..!")}</strong>
                <div className="text-center mt-5">
                    <Button type="primary" onClick={sendEmail}>
                        {t("DOWNLOAD")} <span className='d-none' id='spin'> &#xa0; &#xa0;<Spin />  &#xa0; &#xa0;</span>
                    </Button>
                    <GoogleAd slot="4567237334" googleAdId="ca-pub-6043226569102012"/>
                </div>
            </Modal>
        </>
    );
};

export default DownloadModal;