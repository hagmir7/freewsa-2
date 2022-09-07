import { Link } from "react-router-dom";
import { Tooltip, Button } from 'antd';
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { UrlContext } from "../context/UrlContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";


const Cards = (props) => {
    return (
        <div className="col-3">
            <div className="card p-1">
                <div className="text-center">
                    <h6>{props.item}</h6>
                    <h6>{props.count}</h6>
                </div>
                <Tooltip placement="bottom" title={props.addText}>
                    <Button><Link className="h5" to={props.link + '/'}>+</Link></Button>
                </Tooltip>
                <Button className="mt-2">
                    <Link className="h5" to={props.list + '/'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </Link>
                </Button>
            </div>
        </div>
    )
}






const Dashboard = () => {
    useEffect(() => {
        getDashboardata();
    }, [])

    const { t } = useTranslation();


    const { url, lang } = useContext(UrlContext);

    const [data, setData] = useState({
        'posts': '',
        'books': '',
        'templates': '',
        'products': '',

    });


    const getDashboardata = () => {

        axios.get(`${url + lang}/api/dashboard/tools`, {
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(response => {
            setData({
                'posts': response.data.posts,
                'books': response.data.books,
                'templates': response.data.templates,
                'products': response.data.products,
            })
        })

    }


    return (
        <>
            <div className="container mb-2">
                <div className="row justify-content-center">
                    <div className="col-8  p-2">
                        <div className="row">
                            <Cards item={t("Book")} list='/admin/books' count={data.books} addText={t("New Book")} link="/book/create" />
                            <Cards item={t("Article")} list='/admin/posts' count={data.posts} addText={t("New Article ")} link="/post/create" />
                            <Cards item={t("Product")} list='/admin/products' count={data.products} addText={t("New Product")} link="/create-product" />
                            <Cards item={t("Template")} list='/admin/templates' count={data.templates} addText={t("New Template")} link="/create-template" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;



