import React, { useState, useEffect } from "react";
import '../../../styles/tab.css'
import {Container, Button,CardTitle, Tab, Tabs  } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import TeachersList from "./teacherList";
import StudentsList from "./studentsList";

export default function CourseCommunityTabbed({id,roles, teachers,students}){
    
    return(
        <Tabs 
            defaultActiveKey="teachers"
            fill
            className="custom-tabs mt-4"
        >
            <Tab eventKey="teachers" className="border border-top-0" title='Преподаватели'>
                {/* добавить мейн тич */}
                {roles.isAdmin ? (
                    <Button className="ms-3">Добавить преподавателя</Button>
                ) : (
                    <></>
                )}
                {!teachers ? (
                    <></>
                ) : (
                    <div >
                        {teachers.map(teacher=>(
                            <TeachersList
                                key={teacher.email}
                                name={teacher.name}
                                email={teacher.email}
                                isMain={teacher.isMain}
                            />
                        ))}
                    </div>
                )}
            </Tab>
            <Tab eventKey="students" className="border border-top-0" title='Студенты'>
                 {!students ? (
                    <div className="fs-3 text-danger fw-bold">Студентов нет</div>
                ) : (
                    <div >
                        {students.map(student=>(
                            <StudentsList
                                key={student.email}
                                id={student.id}
                                name={student.name}
                                email={student.email}
                                status={student.status}
                                midtermResult={student.midtermResult}
                                finalResult={student.finalResult}
                            />
                        ))}
                    </div>
                )}
            </Tab>
        </Tabs>
    )
}