import React, { useState, useEffect } from "react";
import {Row,Col, Container, Button, Alert,  CardTitle,Form, FormGroup, FormControl, Modal, ModalHeader,ModalFooter,ModalBody,ModalTitle } from 'react-bootstrap';
import { getRoles, getGroupCourses, getGroups } from "../services/apiService";
import { Navigate, useNavigate,useParams  } from "react-router-dom";
import CourseCard from "../components/courseCard";

export default function GroupCoursesPage(){

    const { id } = useParams();
    
    const [courses, setCourses]=useState([])
    
    const [groupName, setGroupName]=useState('')


    const [roles,setRoles]=useState({
        isStudent: '',
        isTeacher: '',
        isAdmin: ''
    })
    const token=localStorage.getItem('token')

    useEffect(()=>{
        getRole()
        GetGroupCourses()
        getGroupName()
    },[])
    
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
    
    async function GetGroupCourses(){
        
        const response=await getGroupCourses(token,id)
        if(response){
            setCourses(response)
        }
    }

    async function getGroupName(){
        const response=await getGroups(token)
        if(response){
            
            setGroupName((response.find(group => group.id === id)).name)
        }
    }


    return(
        <Container style={{marginTop: '110px'}}>
            <CardTitle className="fs-3">Группа - {groupName}</CardTitle>
            {roles.isAdmin ? (
                <Button className="mt-1" >Создать курс</Button>
            ):(
                <></>
            )}
            <div className="mt-4">
            {courses.map(course=>(
                <CourseCard
                    key={course.id}
                    id={course.id}
                    name={course.name}
                    startYear={course.startYear}
                    isAdmin={roles.isAdmin}
                    maximumStudentsCount={course.maximumStudentsCount}
                    remainingSlotsCount={course.remainingSlotsCount}
                    status={course.status}
                    semester={course.semester} 
                />
            ))}
            </div>
        </Container>
    )
}