import React, { useState, useEffect } from "react";
import ReactSelect from 'react-select';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalTitle, Form, FormGroup, FormLabel, FormCheck, FormControl } from 'react-bootstrap';
import { setMarkStudent } from "../../../services/apiService";
export default function SetMarkModal ({studentId,courseId,nameOfStudent, mark,typeMark,updateMarks, show, handleClose }){
    
    const [selectedMark,setSelectedMark]=useState(mark)
    useEffect(()=>{
        setSelectedMark(mark)
        
    },[mark])
    
    async function handleSetMark(){
        const response= await setMarkStudent(localStorage.getItem('token'),courseId, studentId,selectedMark,typeMark)
        debugger
        if(response.id){
            updateMarks()
            handleClose()
        }
    }

    return (

        <Modal show={show} onHide={handleClose} className="modal-xl">
            <ModalHeader closeButton>
                
                    {typeMark==='Midterm' ? (
                        <ModalTitle>
                            Промежуточная аттестация
                        </ModalTitle> 
                    ) : (
                        <ModalTitle>
                            Финальная аттестация
                        </ModalTitle>
                    )}
                
            </ModalHeader>
            <ModalBody>
                Студент - {nameOfStudent}
                <Form>
                    <FormGroup className="mb-3">
                        <div>                            
                            <FormCheck
                                inline
                                type="radio"
                                label="Пройдена"
                                name="filter"
                                value="Passed"
                                checked={selectedMark === "Passed"}
                                onChange={(e)=> 
                                    setSelectedMark(e.target.value)
                                }

                            />
                            
                            <FormCheck
                                inline
                                type="radio"
                                label="Зафейлена"
                                name="filter"
                                value="Failed"
                                checked={selectedMark === "Failed"}
                                onChange={(e)=> 
                                    setSelectedMark(e.target.value)   
                                }
                            />
                            
                        </div>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>Отмена</Button>

                    <Button variant="primary" type="OnSubmit" onClick={handleSetMark}>Сохранить</Button>
                    
                </ModalFooter>
        </Modal>
    );
}
