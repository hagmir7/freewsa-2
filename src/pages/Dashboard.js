import { Link } from "react-router-dom";
import { Tooltip, Button } from 'antd';
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { UrlContext } from "../context/UrlContext";
import { useState } from "react";


const Cards = (props) => {
    return (
        <div className="col-3">
            <div className="card p-1">
                <div className="text-center">
                    <h6>{props.item}</h6>
                    <h6>{props.count}</h6>
                </div>
                <Tooltip placement="bottom" title={props.addText}>
                    <Button><Link className="h5" to={props.link+ '/'}>+</Link></Button>
                </Tooltip>
                <Button className="mt-2"><Link className="h5" to={props.list+ '/'}><span className="navbar-toggler-icon"></span></Link></Button>
            </div>
        </div>
    )
}






const Dashboard = () => {
    useEffect(() => {
        getDashboardata();
      }, [])
    
    
    const {url, lang} = useContext(UrlContext);
    
      const [data, setData ] = useState({
          'posts' : '',
          'books' : '',
          'templates' : '',
          'products' : '',
    
    });
      
    
    const getDashboardata = ()=>{
          
        axios.get(`${url + lang}/api/dashboard/tools`, {
            headers: {
                "Content-Type" : 'application/json'
            }
        }).then(response =>{
            setData({
                'posts' : response.data.posts,
                'books' : response.data.books,
                'templates' : response.data.templates,
                'products' : response.data.products,
            })
        })   
              
    }
    
  
    return (
        <>
            <div className="container mb-2">
                <div className="row justify-content-center">
                    <div className="col-8  p-2">
                        <div className="row">
                            <Cards item="Book" list='/admin/books' count={data.books} addText="New Book" link="/book/create" />
                            <Cards item="Post" list='/admin/posts' count={data.posts} addText="New Post" link="/post/create" />
                            <Cards item="Product" list='/admin/products' count={data.products} addText="New Product" link="/create-product" />
                            <Cards item="Template" list='/admin/templates' count={data.templates} addText="New Template" link="/create-template" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;



