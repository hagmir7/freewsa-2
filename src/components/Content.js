import { React, Fragment } from 'react';
// import GoogleAd from '../ads/GoogleAd';
import BodyDetail from './BodyDetail';
import { Helmet } from 'react-helmet-async';
import Fk from '../ads/Fk';
import logo from '../assets/img/logo-rounded-pill.webp'



function Detial(props) {
    const image = ()=>{
        return(
            <div className='shdow-sm card mt-3 mb-3'>
                <img className='w-100 img-detail' alt={props.title} src={props.image} />
            </div>
        )
    }

    const ifImage = props.image.length > 0 ? props.image : logo;
    return (
        <Fragment>
            <div className='container p-0 animate__animated animate__fadeIn' key={props.id}>
                <div className='row justify-content-center p-0'>
                    <div className='col-sm-12 col-md-10 col-lg-8 col-xl-8 card shadow-sm' id='myList'>
                        {/* <GoogleAd slot="4567237334" googleAdId="ca-pub-6043226569102012"/> */}
                        {props.image ? image() :''}
                        
                        <Fk />
                        <div className='d-flex justify-content-center mt-2'>
                            <div className='w-100'>
                                <h1 className='h3'>{props.title}</h1>
                                <div dangerouslySetInnerHTML={{ __html: props.body }} />
                            </div>
                        </div>
                        {/* <GoogleAd slot="4567237334" googleAdId="ca-pub-6043226569102012"/> */}
                        <Fk />
                        
                    </div>
                </div>
                <Helmet>
                    <title>{props.title}</title>
                    <meta name="description" content={props.description.slice(0,159)} ></meta>
                    <link rel='canonical' href={`/detail/${props.slug}`} />
                    <meta itemprop="image" content={props.ifImage} />
                    <meta name="keywords" content={props.tags}/>
                    {/* Open graph */}
                    <meta property="og:title" content={props.title} />
                    <meta property="og:description" content={props.description.slice(0,159)} />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={`http://www.freewsad.com/p/${props.slug}`} />
                    <meta property="og:image" content={ifImage} />
                </Helmet>
                <BodyDetail />
            </div>
        </Fragment>
    ) 
}
export default Detial;