import React, { useState, useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import {Container, CardTitle} from 'react-bootstrap';
import { getRoles,getTeachingCourses } from "../../../services/apiService";
import CourseCard from "../../courseCard";

export default function TeachingCoursesPage(){

    const [courses, setCourses]=useState([])
    const [roles,setRoles]=useState({
        isStudent: '',
        isTeacher: '',
        isAdmin: ''
    })

    useEffect(()=>{
        getRole()
        GetTeachingCourses()
    },[])

    const token=localStorage.getItem('token')
    
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

    async function GetTeachingCourses(){
        const response=await getTeachingCourses(token)
        if(response){
            setCourses(response)
        }
    }

    return(
        <Container style={{marginTop: '110px'}}>
            <CardTitle className="fs-3">Преподаваемые курсы</CardTitle>
            <div className="mt-4">
                    {courses.map(course=>(
                    <CourseCard
                        key={course.id}
                        id={course.id}
                        name={course.name}
                        startYear={course.startYear}
                        roles={roles}
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