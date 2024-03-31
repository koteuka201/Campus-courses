import { useSelector,useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Header } from '../pages/header/header';
import { isAuth } from '../../store/slices/authSlice';
// import { isAuth, clearAuth } from '../store/slices/authSlice';
export const AuthLayout = ({ children }) => {
    const {isAuthenticated, isLoading}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    useEffect(()=>{
        
        dispatch(isAuth(localStorage.getItem('token')))
        
    },[dispatch])
    
    if(isLoading){
        console.log('loading')
        return <></>
    }
    
    if ((isAuthenticated===true)  && !isLoading) {
        
        return <Navigate to={"/"} />
    }
    
    return (
        <>
            <Header />
            {children}
        </>
    )
}