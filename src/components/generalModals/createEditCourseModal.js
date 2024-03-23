import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import ReactSelect from 'react-select';
import 'react-quill/dist/quill.snow.css';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalTitle, Form, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import { createCourse, getUsers,getCourseDetails,editCourseDetails } from "../../services/apiService";
export default function CreateEditCourseModal ({type,roles, show, handleClose, token, id, updateCourses }){
    
    const [users, setUsers] = useState([])
    const [mainTeacher, setMainTeacher]=useState('')
    const [courseData, setCourseData] = useState({
        name: "",
        startYear: "",
        maximumStudentsCount: "",
        semester: "",
        requirements: "",
        annotations: "",
        mainTeacherId: ""
    })

    useEffect(() => {
        getUsersList()
        
        if(type==='edit'){
            GetCourseDetails()
        }
        
    }, [])

    async function getUsersList() {
        const response = await getUsers(token)
        if (response) {
            setUsers(response)
        }
    }

    async function GetCourseDetails(){
        
        const response = await getCourseDetails(token,id)
        if(response){
            
            setCourseData({
                ...courseData,
                name: response.name,
                startYear: response.startYear,
                maximumStudentsCount: response.maximumStudentsCount,
                semester: response.semester,
                requirements: response.requirements,
                annotations: response.annotations,
                mainTeacherId: response.teachers
            })
            
            setMainTeacher((response.teachers.find(teacher => teacher.isMain)).name)
        }
        
    }

    async function handleCreateCourse() {
        if (courseData.name !== "" &&
            courseData.startYear !== "" &&
            courseData.maximumStudentsCount !== "" &&
            courseData.semester !== "" &&
            courseData.requirements !== "" &&
            courseData.annotations !== "" &&
            courseData.mainTeacherId !== "") {
            const response = await createCourse(token, id,
                courseData.name,
                courseData.startYear,
                courseData.maximumStudentsCount,
                courseData.semester,
                courseData.requirements,
                courseData.annotations,
                courseData.mainTeacherId)
            if (response) {
                handleClose()
                updateCourses()
            }
        }
    }
    async function handleEditCourse() {
        if (courseData.name !== "" &&
            courseData.startYear !== "" &&
            courseData.maximumStudentsCount !== "" &&
            courseData.semester !== "" &&
            courseData.requirements !== "" &&
            courseData.annotations !== "" &&
            courseData.mainTeacherId !== "") {
            const response = await editCourseDetails(token, id,
                courseData.name,
                courseData.startYear,
                courseData.maximumStudentsCount,
                courseData.semester,
                courseData.requirements,
                courseData.annotations,
                courseData.mainTeacherId)
            if (response) {
                handleClose()
                updateCourses()
            }
        }
    }



    const modules = {
        toolbar: [
            [{ header: [false, 1, 2, 3] }, { font: [] }, { size: [] }],
            [{ color: [] }, 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ align: [] }, { 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
        ]
    };

    return (
        <Modal show={show} onHide={handleClose} className="modal-xl">
            <ModalHeader closeButton>
                {type==='create' ? (
                    <ModalTitle>
                        Создание курса
                    </ModalTitle>
                ) : (
                    <ModalTitle>
                        Редактирование курса
                    </ModalTitle>
                )}
                
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
                                    { value: courseData.mainTeacherId, label: users.find(user => user.id === courseData.mainTeacherId)?.fullName || '' } :
                                    null
                                }
                                isSearchable={true}
                            />
                        ) : ( <></>)}
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={handleClose}>Отмена</Button>
                {type==='create' ? (
                    <Button variant="primary" type="OnSubmit" onClick={handleCreateCourse}>Сохранить</Button>

                ) : (
                    <Button variant="primary" type="OnSubmit" onClick={handleEditCourse}>Сохранить</Button>
                )}
            </ModalFooter>
        </Modal>
    );
}
