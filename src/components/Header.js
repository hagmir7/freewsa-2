import React from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import home from '../assets/img/home.svg';
import support from '../assets/img/support.svg';
import book from '../assets/img/book-1.svg';
import privacy from '../assets/img/privacy.svg';
import about from '../assets/img/about.svg';
import Tooltip from "antd/lib/tooltip";





function Header(){
  const {t} = useTranslation();
     return(
        <div className="navbar-top d-none d-lg-block small bg-white mb-0">
          <nav className="d-flex justify-content-between p-2 pb-0">
            <ul className="nav mt-1">

              <li className="nav-item">
              <Tooltip placement="bottom" color={'blue'} title={t('Home')}>
                <Link className="nav-link h6 py-0 text-secondary" to="/"><img className="nav-icon" src={home} /></Link>
                </Tooltip>
              </li>

              <li className="nav-item">
              <Tooltip placement="bottom" color={'blue'} title={t('Books')}>
                <Link className="nav-link h6 py-0 text-secondary" to="/books"><img className="nav-icon" src={book} /></Link>
                </Tooltip>
              </li>

              <li className="nav-item">
              <Tooltip placement="bottom" color={'blue'} title={t('About')}>
                <Link className="nav-link h6 py-0 text-secondary" to="/about/"><img className="nav-icon" src={about} /></Link>
                </Tooltip>
              </li>

              <li className="nav-item">
              <Tooltip placement="bottom" color={'blue'} title={t('Contact')}>
                <Link className="nav-link h6 py-0 text-secondary" to="/contact" ><img className="nav-icon" src={support} /></Link>
                </Tooltip>
              </li>

              <li className="nav-item">
              <Tooltip placement="bottom" color={'blue'} title={t('Privacy Policy')}>
                <Link className="nav-link h6 py-0 text-secondary" to="/policy" ><img className="nav-icon" src={privacy} /></Link>
                </Tooltip>
              </li>

            </ul>
           
          </nav>
      </div>
    )
}

export default Header;