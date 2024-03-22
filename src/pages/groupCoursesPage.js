import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import ReactSelect from 'react-select';
import 'react-quill/dist/quill.snow.css';
import {Container, Button, Alert,  CardTitle,Form, FormCheck, FormGroup, FormControl, Modal, ModalHeader,ModalFooter,ModalBody,ModalTitle, FormLabel } from 'react-bootstrap';
import { getRoles, getGroupCourses, getGroups, getUsers,createCourse } from "../services/apiService";
import { Navigate, useNavigate,useParams  } from "react-router-dom";
import CourseCard from "../components/courseCard";

export default function GroupCoursesPage(){

    const { id } = useParams();
    
    const [users, setUsers]=useState([])
    const [courses, setCourses]=useState([])
    const [isRequested, setIsRequested]=useState(false)
    const [groupName, setGroupName]=useState('')
    const [showModal, setShowModal]=useState(false)
    const [roles,setRoles]=useState({
        isStudent: '',
        isTeacher: '',
        isAdmin: ''
    })
    const [courseData, setCourseData]=useState({
        name: "",
        startYear: "",
        maximumStudentsCount: "",
        semester: "",
        requirements: "",
        annotations:"",
        mainTeacherId: ""
    })

    useEffect(()=>{
        getRole()
        GetGroupCourses()
        getGroupName()
        getUsersList()
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

    async function getUsersList(){
        const response = await getUsers(token)
        if(response){
            
            setUsers(response)
            
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

    async function handleCreateCourse(){
        if (courseData.name !== "" && 
        courseData.startYear !== "" && 
        courseData.maximumStudentsCount !== "" && 
        courseData.semester !== "" && 
        courseData.requirements !== "" && 
        courseData.annotations !== "" && 
        courseData.mainTeacherId !== ""){
            const response = await createCourse(token, id, 
                courseData.name, 
                courseData.startYear, 
                courseData.maximumStudentsCount,
                courseData.semester, 
                courseData.requirements, 
                courseData.annotations, 
                courseData.mainTeacherId)
            if(response){
                setShowModal(false)
                GetGroupCourses()
            }
        }
    }    

    const modules = {
        toolbar: [
            [{ header: [false, 1, 2, 3] }, { font: [] },{ size: [] }],
            [{ color: [] }, 'bold', 'italic', 'underline', 'strike', 'blockquote','code-block'],
            [{ align: [] }, { 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
        ]
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
                        roles={roles}
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
                            <FormControl value={courseData.name} onChange={(e)=> setCourseData({...courseData,name: e.target.value})} placeholder="Введите название курса"></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Год начала курса</FormLabel>
                            <FormControl value={courseData.startYear} onChange={(e)=> setCourseData({...courseData, startYear: e.target.value})} placeholder="Введите год" type="number"></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel >Общее количестов мест</FormLabel>
                            <FormControl value={courseData.maximumStudentsCount} onChange={(e)=> setCourseData({...courseData,maximumStudentsCount: e.target.value})} placeholder="Введите количество мест" type="number"></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Семестр</FormLabel>
                            <div>
                                <FormCheck
                                    inline
                                    type="radio"
                                    label="Осенний"
                                    name="filter"
                                    value="Spring"
                                    checked={courseData.semester === "Spring"}
                                    onChange={(e)=> 
                                        setCourseData({
                                            ...courseData,
                                            semester: e.target.value
                                        })
                                    }
                                />
                                <FormCheck
                                    inline
                                    type="radio"
                                    label="Весенний"
                                    name="filter"
                                    value="Autumn"
                                    checked={courseData.semester === "Autumn"}
                                    onChange={(e)=> 
                                        setCourseData({
                                            ...courseData,
                                            semester: e.target.value
                                        })
                                    }
                                />
                        </div>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Требования</FormLabel>
                            <ReactQuill modules={modules} value={courseData.requirements} onChange={(e)=> setCourseData({...courseData, requirements: e})} theme="snow" />

                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Аннотация</FormLabel>
                            <ReactQuill modules={modules} value={courseData.annotations} onChange={(e)=> setCourseData({...courseData, annotations: e})} theme="snow" />
                            
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Основной преподаватель курса</FormLabel>
                            {Array.isArray(users) ? (
                                <ReactSelect
                                    options={users.map(user => ({ value: user.id, label: user.fullName }))}
                                    onChange={(e) => setCourseData({...courseData, mainTeacherId: e.value})}
                                    value={courseData.mainTeacherId ? 
                                        { value: courseData.mainTeacherId, 
                                        label: users.find(user => user.id === courseData.mainTeacherId)?.fullName || '' 
                                        } : 
                                        null}
                                    isSearchable={true}
                                />
                            ) : ( <></>)}
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Отмена</Button>
                    <Button variant="primary" type="submit" onClick={handleCreateCourse}>Сохранить</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}