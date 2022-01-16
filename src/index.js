import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';

import { ClearBrowserCacheBoundary } from 'react-clear-browser-cache';

import reportWebVitals from './reportWebVitals';
import App from './App';

import './index.css';

ReactDOM.render(
  <ClearBrowserCacheBoundary auto fallback="Loading" duration={60000}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </ClearBrowserCacheBoundary>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
