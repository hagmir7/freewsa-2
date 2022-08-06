import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Body from './components/Body';
import About from './pages/About';
import Policy from './pages/Policy';
import Contact from './pages/Contact';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Detial from './pages/Detail';
import { Helmet } from 'react-helmet-async';
import Book from './pages/Book';
import BookDetail from './pages/BookDetail';
import Menu from './pages/Menu'
import NotFoundPage from './pages/NotFoundPage';
import Dashboard from './pages/Dashboard';
import Language from './pages/Language';
import Login from './pages/Login';
import Register from './pages/Register';
import {Fragment } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Profile } from './pages/Profile';
import { UpdateProfile } from './pages/UpdateProfile';
import { AdminRoute } from './utils/AdminRoute';
import { CreatePost } from './pages/CreatePost';
import UrlProvider from './context/UrlContext';





function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <UrlProvider>
        <AuthProvider>
          <Nav />

            <Routes>

              {/* <Route path="/" element={<PrivateRoute />} exact></Route> */}
              <Route path="/" exact element={<Home />} />
              <Route path="/create-post" element={<AdminRoute />}>
                <Route path='' element={<CreatePost />}></Route>
              </Route>

              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/p/:slug" element={<Detial />} />
              <Route path="/books" element={<Book />} />
              <Route path="/book/:id" element={<BookDetail />} />
              <Route path="/Menu" element={<Menu />} />
              <Route path="/language" element={<Language />} />
              <Route path='/accounts/login' element={<Login />} />
              <Route path='/accounts/register' element={<Register />} />
              <Route path='/:username' element={<Profile />} />
              <Route path='/profile/:username' element={<UpdateProfile />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AuthProvider>
        </UrlProvider>
        <Footer />
      </BrowserRouter>


    </div>
  );
}

export const Home = () => {
  return (
    <Fragment>
      <div className='container'>
        < Body />
      </div>

      <Helmet>
        <title>FreeWsad - The Best Website For Education</title>
        <meta name="description" content="You can enjoy the Topics and Courses you love and download the original content, and share it all with your friends in FreeWsad." data-rh="true" />
        <meta name="author" content="freewsad.com" />
        <link rel='canonical' href="/" />
        <meta itemprop="image" content="%PUBLIC_URL%/favicon.webp" data-rh="true" />
        <meta name="keywords" content="python,js,javascript,html,css,c++,c#,java,bootstrap,react,vuejs,anguler,reactjs,design,php,code,coding,templates,programming" />
        <meta property="og:title" content="FreeWsad - The Best Website For Education" />
        <meta property="og:description" content="You can enjoy the Topics and Courses you love and download the original content, and share it all with your friends in FreeWsad." />
      </Helmet>
    </Fragment>

  )
}





export default App;
