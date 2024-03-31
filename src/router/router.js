import React from 'react';
import { Routes, Route} from 'react-router';
import {Header} from '../components/header';
import Login from '../components/pages/loginPage/login';
import Registration from '../pages/registation';
import WelcomePage from '../components/pages/welcomePage/welcomePage';
import Profile from '../pages/profile';
import GroupsPage from '../pages/groupsPage';
import GroupCoursesPage from '../pages/groupCoursesPage';
import TeachingCoursesPage from '../components/pages/teachingCoursesPage/teachingCoursesPage';
import CourseDetailsPage from '../pages/courseDetailsPage';
import MyCoursesPage from '../components/myCourses/myCoursesPage';
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
        </Routes>
    );
}