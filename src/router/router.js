import React from 'react';
import { Routes, Route} from 'react-router';
import {Header} from '../components/header';
import Login from '../pages/login';
import Registration from '../pages/registation';
import WelcomePage from '../pages/welcomePage';
import Profile from '../pages/profile';
import GroupsPage from '../pages/groupsPage';
import GroupCoursesPage from '../pages/groupCoursesPage';
import { AuthLayout } from '../layouts/authLayout';
import { UnAuthLayout } from '../layouts/unAuthLayout';

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
                <AuthLayout children={<Login/>}/>
                // <>
                //     <Header/>
                //     <Login/>
                // </>
                
            }/>
            <Route path='/registration' element={
                <AuthLayout children={<Registration/>}/>
                // <>
                //     <Header/>
                //     <Registration/>
                // </>
                
            }/>
            <Route path='/profile' element={
                <UnAuthLayout children={<Profile/>}/>
            }/>
            <Route path='/groups' element={
                <UnAuthLayout children={<GroupsPage/>}/>
                
            }/>
            <Route path='/groups/:id' element={
                <UnAuthLayout children={<GroupCoursesPage/>}/>
                
            }/>
        </Routes>
    );
}