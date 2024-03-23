import React, { useState, useEffect } from "react";

import {Container, ButtonCardTitle, Row,col, Button, Col  } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function StudentsList({id, name, email, status,midtermResult, finalResult}){

    return(
        <Container className="border-bottom">
            <Row className="mb-2 ms-2">
                <Col sm={4}>
                    <div>{name}</div>
                    <div>
                        <span style={{opacity: 0.7}}>Статус</span> - <span className={
                            `${status === 'Accepted' ? 'text-success' :
                            status==='Declined ' ? 'text-danger' :
                            status==='InQueue' ? 'text-primary' : ''
                        }`} >
                            {status === 'Accepted' ? 'принят в группу' :
                            status==='Declined' ? 'отклонен' :
                            status==='InQueue' ? 'в очереди' : ''}
                        </span>
                    </div>
                    <div style={{opacity: 0.7}}>{email}</div>
                </Col>
                <Col sm={4}>
                    {status==='Accepted' ? (
                        <div>
                            Промежуточная аттестация - {midtermResult==='Passed' ? (
                                <span className="rounded bg-success ms-1 text-white">
                                    Успешно пройдена
                                </span>
                            ) : (midtermResult==='Failed ' ? (
                                <span className="rounded bg-danger ms-1 text-white">
                                    Зафейлена
                                </span>
                            ) : (
                                <span className="rounded bg-secondary ms-1 text-white">
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
                            Финальная аттестация - {midtermResult==='Passed' ? (
                                <span className="rounded bg-success ms-1 text-white">
                                    Успешно пройдена
                                </span>
                            ) : (midtermResult==='Failed ' ? (
                                <span className="rounded bg-danger ms-1 text-white">
                                    Зафейлена
                                </span>
                            ) : (
                                <span className="rounded bg-secondary ms-1 text-white">
                                    Нет отметки
                                </span> 
                            ))}
                        </div>
                    ) : (status==='InQueue' ? (
                        <div className="text-end ">
                            
                            <Button className="me-1">Принять</Button>
                            
                            
                            <Button variant="danger">Отклонить заявку</Button>
                            
                        </div>
                    ) : (<></>))}
                </Col>
            </Row>
            
        </Container>
    )
}