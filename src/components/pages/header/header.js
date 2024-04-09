import React, { useState, useEffect } from "react";
import { Link,  useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container,NavbarToggle, Navbar, NavbarCollapse, NavbarBrand, Nav } from 'react-bootstrap';
import '../../../styles/header.css'
import { getRoles } from "../../../apiServices/usersService";
import { getProfile, logout } from "../../../apiServices/accountService";

export const Header=  ()=>{

    const [handleClose,setHandleClose]=useState(false)
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
        const response = await getProfile(token)
        if(response.fullName){
            setName(response.fullName)
        }
        
    }
    
    async function getRole(){
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

    const handleLogout = async (e) => {
        e.preventDefault()
        const response=await logout(token)
    
        localStorage.clear()
        navigate('/login')
            
        
    };    

    return (
        <Navbar className="bg-secondary shadow" expand='lg'>
            <Container fluid className="me-3">
                <Link to="/" className="text-decoration-none ms-2">
                    
                    <NavbarBrand className="ms-2 text-white ">
                        Кампусные курсы
                    </NavbarBrand>
                </Link>
                
                <NavbarToggle className="bg-light" onClick={()=>setHandleClose(!handleClose)}/>
                <NavbarCollapse in={handleClose}>
                    <Nav className="w-100">
                    {
                        token ? (
                            <>
                                <Link to='/groups/' className="nav-link header" onClick={()=> setHandleClose(false)}>
                                    Группы курсов

                                </Link>
                                {roles.isStudent ? (
                                    <Link to='/courses/my' className="nav-link header" onClick={()=> setHandleClose(false)}>
                                        Мои курсы
                                    </Link>
                                ) : (
                                    <></>
                                )}
                                
                                {roles.isTeacher ? (
                                    <Link to='/courses/teaching' className="nav-link header" onClick={()=> setHandleClose(false)}>
                                        Преподаваемые курсы
                                    </Link>
                                ) : (
                                    <></>
                                )}
                                

                                <Link to='/profile' className="nav-link profile ms-lg-auto" style={{marginLeft: 30}} onClick={()=> setHandleClose(false)}>{name}</Link>
                                <Link className="nav-link header" onClick={handleLogout}>Выход</Link>
                                
                            </>
                            
                        ) : 
                            < >
                                <Link to="/login" className="nav-link profile ms-3 ms-lg-auto mt-lg-0" onClick={()=> setHandleClose(false)}>
                                    Вход
                                </Link>
                                <Link to="/registration" className="nav-link profile ms-3" onClick={()=> setHandleClose(false)}>
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