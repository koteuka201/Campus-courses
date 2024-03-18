import React, { useState, useEffect } from "react";
import {Row,Col, Container, Button, Alert,  CardTitle,Form, FormCheck, FormGroup, FormControl, Modal, ModalHeader,ModalFooter,ModalBody,ModalTitle, FormLabel } from 'react-bootstrap';
import { getRoles, getGroupCourses, getGroups } from "../services/apiService";
import { Navigate, useNavigate,useParams  } from "react-router-dom";
import CourseCard from "../components/courseCard";

export default function GroupCoursesPage(){

    const { id } = useParams();
    
    const [courses, setCourses]=useState([])
    const [isRequested, setIsRequested]=useState(false)
    const [groupName, setGroupName]=useState('')
    const [showModal, setShowModal]=useState(false)

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
            setIsRequested(true)
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
                <Button className="mt-1" onClick={() => setShowModal(true)} >Создать курс</Button>
            ):(
                <></>
            )}
            {courses.length>0 ? (
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
            ) : (
                isRequested===true ? (
                    <div className="text-danger text-center mt-4 fw-bold fs-3">
                        Курсы еще не были созданы
                    </div>
                ):(
                    <></>
                )
            )}
            <Modal show={showModal} onHide={()=> setShowModal(false)} className="modal-xl"> 
                <ModalHeader closeButton>
                    <ModalTitle>Создание курса</ModalTitle>
                    
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup className="mb-3">
                            <FormLabel>Название курса</FormLabel>
                            <FormControl placeholder="Введите название курса"></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>god</FormLabel>
                            <FormControl placeholder="god"></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>obshee mest</FormLabel>
                            <FormControl placeholder="mesta"></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>semestr</FormLabel>
                            <div>
                                <FormCheck
                                    inline
                                    type="radio"
                                    label="Осенний"
                                    name="filter"
                                    value="Spring"
                                    
                                    // onChange={handleOptionChange}
                                />
                                <FormCheck
                                    inline
                                    type="radio"
                                    label="Весенний"
                                    name="filter"
                                    value="Autumn"
                                    
                                    // onChange={handleOptionChange}
                                />
                        </div>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Требования</FormLabel>
                            <FormControl as='textarea'></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Аннотация</FormLabel>
                            <FormControl as='textarea'></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Основной преподаватель курса</FormLabel>
                            <div>сделать селект/селект2 хз</div>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Отмена</Button>
                    <Button variant="primary">Сохранить</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}