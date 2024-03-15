import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container,NavbarToggle, Navbar, NavbarCollapse, NavbarBrand, Nav } from 'react-bootstrap';
import '../styles/header.css'


export const Header=()=>{




    const token=localStorage.getItem('token')

    
        

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
                                <Link to='/' className="link">
                                    Группы курсов

                                </Link>
                                <Link to='/' className="link">
                                    Мои курсы
                                </Link>
                                <Link to='/' className="link">
                                    Преподаваемые курсы
                                </Link>
                                <div className="text-white  ms-lg-auto ms-5 mt-lg-0 mt-3">

                                    {/* {Name} */}
                                    <span style={{ opacity: 0.7, cursor: 'pointer' }}>Выход</span>
                                </div>
                                

                            </>
                            
                        ) : 
                            <div className="text-white ms-lg-auto ms-3 mt-lg-0 mt-3">
                                <Link to="/login" className="authLink">
                                    Вход
                                </Link>
                                <Link to="/registration" className="authLink">
                                    Регистрация
                                </Link>
                            </div>
                            
                    }
                    </Nav>
                </NavbarCollapse>
            </Container>
            
        </Navbar>
    );
}