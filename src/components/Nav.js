import { Link } from 'react-router-dom';
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import AuthTols from "./AuthTols";



function Nav() {

  return (
    <header className="navbar-light position-sticky top-0 header-static border-bottom bg-white" style={{ zIndex: 102 }}>
      <div className="navbar navbar-expand-lg p-0">
        <div className="d-flex justify-content-between w-100 px-3">
          <div>
          <Link className="nav-item logo h4 p-2 m-0 mt-1 h1" to="/">Freewsad</Link>
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