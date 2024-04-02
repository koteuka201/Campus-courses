import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalTitle, Form, FormGroup, FormCheck, FormControl } from 'react-bootstrap';
import { createNotification } from "../../../../services/apiService";
import { isFieldEmpty } from "../../../../helpers/isFieldEmpty";

export default function CreateNotificationModal ({id, show, handleClose,updateNotification,toast }){
    
    const [isEmpty, setIsEmpty]=useState(false)
    const [data,setData]=useState({
        text:'',
        isImportant: false
    })

    async function handleCreateNotification(){
        if(data.text!==''){
            setIsEmpty(false)
            const loadingToast = toast.loading('Создание уведомления...')
            const response=await createNotification(localStorage.getItem('token'), id, data.text, data.isImportant)
            toast.dismiss(loadingToast.id)
            if(response.id){
                await updateNotification()
                handleClose()
                toast.success('Уведомление создано!', { duration: 1000 })
            }
            if(!response.id){
                toast.error('Не удалось создать уведомление!', { duration: 1000 })
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
                            className={data.text==='' && isEmpty ? 'border-danger' : ''}
                        >
                        </FormControl>
                        {isFieldEmpty(data.text,isEmpty)}
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
