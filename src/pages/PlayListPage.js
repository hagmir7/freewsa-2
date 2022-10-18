import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PlayList from '../components/PlayList';
import PlayListItem from '../components/PlayListItem';
import Copyrights from '../components/Copyrights';
import PlayListCards from '../components/PlayListCards';

export default function PlayListPage() {
    const { slug, id } = useParams();
    return (
        <div className="container-lg mt-3">
            <div className="row">
                <PlayListItem slug={slug} id={id}/>
                <Copyrights />
            </div>
            <hr />
            <PlayListCards id={id} />
            <PlayList />
            <Helmet>
                <title>New Play list</title>
                <meta name="description" ></meta>
                {/* <link rel='canonical' href={`/book/${props.id}`} />
    <meta itemprop="image" content={props.image} />
    <meta name="keywords" content={props.tags}/>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={props.name} /> */}
                <meta property="og:description" />
            </Helmet>
        </div>
    )
}
