import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NewsContxtVal from './context/AllnewsContex';
import { BrowserRouter } from "react-router-dom";
import SearchVal from './context/SearchContext';
import AuthProvider from './context/AuthuserContext';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <SearchVal>
    <NewsContxtVal>
  
      <App />

      <ToastContainer/>

    </NewsContxtVal>
    </SearchVal>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
