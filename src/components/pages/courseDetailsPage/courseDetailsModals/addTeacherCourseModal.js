import React, { useState } from "react";
import ReactSelect from 'react-select';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalTitle, Form, FormGroup, FormLabel } from 'react-bootstrap';
import { addTeacherCourse } from "../../../../services/apiService";
export default function AddTeacherCourseModal ({id, show, handleClose,users,updateTeachers,toast, students }){
    
    const [isEmpty, setIsEmpty]=useState(false)
    const [teacherId,setTeacherId]=useState('')

    const handleAddTeacher=async ()=>{
        if(teacherId!==''){
            setIsEmpty(false)
            const loadingToast = toast.loading('Добавление учителя...')
            const response=await addTeacherCourse(localStorage.getItem('token'),id,teacherId)
            toast.dismiss(loadingToast.id)
            if(response.id){
                await updateTeachers()
                handleClose()
                toast.success('Учитель добавлен!')
            }
            if(!response.id){
                toast.error('Не удалось добавить учителя!')
            }
        }
        else{
            setIsEmpty(true)
        }
        
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
                                options={users.filter(user => !students.some(student => student.id === user.id)).map(user => ({ value: user.id, label: user.fullName }))}                                onChange={(e) => setTeacherId(e.value)}
                                value={teacherId ?
                                    { value: teacherId, label: users.find(user => user.id === teacherId)?.fullName || '' } :
                                    null
                                }
                                isSearchable={true}
                            />
                        ) : ( <></>)}
                        {!teacherId && isEmpty ? (
                            <span className="text-danger">Преподаватель должен быть выбран!</span>
                        ) : (
                            <></>
                        )}
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
