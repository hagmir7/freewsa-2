import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import { useTranslation } from 'react-i18next';




const NotFoundPage = () => {
    const { t } = useTranslation()
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle={t("Sorry, the page you visited does not exist.")}
                extra={<Link to="/"><Button type="primary">{t("Back Home")}</Button></Link>}
            />
        </>
    )

}

export default NotFoundPage;