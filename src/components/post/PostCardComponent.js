import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import LoadingImage from '../../assets/loading-image.svg';
import RandomColors from '../RandomColors';

export default function PostCardComponent(props) {
    return (
        <div ref={props.lastPostElement} className="col-12 col-md-6 col-lg-4 mb-3 p-2" key={props.id}>
            <Link to={`/p/${props.slug}/`}>
                {props.image ?
                    <LazyLoadImage effect='blur' className="rounded" height='auto' placeholderSrc={LoadingImage} width='100%' alt={props.title} src={props.image}  />
                    :
                    <div style={{ background: RandomColors(), height: '200px' }} className="border rounded d-flex align-items-center" >
                        <div className="h3 text-black text-center m-auto">{props.title}</div>
                    </div>
                }
            </Link>
            <div className="mt-2">
                <Link to={`/p/${props.slug}/`}>
                    <div dir='auto' className=" h5 my-0 py-0 text-muted">{props.title.length > 40 ? props.title.slice(0, 40).concat('...') : props.title}</div>
                </Link>
                <p className="card-text">
                    <small className="text-muted mr-2 h6" dir='auto'>{props.date}</small>
                </p>
            </div>
        </div>
    )
}
