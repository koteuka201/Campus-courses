import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './router/router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store } from './store/store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
  
);

