import { Link } from "react-router-dom";
import { Tooltip, Button } from 'antd';



const Cards = (props) => {
    return (
        <div className="col-3">
            <div className="card p-1">
                <div className="text-center">
                    <h6>{props.item}</h6>
                    <h6>{props.count}</h6>
                </div>
                <Tooltip placement="top" title={props.addText}>
                    <Button><Link className="h5" to={props.link}>+</Link></Button>
                </Tooltip>
            </div>

        </div>
    )
}






const Dashboard = () => {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8 card p-2">
                        <div className="row">
                            <Cards item="Book" count={199} addText="New Book" link="/create-book" />
                            <Cards item="Post" count={43} addText="New Post" link="/create-post" />
                            <Cards item="Product" count={34} addText="New Product" link="/create-product" />
                            <Cards item="Template" count={76} addText="New Template" link="/create-template" />
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}

export default Dashboard;