import React, { useState, useEffect } from "react";
import ReactSelect from 'react-select';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalTitle, Form, FormGroup, FormLabel, FormCheck, FormControl } from 'react-bootstrap';
import { addTeacherCourse } from "../../../services/apiService";
export default function AddTeacherCourseModal ({id, show, handleClose,users,updateTeachers }){
    
    const [teacherId,setTeacherId]=useState('')

    const handleAddTeacher=async ()=>{
        const response=await addTeacherCourse(localStorage.getItem('token'),id,teacherId)
    }

    return (

        <Modal show={show} onHide={handleClose} className="modal-xl">
            <ModalHeader closeButton>
                <ModalTitle>
                    Добавление преподавателя на курс
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup className="mb-3">
                        <FormLabel>Основной преподаватель курса</FormLabel>
                        {Array.isArray(users) ? (
                            <ReactSelect
                                options={users.map(user => ({ value: user.id, label: user.fullName }))}
                                onChange={(e) => setTeacherId(e.value)}
                                value={teacherId ?
                                    { value: teacherId, label: users.find(user => user.id === teacherId)?.fullName || '' } :
                                    null
                                }
                                isSearchable={true}
                            />
                        ) : ( <></>)}
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>Отмена</Button>

                    <Button variant="primary" type="OnSubmit" onClick={handleAddTeacher}>Сохранить</Button>
                    
                </ModalFooter>
        </Modal>
    );
}
