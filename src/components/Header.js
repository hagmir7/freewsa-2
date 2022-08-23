import React, {useContext} from "react";
import { Link } from "react-router-dom";
import Tooltip from "antd/lib/tooltip";
import { useTranslation } from "react-i18next";
import AuthContext from "../context/AuthContext";



// Icons
import home from '../assets/img/home.svg';
import support from '../assets/img/support.svg';
import book from '../assets/img/book-1.svg';
import privacy from '../assets/img/privacy.svg';
import about from '../assets/img/about.svg';
import dashboard from '../assets/img/dashboard.svg';


const HeaderIcons = (props)=>{
  const {t} = useTranslation();
  return (
    <li className="nav-item">
    <Tooltip placement="bottom" color={props.color} title={t(props.title)}>
      <Link className="nav-link h6 py-0 text-secondary" to={props.route}><img title={props.title} loading='eager' className="nav-icon" src={props.icon} alt={props.title} width="30px" height="30px" /></Link>
      </Tooltip>
    </li>
  )
}




function Header(){

  const {authTokens, user} = useContext(AuthContext)
     return(
        <div className="navbar-top d-none d-lg-block small bg-white mb-0">
          <nav className="d-flex justify-content-between p-2 pb-0">
            <ul className="nav mt-1">
              <HeaderIcons title="Home" color='blue' route="/" icon={home}  />
              <HeaderIcons title="Books" color='blue' route="/books" icon={book} />
              <HeaderIcons title="About" color='blue' route="/about/" icon={about} />
              <HeaderIcons title="Contact" color='blue' route="/contact" icon={support} />
              <HeaderIcons title="Privacy Policy" color='blue' route="/policy" icon={privacy} />
              { authTokens ? user.is_superuser ? <HeaderIcons title="Dashboard" color='blue' route="/admin/dashboard" icon={dashboard} /> : '': ''}
            </ul>
          </nav>
      </div>
    )
}

export default Header;