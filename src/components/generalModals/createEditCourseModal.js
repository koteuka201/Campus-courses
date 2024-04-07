import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import ReactSelect from 'react-select';
import 'react-quill/dist/quill.snow.css';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalTitle, Form, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import { createCourse, getCourseDetails, editCourseDetails, editCourseTeacherDetails } from "../../apiServices/courseService";
import { getUsers } from "../../apiServices/usersService";
import { isFieldEmpty } from "../../helpers/isFieldEmpty";

export default function CreateEditCourseModal ({type,isTeacher,roles, show, handleClose, token, id, updateCourses,toast,isMainTeacher }){
    
    const [startYeatValid,setStartYeatValid]=useState(true)
    const [amountValid,setAmoutValid]=useState(true)
    const [isEmpty, setIsEmpty]=useState(false)
    
    const [users, setUsers] = useState([])
    const [usersGot,setUsersGet]=useState(false)
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
        setUsersGet(false)
        getUsersList()
        
    },[])
    useEffect(()=>{
        if(type==='edit' && usersGot){
            GetCourseDetails()
        }
    }, [usersGot])

    useEffect(() => {
        checkStudentCount(courseData.maximumStudentsCount)
        checkStartYear(courseData.startYear)
    },[courseData.maximumStudentsCount,courseData.startYear])

    async function getUsersList() {
        const response = await getUsers(token)
        if (response) {
            
            setUsers(response)
            setUsersGet(true)
        }
    }

    async function GetCourseDetails(){
        
        const response = await getCourseDetails(token,id)
        
        if(response && Array.isArray(users)){
            
            const mainTeacherName=users.find(user => user.fullName === response.teachers.find(teacher => teacher.isMain)?.name)
            
            let teacherId
            if (mainTeacherName) {
                teacherId = mainTeacherName.id;
            }
            
            setCourseData({
                ...courseData,
                name: response.name,
                startYear: response.startYear,
                maximumStudentsCount: response.maximumStudentsCount,
                semester: response.semester,
                requirements: response.requirements,
                annotations: response.annotations,
                mainTeacherId: teacherId
            })
            
        }
        else{
            if((response && !isMainTeacher)){
            
                setCourseData({
                    ...courseData,
                    name: response.name,
                    startYear: response.startYear,
                    maximumStudentsCount: response.maximumStudentsCount,
                    semester: response.semester,
                    requirements: response.requirements,
                    annotations: response.annotations,
                    mainTeacherId: ''
                })
            }
        }
        
    }

    async function handleCreateCourse() {
        if (courseData.name !== "" &&
            courseData.startYear !== "" &&
            courseData.maximumStudentsCount !== "" &&
            courseData.semester !== "" &&
            courseData.requirements !== "" &&
            courseData.annotations !== "" &&
            courseData.mainTeacherId !== "" && amountValid) {
            setIsEmpty(false)
            const loadingToast = toast.loading('Создание курса...')   
            const response = await createCourse(token, id,
                courseData.name,
                courseData.startYear,
                courseData.maximumStudentsCount,
                courseData.semester,
                courseData.requirements,
                courseData.annotations,
                courseData.mainTeacherId)
            toast.dismiss(loadingToast.id)
                
            if (Array.isArray(response)) {

                
                await updateCourses()
                handleClose()
                toast.success('Курс создан!')
            }
            if(!Array.isArray(response)){
                toast.error('Не удалось создать курс!')
            }
        }
        else{
            
            setIsEmpty(true)
        }
    }
    async function handleEditCourse() {
        if (courseData.name !== "" &&
            courseData.startYear !== "" &&
            courseData.maximumStudentsCount !== "" &&
            courseData.semester !== "" &&
            courseData.requirements !== "" &&
            courseData.annotations !== "" &&
            courseData.mainTeacherId !== "" && amountValid) {
            setIsEmpty(false)
            const loadingToast = toast.loading('Сохранение деталей курса...')
            const response = await editCourseDetails(token, id,
                courseData.name,
                courseData.startYear,
                courseData.maximumStudentsCount,
                courseData.semester,
                courseData.requirements,
                courseData.annotations,
                courseData.mainTeacherId)
            toast.dismiss(loadingToast.id)
            if (response.id) {
                
                await updateCourses()
                handleClose()
                toast.success('Курс обновлен!')
            }
            if(!response.id){
                toast.error('Не удалось обновить курс!')
            }
            
        }
        else{
            setIsEmpty(true)
        }
    }
    async function handleEditTeacherCourse() {
        if (courseData.requirements !== "" &&
            courseData.annotations !== "") {
            setIsEmpty(false)
            const loadingToast = toast.loading('Сохранение деталей курса...')
            const response = await editCourseTeacherDetails(token, id,
                courseData.requirements,
                courseData.annotations)
            toast.dismiss(loadingToast.id)
            if (response) {
                
                await updateCourses()
                handleClose()
                toast.success('Курс обновлен!')
            }
            if(!response.id){
                toast.error('Не удалось обновить курс!')
            }
        }
        else{
            setIsEmpty(true)
        }
    }

    function checkStudentCount(number){
        if(number<1 || number>200){
            setAmoutValid(false)
        }
        else{
            setAmoutValid(true)
        }
    }

    function checkStartYear(number){
        if(number<2000 || number>2029){
            setStartYeatValid(false)
        }
        else{
            setStartYeatValid(true)
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
        roles.isAdmin ? (
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
                            <FormControl className={courseData.name==='' && isEmpty ? 'border-danger' : ''} value={courseData.name} onChange={(e)=> setCourseData({...courseData,name: e.target.value})} placeholder="Введите название курса"></FormControl>
                            {isFieldEmpty(courseData.name,isEmpty)}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Год начала курса</FormLabel>
                            <FormControl className={!startYeatValid && isEmpty ? 'border-danger' : ''} value={courseData.startYear} onChange={(e)=> setCourseData({...courseData, startYear: e.target.value})} placeholder="Введите год" type="number"></FormControl>
                            {!startYeatValid && isEmpty ? (
                                <span className="text-danger">Год начала курса должен быть от 2000 до 2029</span>
                            ) : (
                                <></>
                            )}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel >Общее количестов мест</FormLabel>
                            <FormControl className={!amountValid && isEmpty ? 'border-danger' : ''} value={courseData.maximumStudentsCount} onChange={(e)=> setCourseData({...courseData,maximumStudentsCount: e.target.value})} placeholder="Введите количество мест" type="number"></FormControl>
                            {!amountValid && isEmpty ? (
                                <span className="text-danger">Количество мест должно быть от 1 до 200</span>
                            ) : (
                                <></>
                            )}
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
                            {!courseData.semester && isEmpty ? (
                                <span className="text-danger">Семестр должен быть выбран!</span>
                            ) : (
                                <></>
                            )}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Требования</FormLabel>
                            <ReactQuill modules={modules} value={courseData.requirements} onChange={(e)=> setCourseData({...courseData, requirements: e})} theme="snow" />
                            {isFieldEmpty(courseData.requirements,isEmpty)}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Аннотация</FormLabel>
                            <ReactQuill modules={modules} value={courseData.annotations} onChange={(e)=> setCourseData({...courseData, annotations: e})} theme="snow" />
                            {isFieldEmpty(courseData.annotations,isEmpty)}
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
                            {!courseData.mainTeacherId && isEmpty ? (
                                <span className="text-danger">Преподаватель должен быть выбран!</span>
                            ) : (
                                <></>
                            )}
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
        ) : (
            isTeacher ? (
                <Modal show={show} onHide={handleClose} className="modal-xl">
                    <ModalHeader closeButton>
                        <ModalTitle>
                            Редактирование курса
                        </ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup className="mb-3">
                                <FormLabel>Требования</FormLabel>
                                <ReactQuill modules={modules} value={courseData.requirements} onChange={(e)=> setCourseData({...courseData, requirements: e})} theme="snow" />
                                {isFieldEmpty(courseData.requirements,isEmpty)}
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormLabel>Аннотация</FormLabel>
                                <ReactQuill modules={modules} value={courseData.annotations} onChange={(e)=> setCourseData({...courseData, annotations: e})} theme="snow" />
                                {isFieldEmpty(courseData.annotations,isEmpty)}
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleClose}>Отмена</Button>
                        <Button variant="primary" type="OnSubmit" onClick={handleEditTeacherCourse}>Сохранить</Button>
                        
                    </ModalFooter>
                </Modal>
            ) : (
                <></>
            )
        )
        
    );
}
