import React, { useState, useEffect } from "react";
import { Button, ListGroup ,  Col,  Row } from 'react-bootstrap';
import { signUpForCourse } from "../../../services/apiService";
import StatusCourseModal from "./courseDetailsModals/statusCourseModal";

export default function CourseMainInfo({id,roles, details, isCourseTeacher, isCourseStudent, updatePage, toast,isRolesGot}){

    const [showStatusModal,setShowStatusModal]=useState(false)

    async function handleSignUp(){
        const loadingToast = toast.loading('Записываем вас на курс...')
        const response = await signUpForCourse(localStorage.getItem('token'),id)
        toast.dismiss(loadingToast.id)
        
        if(response===''){
            await updatePage()
            toast.success('Ваша заявка принята!')
        }
        else{
            toast.error('Похоже, что ваша заявка уже на рассмотрении!')
        }
    }

    return(

        <>
        
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
                                roles.isAdmin || isCourseTeacher ? (
                                    <Button variant="warning" onClick={()=> setShowStatusModal(true)}>Изменить</Button>
                                ):(
                                    isCourseStudent ? (
                                        <></>
                                    ) : (
                                        details.status==='OpenForAssigning'?(
                                            <Button variant="success" onClick={handleSignUp}>Записаться на курс</Button>
                                        ) : (
                                            <></>
                                        )
                                    )
                                    
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
            <StatusCourseModal
                token={localStorage.getItem('token')}
                id={id}
                status={details.status}
                show={showStatusModal}
                handleClose={()=> setShowStatusModal(false)}
                updateStatus={updatePage}
                toast={toast}
            />
        </>
    );

}