import React from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TwitterOutlined,
     InstagramOutlined, 
     FacebookOutlined,
     GithubOutlined
  } from '@ant-design/icons';

function Footer(){

    const {t} = useTranslation()
    return(
        <div className='bg-light py-4 my-2 row border-top'>
            <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center'>
                <Link to='/about/'>
                <span className='h6 mx-2'>{t("About")}</span>
                </Link>
                <Link to='/contact/'>
                <span className='h6 mx-2'>{t("Contact")}</span>
                </Link>
                <Link to='/policy/'>
                <span className='h6 mx-2'>{t("Privacy Policy")}</span>
                </Link>
                <Link to='/language/'>
                <span className='h6 mx-2'>{t("Language")}</span>
                </Link>
            </div>
            <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center mt-3'>
                <a className='footer-link mx-3 fs-6' target='_blanck' href='https://www.instagram.com/freewsad'>
                <InstagramOutlined />   
                </a>
                <a className='footer-link mx-3 fs-6'  target="_blanck" href='https://www.facebook.com/freewsad'>
                <FacebookOutlined />
                </a>
                <a className='footer-link mx-3 fs-6' target="_blanck" href='https://www.twitter.com/freewsad'>
                <TwitterOutlined />
                </a>
                <a className='footer-link mx-3 fs-6' target="_blanck" href='https://www.github.com/hagmir7'>
                <GithubOutlined />
                </a>
            </div>
        </div>
    )
}
export default Footer;