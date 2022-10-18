import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Copyrights() {
    const { t } = useTranslation();
    return (
        <div className="col-12 col-md-5 col-lg-4 col-xl-4 position-relative d-none d-xl-block d-lg-block">
            <div className="position-sticky" style={{ top: '50px' }}>
                <div className="p-2 mt-0 bg-light">
                    <span className="fst-italic h4 p-1">{t("Copyrights")}</span>
                    <p className="text-left" style={{textAlign: 'justify'}}>
                        {t("copy-right")} 
                        <Link to='/contact' className='text-info'> {t("Contact Us")} </Link>
                        {t("or by e-mail at:")}
                        <a href="mailto:support@freewsad.com" className='text-info'> support@freewsad.com. </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
