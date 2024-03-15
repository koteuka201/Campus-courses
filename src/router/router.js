import React from 'react';
import { Routes, Route} from 'react-router';
import {Header} from '../components/header';
import Login from '../pages/login';
import Registration from '../pages/registation';
export default function Router(){
    return(
        <Routes>
            <Route path='/' element={
                <Header/>
            }/>
            <Route path='/login' element={
                <>
                    <Header/>
                    <Login/>
                </>
                
            }/>
            <Route path='/registration' element={
                <>
                    <Header/>
                    <Registration/>
                </>
                
            }/>
        </Routes>
    );
}