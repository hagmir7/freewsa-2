import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Lang from "../components/Lang";

const Language = () => {

    const { t } = useTranslation()
    return (
        <div >
            <div className="container d-flex justify-content-center p-5">
                <div>
                    <Lang />
                    <div className="alert alert-info mt-3">
                        <strong className="h5">{t("How to use language")}</strong>
                        <p>{t("lang_info")}</p>
                    </div>
                </div>
            </div>
            <Helmet>
                <title>{t("Language")} - FreeWsad</title>
            </Helmet>
        </div>
    )
}

export default Language;