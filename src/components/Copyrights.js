import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Copyrights() {
    const { t } = useTranslation();
    return (
        <div className="col-12 col-md-5 col-lg-4 col-xl-4 position-relative d-none d-xl-block d-lg-block">
            <div className="position-sticky" style={{ top: '50px' }}>
                <div className="p-2 mt-0 bg-light">
                    <span className="fst-italic h4 p-1">{t("Copyrights")}</span>
                    <p className="text-left">
                        {t("copy-right")}
                        <a href="mailto:support@freewsad.com">support@freewsad.com</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
