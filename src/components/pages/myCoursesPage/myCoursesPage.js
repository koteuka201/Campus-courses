import React, { useState, useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import {Container, CardTitle} from 'react-bootstrap';
import { getRoles, getMyCourses } from "../../../services/apiService";
import CourseCard from "../groupCoursesPage/courseCard";
import { Loader } from "../../layouts/loader/loader";


export default function MyCoursesPage(){

    const [loading,setLoading]=useState(false)
    const [courses, setCourses]=useState([])
    const [roles,setRoles]=useState({})

    useEffect(()=>{
        getRole()
        GetMyCourses()
    },[])

    const token=localStorage.getItem('token')
    
    async function getRole(){
        const response = await getRoles(token)
        if(response){
            setRoles({response})
        }
        
    }

    async function GetMyCourses(){
        setLoading(true)
        const response=await getMyCourses(token)
        if(response){
            
            setCourses(response)
        }
        setLoading(false)
    }

    if(loading){
        return <Loader/>
    }

    return(
        <Container style={{marginTop: '110px'}}>
            <CardTitle className="fs-3">Мои курсы</CardTitle>
            {courses.length ? (
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
            ) : (
                <span className="text-center fw-bold text-danger fs-3">Курсов еще нет</span>
            )}
            
        </Container>
    )
}