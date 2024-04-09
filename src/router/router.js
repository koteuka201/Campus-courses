import React from 'react';
import { Routes, Route} from 'react-router';
import {Header} from '../components/pages/header/header';
import Login from '../components/pages/loginPage/login';
import Registration from '../components/pages/registrationPage/registation';
import WelcomePage from '../components/pages/welcomePage/welcomePage';
import NotFoundPage from '../components/pages/notFoundPage/notFoundPage';
import Profile from '../components/pages/profilePage/profile';
import GroupsPage from '../components/pages/groupsPage/groupsPage';
import GroupCoursesPage from '../components/pages/groupCoursesPage/groupCoursesPage';
import TeachingCoursesPage from '../components/pages/teachingCoursesPage/teachingCoursesPage';
import CourseDetailsPage from '../components/pages/courseDetailsPage/courseDetailsPage';
import MyCoursesPage from '../components/pages/myCoursesPage/myCoursesPage';
import { UnAuthLayout } from '../components/layouts/unAuthLayout';
import { AuthLayout } from '../components/layouts/authLayout';



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
            }/>
            <Route path='/registration' element={
                <AuthLayout children={<Registration/>}/>
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
            <Route path='/courses/teaching' element={
                <UnAuthLayout children={<TeachingCoursesPage/>}/>
                
            }/>
            <Route path='/courses/my' element={
                <UnAuthLayout children={<MyCoursesPage/>}/>
                
            }/>
            <Route path='/courses/:id' element={
                <UnAuthLayout children={<CourseDetailsPage/>}/>
            }/>
            <Route path='*' element={
                <UnAuthLayout children={<NotFoundPage/>}/>
            }/>
        </Routes>
    );
}