import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import GoogleAd from "../ads/GoogleAd";
import { useTranslation } from "react-i18next";
import DownloadModal from "./DownloadModal";
import coockies from 'js-cookie';




const BookDetailContent = (props) => {

    const {t} = useTranslation()

    const ModelDownload = ()=> <DownloadModal link={props.book_file} />;
    const BtnDownload = ()=> {
        return(
                <div>
                     <a className='btn btn-success' href={props.book_file} target='_blanck' download>{t("DOWNLOAD")}</a>
                </div>
            )
    };
    return (
        <div className="container-lg">
            <div className="row" key={props.id}>
            <div className="col-12 col-md-7 col-lg-8 col-xl-8 mb-3 card m-0 shadow-sm">
                <article className="blog-post">
                    <h1 className="blog-post-title h4 mt-2">{props.name}</h1>
                    <p className="text-left">{props.description}</p>
                    <GoogleAd slot="4567237334" googleAdId="ca-pub-6043226569102012"/>
                    <hr/>
                        <div className="d-flex justify-content-center mb-3">
                            <div className="card shadow-sm overflow-hidden">
                                <img className="book-detail-image" src={props.image} alt={props.name} />
                            </div>
                        </div>
                        <h2 className="h5">{t("About book")}</h2>
                        <table className="table table-hover border">
                            <tbody>
                                <tr>
                                    <th scope="row">{t("Author")}</th>
                                    <td>books.goalkicker.com</td>
                                </tr>
                                <tr>
                                    <th scope="row">{t("File type")}</th>
                                    <td>{props.type_file}</td>
                                </tr>
                                <tr>
                                    <th scope="row">{t("Language")}</th>
                                    <td>{props.language}</td>
                                </tr>
                                <tr>
                                    <th scope="row">{t("Pages")}</th>
                                    <td>{props.pages}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h2 className="h5">{t("Download Book")}</h2>
                        <div className="w-100 d-flex justify-content-center">
                            {coockies.get('email') === 'valid' ? BtnDownload() : ModelDownload() }
                            {/* <DownloadModal  link={props.book_file}/> */}
                        </div>
                        <div className="mb-3">
                            <GoogleAd slot="4567237334" googleAdId="ca-pub-6043226569102012"/>
                        </div>
                </article>
            </div>
            <div className="col-12 col-md-5 col-lg-4 col-xl-4 position-relative">
                <div className="position-sticky" style={{ top:'60px' }}>
                    <div className="card shadow-sm">
                    <GoogleAd slot="2352137536" googleAdId="ca-pub-6043226569102012"/>
                    </div>
                    <div className="p-4 mt-3 bg-light card shadow-sm border">
                        <span className="fst-italic h4 p-1">{t("Copyrights")}</span>
                        <p className="text-left">
                            {t("copy-right")}
                            <a href="mailto:support@freewsad.com">support@freewsad.com</a></p>
                        <Link to="/about" >{t("Read More")}</Link>
                    </div>
                </div>
            </div>
        </div>
        <Helmet>
            <title>{props.name}</title>
            <meta name="description" content={props.description} ></meta>
            <link rel='canonical' href={`/book/${props.id}`} />
            <meta itemprop="image" content={props.image} />
            <meta name="keywords" content={props.tags}/>
            <meta property="og:type" content="article" />
            <meta property="og:title" content={props.name} />
            <meta property="og:description" content={props.description} />
        </Helmet>
        </div>
    )

}

export default BookDetailContent;


