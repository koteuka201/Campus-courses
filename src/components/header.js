import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container,NavbarToggle, Navbar, NavbarCollapse, NavbarBrand, Nav } from 'react-bootstrap';
import '../styles/header.css'
import { getProfile, logout } from "../services/apiService";


export const Header=  ()=>{

    const [name, setName]=useState('')
    const navigate = useNavigate();

    const token=localStorage.getItem('token')
    async function getName(){
        if (token) {
            const response = await getProfile(token)
            if(response.fullName){
                setName(response.fullName)
            }
        }
    }
    getName()
    
    const handleLogout = async (e) => {
        e.preventDefault()
        
        if(token){
            const response=await logout(token)
        
            // if (response){
            localStorage.clear()
            navigate('/login')
            // }
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
                                <Link to='/' className="nav-link">
                                    Группы курсов

                                </Link>
                                <Link to='/' className="nav-link">
                                    Мои курсы
                                </Link>
                                <Link to='/' className="nav-link">
                                    Преподаваемые курсы
                                </Link>

                                <Link to='/profile' className="nav-link ms-lg-auto">{name}</Link>
                                <Link className="nav-link" onClick={handleLogout}>Выход</Link>
                                
                            </>
                            
                        ) : 
                            < >
                                <Link to="/login" className="nav-link ms-lg-auto mt-lg-0">
                                    Вход
                                </Link>
                                <Link to="/registration" className="nav-link">
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