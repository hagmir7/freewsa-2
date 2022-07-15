import React from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";


function Header(){
  const {t} = useTranslation();
     return(
        <div className="navbar-top d-none d-lg-block small bg-white">
          <nav className="d-flex justify-content-between p-2">
            <ul className="nav mt-2">
              <li className="nav-item">
                <Link className="nav-link h6 py-0 text-secondary ps-0" to="/">{t("Blogs")}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link h6 py-0 text-secondary ps-0" to="/books">{t("Books")}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link h6 py-0 text-secondary ps-0" to="/about/">{t("About")}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link h6 py-0 text-secondary" to="/contact" >{t("Contact")}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link h6 py-0 text-secondary" to="/policy" >{t('Privacy Policy')}</Link>
              </li>
              <li className="nav-item">
              </li>
            </ul>
           
          </nav>
      </div>
    )
}

export default Header;