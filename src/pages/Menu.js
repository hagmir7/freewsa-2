import MenuItem from "../components/MenuItem";
// import images
import Contact from '../assets/img/contact.svg'
import About from '../assets/img/about.svg'
import Book from '../assets/img/book.svg'
import Home from '../assets/img/home.svg'
import Post from '../assets/img/post.svg'
import Privacy from '../assets/img/privacy.svg';
import Language from '../assets/img/location.svg';
import login from '../assets/img/login.svg';
import logout from '../assets/img/logout.svg';
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

import { useTranslation } from "react-i18next";

const Menu = ()=>{
    const {t} = useTranslation()

    const { logoutUser, user } = useContext(AuthContext);
    return(
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                        <div className="list-group">
                            <MenuItem link="/" title={t("Home")} image={Home} />
                            <MenuItem link="/" title={t("Blogs")} image={Post} />
                            <MenuItem link="/books" title={t("Books")} image={Book} />
                            <MenuItem link="/about" title={t("About Us")}image={About} />
                            <MenuItem link="/contact" title={t("Contact Us")} image={Contact} />
                            <MenuItem link="/policy" title={t("Privacy Policy")} image={Privacy} />
                            <MenuItem link="/language" title={t("Language")} image={Language} />

                            {!user ?
                                 <MenuItem link='/accounts/login' title={t("Login")} image={login}  />
                                 :
                                 <span className="list-group-item list-group-item-action pointer" onClick={logoutUser}>
                                    <img src={logout} alt={t("Logout")} width="30px" />&#xa0; {t("Logout")}
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Menu;