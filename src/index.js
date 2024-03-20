import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './router/router';
import { BrowserRouter } from 'react-router-dom';
import authReducer  from './store/store';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authReducer 
  },
  devTools:true
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
  
);

