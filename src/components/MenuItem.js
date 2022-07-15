import { Link } from "react-router-dom";




const MenuItem = (props)=>{
    return(
        <Link to={props.link} className="list-group-item list-group-item-action">
            <img src={props.image} alt={props.title} width="30px" />&#xa0; {props.title}
        </Link>
    )
}

export default MenuItem;