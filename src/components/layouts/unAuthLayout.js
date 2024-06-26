import { useSelector,useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Header } from '../pages/header/header';
import { isAuth, clearAuth } from '../../store/slices/authSlice';
export const UnAuthLayout = ({ children }) => {
    const {isAuthenticated, isLoading}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    useEffect(()=>{
        
        dispatch(isAuth(localStorage.getItem('token')))
        
    },[dispatch])
    useEffect(() => {
        
        if ((isAuthenticated===false) && !isLoading) {
            localStorage.clear();
            dispatch(clearAuth());
        }
    }, [isAuthenticated, isLoading, dispatch]);
    
    if(isLoading){
        return <></>
    }
    
    if ((isAuthenticated===false)  && !isLoading) {
        
        localStorage.clear();
        dispatch(clearAuth());
        return <Navigate to={"/login"} />
    }
    
    return (
        <>
            <Header />
            {children}
        </>
    )
}