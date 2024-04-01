import React, { useState } from "react";
import '../../../../styles/tab.css'
import {Button,Tab, Tabs  } from 'react-bootstrap';
import TeachersList from "./teacherList";
import StudentsList from "./studentsList";
import AddTeacherCourseModal from '../courseDetailsModals/addTeacherCourseModal'
export default function CourseCommunityTabbed({id,roles, teachers,students,users,isMainTeacher, updateTeachers, isCourseStudent,currentUserName,isCourseTeacher, toast}){
    
    const [showModal,setShowModal]=useState(false)
    
    return(
        <>
            <Tabs 
            defaultActiveKey="teachers"
            fill
            className="custom-tabs mt-4"
            >
                <Tab eventKey="teachers" className="border border-top-0" title='Преподаватели'>
                    {roles.isAdmin || isMainTeacher ? (
                        <Button className="ms-3" onClick={()=>setShowModal(true)}>Добавить преподавателя</Button>
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
                                    courseId={id}
                                    name={student.name}
                                    email={student.email}
                                    status={student.status}
                                    midtermResult={student.midtermResult}
                                    finalResult={student.finalResult}
                                    updatePage={updateTeachers}
                                    isCourseStudent={isCourseStudent}
                                    currentUserName={currentUserName}
                                    isCourseTeacher={isCourseTeacher}
                                    isAdmin={roles.isAdmin}
                                    toast={toast}
                                />
                            ))}
                        </div>
                    )}
                </Tab>
            </Tabs>
            <AddTeacherCourseModal
                id={id}
                show={showModal}
                handleClose={()=>setShowModal(false)}
                users={users}
                updateTeachers={updateTeachers}
                toast={toast}
                students={students}
            />      
        </>
    )
}