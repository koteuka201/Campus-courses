import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalTitle, Form, FormGroup, FormLabel, FormCheck } from 'react-bootstrap';
import { editStatusCourse } from "../../../services/apiService";
export default function StatusCourseModal ({token, id, status, show, handleClose,  updateStatus }){
    
    const [selectedStatus, setSelectedStatus]=useState('')

    useEffect(() => {
        setSelectedStatus(status);
    }, [status]);

    async function handleSetStatus(){
        
        const response=await editStatusCourse(token, id, selectedStatus)
        debugger
        if(response.id){
            updateStatus()
            handleClose()
        }
    }

    return (

        <Modal show={show} onHide={handleClose} className="modal-xl">
            <ModalHeader closeButton>
                <ModalTitle>
                    Изменение статуса курса
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup className="mb-3">
                        <div>                            
                            <FormCheck
                                inline
                                type="radio"
                                label="Открыт для записи"
                                name="filter"
                                value="OpenForAssigning"
                                checked={selectedStatus === "OpenForAssigning"}
                                onChange={(e)=> 
                                    setSelectedStatus(e.target.value)
                                }
                                disabled={status==='Finished' || status==='Started'}

                            />
                            
                            <FormCheck
                                inline
                                type="radio"
                                label="В процессе обучения"
                                name="filter"
                                value="Started"
                                checked={selectedStatus === "Started"}
                                onChange={(e)=> 
                                    setSelectedStatus(e.target.value)   
                                }
                                disabled={status==='Finished'}
                            />
                            <FormCheck
                                inline
                                type="radio"
                                label="Завершен"
                                name="filter"
                                value="Finished"
                                checked={selectedStatus === "Finished"}
                                onChange={(e)=> 
                                    setSelectedStatus(e.target.value)   
                                }
                            />
                        </div>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>Отмена</Button>

                    <Button variant="primary" type="OnSubmit" onClick={handleSetStatus}>Сохранить</Button>
                    
                </ModalFooter>
        </Modal>
    );
}