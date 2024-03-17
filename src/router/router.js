import React from 'react';
import { Routes, Route} from 'react-router';
import {Header} from '../components/header';
import Login from '../pages/login';
import Registration from '../pages/registation';
import WelcomePage from '../pages/welcomePage';
import Profile from '../pages/profile';
import GroupsPage from '../pages/groupsPage';

export default function Router(){
    return(
        <Routes>
            <Route path='/' element={
                <>

                    <Header/>
                    <WelcomePage/>
                </>
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
            <Route path='/profile' element={
                <>
                    <Header/>
                    <Profile/>
                </>
                
            }/>
            <Route path='/groups/' element={
                <>
                    <Header/>
                    <GroupsPage/>
                </>
                
            }/>
        </Routes>
    );
}