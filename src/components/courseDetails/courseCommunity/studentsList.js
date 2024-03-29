import React, { useState} from "react";
import {Container, Row, Button, Col  } from 'react-bootstrap';
import SetMarkModal from "../courseDetailsModals/setMarkModal";
import { editStatusOfSignUp } from "../../../services/apiService";

export default function StudentsList({id,courseId, name, email, status,midtermResult, finalResult,updatePage,isCourseStudent,currentUserName,isCourseTeacher,isAdmin, toast}){

    const [showModal, setShowModal]=useState(false)
    const [modalProps, setModalProps] = useState({})

    

    async function handleFinalAttestation(){
        setShowModal(true)
        const propsForModal = {
            studentId: id,
            courseId: courseId,
            nameOfStudent: name,
            mark: finalResult,
            typeMark: 'Final',
            updateMarks: updatePage
            
        }
        
        setModalProps(propsForModal)
        
    }

    async function handleMidtermAttestation(){
        setShowModal(true)
        const propsForModal = {
            studentId: id,
            courseId: courseId,
            nameOfStudent: name,
            mark: midtermResult,
            typeMark: 'Midterm',
            updateMarks: updatePage
            
        }
        
        setModalProps(propsForModal)
        
    }

    async function handleAcceptRequest(){
        const status='Accepted'
        const response=await editStatusOfSignUp(localStorage.getItem('token'),id,courseId,status)
        if(response.id){
            updatePage()
        }
    }

    async function handleDeclineRequest(){
        const status='Declined'
        const response=await editStatusOfSignUp(localStorage.getItem('token'),id,courseId,status)
        if(response.id){
            updatePage()
        }
    }

    return(
        <Container className="border-bottom">
            
            <Row className="mb-2 ms-2">
                <Col sm={4}>
                    <div>{name}</div>
                    <div>
                        <span style={{opacity: 0.7}}>Статус</span> - <span className={
                            `${status === 'Accepted' ? 'text-success' :
                            status==='Declined' ? 'text-danger' :
                            status==='InQueue' ? 'text-primary' : ''
                        }`} >
                            {status === 'Accepted' ? 'принят в группу' :
                            status==='Declined' ? 'отклонен' :
                            status==='InQueue' ? 'в очереди' : ''}
                        </span>
                    </div>
                    <div style={{opacity: 0.7}}>{email}</div>
                </Col>
                {isAdmin || isCourseTeacher || (currentUserName===name)?(
                    <>
                    <Col sm={4}>
                        {status==='Accepted' ? (
                            <div>
                                <span style={{cursor: "pointer"}} onClick={handleMidtermAttestation}>Промежуточная аттестация -</span>
                                {midtermResult==='Passed' ? (
                                    <span className="badge bg-success ms-1 text-white">
                                        Успешно пройдена
                                    </span>
                                ) : (midtermResult==='Failed' ? (
                                    <span className="badge bg-danger ms-1 text-white">
                                        Зафейлена
                                    </span>
                                ) : (
                                    <span className="badge bg-secondary ms-1 text-white">
                                        Нет отметки
                                    </span> 
                                ))}
                            </div>
                            
                        ) :(
                            <></>
                        )}
                    </Col>
                    
                    <Col sm={4}>
                        {status==='Accepted' ? (
                            <div>
                                <span style={{cursor: "pointer"}} onClick={handleFinalAttestation}>Финальная аттестация -</span>
                                {finalResult==='Passed' ? (
                                    <span className="badge bg-success ms-1 text-white">
                                        Успешно пройдена
                                    </span>
                                ) : (finalResult==='Failed' ? (
                                    <span className="badge bg-danger ms-1 text-white">
                                        Зафейлена
                                    </span>
                                ) : (
                                    <span className="badge bg-secondary ms-1 text-white">
                                        Нет отметки
                                    </span> 
                                ))}
                            </div>
                        ) : (status==='InQueue' ? (
                            <div className="text-end ">
                                
                                <Button className="me-1" onClick={handleAcceptRequest}>Принять</Button>
                                
                                <Button variant="danger" onClick={handleDeclineRequest}>Отклонить заявку</Button>
                                
                            </div>
                        ) : (<></>))}
                    </Col>
                    </>
                    
                ):(
                    <></>
                )}

            </Row>
            <SetMarkModal
                {...modalProps}
                show={showModal}
                handleClose={()=>setShowModal(false)}
                toast={toast}
            />
        </Container>
    )
}