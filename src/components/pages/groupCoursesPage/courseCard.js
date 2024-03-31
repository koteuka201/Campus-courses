import React from "react";
import {Col, Card, CardBody,  CardTitle } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function CourseCard({ id, name,startYear, roles, maximumStudentsCount, remainingSlotsCount, status,semester}){

    

    return(
        
            <Card>
                <CardBody className="">
                    <CardTitle className="row">
                        <Link to={`/courses/${id}`} className="col-sm-10 fs-5 fw-bold text-decoration-none text-dark">{name}</Link>
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