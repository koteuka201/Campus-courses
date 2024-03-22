import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import ReactSelect from 'react-select';
import 'react-quill/dist/quill.snow.css';
import {Container, Button, Alert,ListGroup , Tab, Tabs, CardTitle,Form, FormCheck, FormGroup, FormControl, Modal, ModalHeader,ModalFooter,ModalBody,ModalTitle, FormLabel, Col, Card, CardBody, Row } from 'react-bootstrap';
import { getRoles, getCourseDetails} from "../services/apiService";
import { useNavigate,useParams  } from "react-router-dom";
import CourseTabbed from "../components/courseDetails/courseTabbed";

export default function CourseDetailsPage(){

    const { id } = useParams();
    
    const [details,setDetails]=useState([])
    const [roles,setRoles]=useState({})
    
    useEffect(()=>{
        getRole()
        GetCourseDetails()
    },[])

    const token=localStorage.getItem('token')

    async function getRole(){
        const response = await getRoles(token)
        if(response){
            setRoles(response) 
        }
    }
    async function GetCourseDetails(){
        
        const response = await getCourseDetails(token,id)
        if(response){
            
            setDetails(response)
        }
    }
    return(
        <Container style={{marginTop: '110px'}}>
            <CardTitle className="fs-1 mb-3">{details.name}</CardTitle>
            <Row>
                <Col sm={4} className="fs-4">Основные данные курса</Col>
                {roles.isAdmin || roles.isTeacher ? (
                    <Col sm={8} className="text-end">
                        <Button variant="warning">Редактировать</Button>
                    </Col>
                ) :(
                    <></>
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
                            {roles.isAdmin || roles.isTeacher ? (
                                <Button variant="warning">Изменить</Button>
                            ):(
                                <Button variant="success">Записаться на курс</Button>
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
                key={id}
                roles={roles}
                requirements={details.requirements}
                annotations={details.annotations}
                notifications={details.notifications}
            />
            
            
                           
        </Container>
    )
}