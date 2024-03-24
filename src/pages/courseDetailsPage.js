import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import ReactSelect from 'react-select';
import 'react-quill/dist/quill.snow.css';
import {Container, Button, Alert,ListGroup , Tab, Tabs, CardTitle,Form, FormCheck, FormGroup, FormControl, Modal, ModalHeader,ModalFooter,ModalBody,ModalTitle, FormLabel, Col, Card, CardBody, Row } from 'react-bootstrap';
import { getRoles, getCourseDetails, getProfile, deleteCourse} from "../services/apiService";
import { useNavigate,useParams  } from "react-router-dom";
import CourseTabbed from "../components/courseDetails/courseTabbed";
import CourseCommunityTabbed from "../components/courseDetails/courseCommunity/courseCommunityTabbed";
import CreateEditCourseModal from "../components/generalModals/createEditCourseModal";

export default function CourseDetailsPage(){


    const { id } = useParams()

    const navigate=useNavigate()
    const [isCourseTeacher, setIsCourseTeacher]=useState(false)
    const [isRolesGot, setIsRolesGot]=useState(false)

    // const [profile,setProfile]=useState([])
    const [showModal, setShowModal] = useState(false)
    const [details,setDetails]=useState([])
    const [roles,setRoles]=useState({})
    
    useEffect(()=>{
        GetCourseDetails()
        getRole()
        
    },[])

    useEffect(()=>{
        if(details.name){
            GetProfile()
        }
        
    },[details])
    const token=localStorage.getItem('token')

    async function getRole(){
        const response = await getRoles(token)
        if(response){
            
            setRoles(response) 
            setIsRolesGot(true)
        }
    }
    async function GetCourseDetails(){
        
        const response = await getCourseDetails(token,id)
        if(response){
            
            setDetails(response)
        }
    }
    async function GetProfile(){
        const response = await getProfile(token)
        if(response){
            
            if(details.teachers.find(teacher => teacher.name===response.fullName)){
                
                setIsCourseTeacher(true)
            }
        }
    }
    async function handleDeleteCourse(){
        const response = await deleteCourse(token,id)
        if(response){
            navigate(-1)
        }
    }
    return(
        <Container style={{marginTop: '110px'}}>
            <CardTitle className="fs-1 mb-3">{details.name}</CardTitle>
            <Row>
                <Col sm={4} className="fs-4">Основные данные курса</Col>
                {roles.isAdmin ? (
                    <Col sm={8} className="text-end">
                        <Button variant="warning" onClick={() => setShowModal(true)}>Редактировать</Button>
                        <Button variant="danger" className="ms-1" onClick={handleDeleteCourse}>Удалить</Button>
                    </Col>
                ) :(
                    isCourseTeacher ? (
                        <Col sm={8} className="text-end">
                            <Button variant="warning" onClick={() => setShowModal(true)}>Редактировать</Button>
                        </Col>
                        ) : (
                        <></>
                    )
                    
                )}
            </Row>
            <ListGroup className="mt-2">
                <ListGroup.Item>
                    <Row>
                        <Col sm={6}>
                            <div className="fw-bold">
                                Статус курса
                            </div>
                            <div sm={2} className={
                                `${details.status === 'Finished' ? 'text-danger' :
                                details.status === 'Created' ? 'text-secondary' :
                                details.status === 'Started' ? 'text-primary' :
                                details.status === 'OpenForAssigning' ? 'text-success' :
                                ''} fs-6`
                            }>
                                {details.status === 'Finished' ? 'Закрыт' :
                                details.status === 'Created' ? 'Создан' :
                                details.status === 'Started' ? 'В процессе обучения' :
                                details.status === 'OpenForAssigning' ? 'Открыт для записи' :
                                ''}
                            </div>
                        </Col>
                        <Col sm={6} className="text-end">
                            {isRolesGot ? (
                                roles.isAdmin || roles.isTeacher ? (
                                    <Button variant="warning">Изменить</Button>
                                ):(
                                    <Button variant="success">Записаться на курс</Button>
                                )
                            ) : (
                                <></>
                            )}
                            
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col sm={6}>
                            <div className="fw-bold">
                                Учебный год
                            </div>
                            {details.startYear}
                        </Col>
                        <Col sm={6}>
                            <div className="fw-bold">
                                Cеместр
                            </div>
                            {details.semester==='Autumn' ? 'Весенний' :
                             details.semester==='Spring' ? 'Осенний' : ''}
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col sm={6}>
                            <div className="fw-bold">
                                Всего мест
                            </div>
                            {details.maximumStudentsCount}
                        </Col>
                        <Col sm={6}>
                            <div className="fw-bold">
                                Студентов зачислено
                            </div>
                            {details.studentsEnrolledCount}
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className="fw-bold">
                        Заявок на рассмотрении
                    </div>
                    {details.studentsInQueueCount}
                </ListGroup.Item>
            </ListGroup>
            
            <CourseTabbed
                id={id}
                roles={roles}
                requirements={details.requirements}
                annotations={details.annotations}
                notifications={details.notifications}
            />
            <CourseCommunityTabbed
                id={id}
                roles={roles}
                teachers={details.teachers}
                students={details.students}
            />
            <CreateEditCourseModal
                type={'edit'}
                isTeacher={isCourseTeacher}
                roles={roles}
                show={showModal}
                handleClose={() => setShowModal(false)}
                token={token}
                id={id}
                updateCourses={GetCourseDetails}
            />
                           
        </Container>
    )
}