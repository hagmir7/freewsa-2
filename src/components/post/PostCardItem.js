import React from 'react';
import RandomColors from '../RandomColors';
import { Link } from 'react-router-dom';

export default function PostCardItem(props) {
    return (
        <div ref={props.ref} key={props.key} className="col-12 col-md-6 col-lg-4 mb-3 loading" >
            <Link to={`/p/${props.slug}/`}>
                {props.image ?
                    <img className="embed-responsive rounded w-100" alt={props.title} src={props.image} sizes="25vw" />
                    :
                    <div style={{ background: RandomColors(), height: '200px' }} className="embed-responsive border rounded d-flex align-items-center" sizes="25vw">
                        <div className="h3 text-black text-center m-auto">{props.title}</div>
                    </div>
                }
            </Link>
            <div className="card-body m-0 p-0 mt-2">
                <Link to={`/p/${props.slug}/`}>
                    <div className="card-title h5 my-0 py-0 text-muted">{props.title.length > 40 ? props.title.slice(0, 40).concat('...') : props.title}</div>
                </Link>
                <p className="card-text">
                    <small className="text-muted">
                        <span className="mr-2 h6">{props.date}</span>
                    </small>
                </p>
            </div>
        </div>
    )
}
