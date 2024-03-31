import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalTitle, Form, FormGroup, FormCheck } from 'react-bootstrap';
// import { editStatusCourse } from "../../../services/apiService";
import { editStatusCourse } from "../../../../services/apiService";
export default function StatusCourseModal ({token, id, status, show, handleClose,  updateStatus, toast }){
    
    const [selectedStatus, setSelectedStatus]=useState('')

    useEffect(() => {
        setSelectedStatus(status);
    }, [status]);

    async function handleSetStatus(){
        const loadingToast = toast.loading('Изменение статуса...')
        const response=await editStatusCourse(token, id, selectedStatus)
        toast.dismiss(loadingToast.id)
        if(response.id){
            await updateStatus()
            handleClose()
            toast.success('Статус изменен!')
        }
        if(!response.id){
            toast.error('Не удалось изменить статус!')
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
