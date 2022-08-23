import { React, useState, createContext, useEffect, useContext } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UrlContext } from './UrlContext';
import axios from "axios";



export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {

  const {url, lang} = useContext(UrlContext);

  const LocalToken = localStorage.getItem('setAuthTokens') ? JSON.parse(localStorage.getItem('setAuthTokens')) : null;
  const DecodeToken = localStorage.getItem('setAuthTokens') ? jwt_decode(localStorage.getItem('setAuthTokens')) : null;


  const history = useNavigate()
  const {t} = useTranslation();

  let [authTokens, setAuthTokens] = useState(() => LocalToken);
  let [user, setUser] = useState(() => DecodeToken);
  let [loading , setLoading] = useState(true);


  const login = (event)=>{
    event.preventDefault()
    loginUser(event.target.username.value,event.target.password.value)
    document.getElementById('box').classList.remove('d-none');
    document.getElementById('login').classList.add('d-none');
    document.getElementById('login-btn').setAttribute('disabled', '')
  }


  let loginUser = async (username, password) => {
    let response = await fetch(`${url}${lang}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'username': username, 'password': password })
    })

    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem('setAuthTokens', JSON.stringify(data));
      history('/');
    } else {
      document.querySelector('#alert-login').innerHTML = (`<div class="alert-danger alert">${t("The username or password is incorrect.")}</div>`)
      document.getElementById('box').classList.add('d-none');
      document.getElementById('login').classList.remove('d-none');
      document.getElementById('login-btn').removeAttribute('disabled')
    }

  }



  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('setAuthTokens')
    history("accounts/login");
  }




  // Update token 
  let updateToken = async () => {
    let response = await fetch(`${url}${lang}/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'refresh': authTokens.refresh })
    })

    let data = await response.json();
    
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem('setAuthTokens', JSON.stringify(data));
    } else {
      logoutUser();
    }
  }



  const [info , setInfo ] = useState({});
  const [profile, setProfile ] = useState({avatar: 'test'})

  const getUserIfno = ()=>{
      axios.get(`${url}${lang}/api/user/id/${user.id}`, {
          headers : {
              'Content-Type' : 'application/json'
          }
      }).then(response =>{
          setInfo(response.data[0]);
          setProfile(response.data[1]);
      }).catch(error =>{
          // console.clear();
      });
  }

  




  let contextDate = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    login: login,
    authTokens:authTokens,
    // Get user info 
    
    getUserIfno: getUserIfno,
    // user info
    userInof : info,
    userProfile : profile,


  }


  



  useEffect(()=>{
    let fourMinits = 1000 * 60 * 4;
    let interavl = setInterval(()=>{
      if(authTokens){
        updateToken()
      }
    }, fourMinits)
    return ()=> clearInterval(interavl)

  }, [authTokens,loading])

  return (
    <AuthContext.Provider value={contextDate} >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
