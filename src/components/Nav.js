import { Link } from 'react-router-dom';
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import AuthTols from "./AuthTols";
import Logo from '../assets/img/rounded-pill.webp'



function Nav() {

  return (
    <header className="navbar-light position-sticky top-0 header-static border-bottom bg-white" style={{ zIndex: 102 }}>
      <div className="navbar navbar-expand-lg p-0">
        <div className="d-flex justify-content-between w-100 px-3">
          <div>
          <Link className="nav-item logo h4  m-0 my-1 h1" to="/"><img width='45px' height='45px' src={Logo} /></Link>
          </div>
          <Header />
          <AuthTols />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

export default Nav;