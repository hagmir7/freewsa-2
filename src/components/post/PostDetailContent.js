import { React, Fragment, useContext } from 'react';
import GoogleAd from '../../ads/GoogleAd';
import { Helmet } from 'react-helmet-async';
import PostDelete from './PostDelete';
import AuthContext from '../../context/AuthContext';
import PostCard from './PostCard';








function PostDetialContent(props) {

    const {user, authTokens} = useContext(AuthContext); 

    const image = ()=>{
        return(
            <div className='w-100 mt-3 mb-3 d-flex justify-content-center row p-0 '>
                <img className='col-md-10 card shadow-sm img-detail p-0' alt={props.title} src={props.image} />
            </div>
        )
    }

    const ifImage = props.image.length > 0 ? props.image : 'logo';
    return (
        <Fragment>
            <div className='container p-0 animate__animated animate__fadeIn' key={props.id}>
                <div className='row justify-content-center p-0'>
                    <div className='col-sm-12 col-md-10 col-lg-8 col-xl-8 card shadow-sm' id='myList'>
                    <GoogleAd slot="4567237334" googleAdId="ca-pub-6043226569102012"/>
                        {props.image ? image() : <></>}
                        <div className='d-flex justify-content-center mt-2'>
                            <div className='w-100'>
                                <h1 className='h3'>{props.title}</h1>
                                <div dangerouslySetInnerHTML={{ __html: props.body }} />
                            </div>
                        </div>
                        <GoogleAd slot="4567237334" googleAdId="ca-pub-6043226569102012"/>
                        {
                            
                            authTokens ? user.is_superuser ? <PostDelete id={props.id} /> : '' : ''
                        }
                        
                    </div>
                </div>
                <Helmet>
                    <title>{props.title}</title>
                    <meta name="description" content={props.description.slice(0,159)} ></meta>
                    <link rel='canonical' href={`/p/${props.slug}/`} />
                    <meta itemprop="image" content={props.ifImage} />
                    <meta name="keywords" content={props.tags}/>
                    {/* Open graph */}
                    <meta property="og:title" content={props.title} />
                    <meta property="og:description" content={props.description.slice(0,159)} />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={`/p/${props.slug}/`} />
                    <meta property="og:image" content={ifImage} />
                </Helmet>
                <PostCard />
                
            </div>
        </Fragment>
    ) 
}
export default PostDetialContent;