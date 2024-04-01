import React from "react";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalTitle } from 'react-bootstrap';
import { deleteCourse, deleteGroup } from "../../services/apiService";
import { useNavigate  } from "react-router-dom";

export default function DeleteEntityModal ({id, show, handleClose,updatePage,toast, type, name }){
    
    const navigate=useNavigate()


    async function handleDeleteGroup(){
        const loadingToast = toast.loading('Удаление группы...')
        const response=await deleteGroup(localStorage.getItem('token'), id)
        
        if(response.status===200){
            
            await updatePage()
            handleClose()
            toast.dismiss(loadingToast.id)
            toast.success('Группа удалена!')
            
        }
        else{
            toast.dismiss(loadingToast.id)
            toast.error('Не удалось удалить группу!')
        }
    }

    async function handleDeleteCourse(){
        const loadingToast = toast.loading('Удаление курса...')
        const response = await deleteCourse(localStorage.getItem('token'),id)
        toast.dismiss(loadingToast.id)
        
        if(response){
            handleClose()
            
            toast.success('Курс удален!')
            navigate(-1)
        }
        else{
            
            toast.error('Не удалось удалить курс!')
        }
    }

    return (

        <Modal show={show} onHide={handleClose} className="modal" centered>
            <ModalHeader closeButton>
                {type==='course' ? (
                    <ModalTitle>
                        Подтверждение удаления курса
                    </ModalTitle>
                ) : (
                    <ModalTitle>
                        Подтверждение удаления группы 
                    </ModalTitle>
                )}
                
            </ModalHeader>
            {type==='course' ? (
                    <ModalBody>
                        Вы уверены, что хотите удалить курс - <span className="fw-bold fs-4">{name}</span>
                    </ModalBody>
                ) : (
                    <ModalBody>
                        Вы уверены, что хотите удалить группу - <span className="fw-bold">{name}</span>
                    </ModalBody>
                )}
            
            <ModalFooter>
                <Button variant="secondary" onClick={handleClose}>Отмена</Button>

                {type==='course' ? (
                    <Button variant="danger" type="OnSubmit" onClick={handleDeleteCourse}>Удалить</Button>
                ) : (
                    <Button variant="danger" type="OnSubmit" onClick={handleDeleteGroup}>Удалить</Button>
                )}
                
                
            </ModalFooter>
        </Modal>
    );
}
