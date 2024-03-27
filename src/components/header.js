import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container,NavbarToggle, Navbar, NavbarCollapse, NavbarBrand, Nav } from 'react-bootstrap';
import '../styles/header.css'
import { getProfile, logout,getRoles } from "../services/apiService";


export const Header=  ()=>{

    const [name, setName]=useState('')
    const navigate = useNavigate();
    const [roles,setRoles]=useState({
        isStudent: '',
        isTeacher: '',
        isAdmin: ''
    })
    const token=localStorage.getItem('token')

    useEffect(()=>{
        getName()
        getRole()
    },[token])
    async function getName(){
        if(token){
            const response = await getProfile(token)
            if(response.fullName){
                setName(response.fullName)
            }
        }
        

        
    }
    
    async function getRole(){
       if(token){
            const response = await getRoles(token)
            
            if(response){
                
                setRoles({
                    ...roles,
                    isStudent: response.isStudent,
                    isTeacher: response.isTeacher,
                    isAdmin: response.isAdmin
                }) 
            }
        } 
    }

    const handleLogout = async (e) => {
        e.preventDefault()
        if(token){
            const response=await logout(token)
        
            localStorage.clear()
            navigate('/login')
            
        }
        
    };    

    return (
        <Navbar className="bg-secondary shadow fixed-top" expand='lg'>
            <Container fluid className="me-3">
                <Link to="/" className="text-decoration-none ms-2">
                    
                    <NavbarBrand className="ms-2 text-white ">
                        Кампусные курсы
                    </NavbarBrand>
                </Link>
                
                <NavbarToggle className="bg-light"/>
                <NavbarCollapse >
                    <Nav className="w-100">
                    {
                        token ? (
                            <>
                                <Link to='/groups/' className="nav-link header">
                                    Группы курсов

                                </Link>
                                {roles.isStudent ? (
                                    <Link to='/courses/my' className="nav-link header">
                                        Мои курсы
                                    </Link>
                                ) : (
                                    <></>
                                )}
                                
                                {roles.isTeacher ? (
                                    <Link to='/courses/teaching' className="nav-link header">
                                        Преподаваемые курсы
                                    </Link>
                                ) : (
                                    <></>
                                )}
                                

                                <Link to='/profile' className="nav-link profile ms-lg-auto">{name}</Link>
                                <Link className="nav-link header" onClick={handleLogout}>Выход</Link>
                                
                            </>
                            
                        ) : 
                            < >
                                <Link to="/login" className="nav-link profile ms-3 ms-lg-auto mt-lg-0">
                                    Вход
                                </Link>
                                <Link to="/registration" className="nav-link profile ms-3">
                                    Регистрация
                                </Link>
                            </>
                            
                    }
                    </Nav>
                </NavbarCollapse>
            </Container>
            
        </Navbar>
    );
}