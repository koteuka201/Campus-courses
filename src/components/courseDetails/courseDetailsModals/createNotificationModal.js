import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalTitle, Form, FormGroup, FormCheck, FormControl } from 'react-bootstrap';
import { createNotification } from "../../../services/apiService";
export default function CreateNotificationModal ({id, show, handleClose,updateNotification }){
    
    const [data,setData]=useState({
        text:'',
        isImportant: false
    })

    async function handleCreateNotification(){
        const response=await createNotification(localStorage.getItem('token'), id, data.text, data.isImportant)
        
        if(response.id){
            updateNotification()
            handleClose()
        }
    }

    return (

        <Modal show={show} onHide={handleClose} className="modal-xl">
            <ModalHeader closeButton>
                <ModalTitle>
                    Создание уведомления
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup className="mb-3">
                        <FormControl
                            as='textarea'
                            value={data.text}
                            onChange={(e)=>setData({
                                ...data,
                                text:e.target.value
                            })}
                        >
                        </FormControl>
                        <FormCheck
                            type="switch"
                            name="isImportant"
                            label="Важное уведомление"
                            value={data.isImportant}
                            checked={data.isImportant}
                            onChange={(e)=>setData({
                                ...data,
                                isImportant:e.target.checked
                            })}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>Отмена</Button>

                    <Button variant="primary" type="OnSubmit" onClick={handleCreateNotification}>Сохранить</Button>
                    
                </ModalFooter>
        </Modal>
    );
}
