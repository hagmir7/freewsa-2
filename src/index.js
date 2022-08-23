import React, { Suspense, StrictMode } from 'react';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css'
import App from './App';
import i18n from './i18n';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';
import logo from './assets/img/logo-rounded-pill.webp';




const loadingarkup = (
  <div className='w-100 landig bg-light d-flex justify-content-center align-items-center bg-colors'>
      <div>
      <img src={logo} width="60px" alt='Loading Freewsad' className='animate__animated animate__pulse animate__infinite	infinite animate__fast ' />
      </div>    
   </div>
)



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <Suspense fallback={loadingarkup}>
        <App />
      </Suspense>
    </HelmetProvider>
  </StrictMode>,
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals()
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();