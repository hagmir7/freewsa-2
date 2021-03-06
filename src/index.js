import React, { Suspense, StrictMode } from 'react';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css'
import App from './App';
import i18n from './i18n';
import { HelmetProvider } from 'react-helmet-async';
import { Spin, Space } from 'antd';
import { createRoot } from 'react-dom/client';





const loadingarkup = (
  <div className='w-100 landig bg-light d-flex justify-content-center align-items-center'>
      <div>
        <Space size="large">
          <Spin size="large" />
        </Space>
      </div>    
   </div>
)


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <HelmetProvider>
      <Suspense fallback={loadingarkup}>
        <App />
      </Suspense>
    </HelmetProvider>
  </StrictMode>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();