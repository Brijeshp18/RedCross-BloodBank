import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import { Provider } from "react-redux";
import store from './Redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 
     <Provider store={store}>
    <ConfigProvider
    theme={{
      token:{
        colorPrimary:"#f00",
       
      }
    }}>
    <App />
    </ConfigProvider>
    </Provider>
 
);

reportWebVitals();
