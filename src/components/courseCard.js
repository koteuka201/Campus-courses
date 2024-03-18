import React, { useState, useEffect } from "react";
import {Row,Col, Container, Button, Alert, Card, CardBody,  FormControl,  Modal, ModalHeader,ModalFooter,ModalBody,ModalTitle, CardTitle } from 'react-bootstrap';
import { getProfile, putProfile } from "../services/apiService";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { dateConvertor } from "../helpers/dateConverter";

export default function CourseCard({ id, name,startYear, isAdmin, maximumStudentsCount, remainingSlotsCount, status,semester}){

    

    return(
        
            <Card>
                <CardBody className="">
                    <CardTitle className="row">
                        <Col sm={10} className="fs-5 fw-bold ">{name}</Col>
                        <Col sm={2} className={
                            `${status === 'Finished' ? 'text-danger' :
                            status === 'Created' ? 'text-secondary' :
                            status === 'Started' ? 'text-primary' :
                            status === 'OpenForAssigning' ? 'text-success' :
                            ''} fw-bold fs-6 text-end`
                        }>
                            {status === 'Finished' ? 'Закрыт' :
                            status === 'Created' ? 'Создан' :
                            status === 'Started' ? 'В процессе обучения' :
                            status === 'OpenForAssigning' ? 'Открыт для записи' :
                            ''}
                        </Col>
                    </CardTitle>
                    <div>
                        Учебный год - {startYear}
                    </div>
                    <div>
                        Семестр - {semester==='Autumn' ? 'Весенний' : semester==='Spring' ? 'Осенний' : ''}
                    </div>
                    <div style={{opacity: 0.7}}>
                        Мест всего - {maximumStudentsCount}
                    </div>
                    <div style={{opacity: 0.7}}>
                        Мест свободно - {remainingSlotsCount}
                    </div>
                </CardBody>
            </Card>
            
      
    )
}