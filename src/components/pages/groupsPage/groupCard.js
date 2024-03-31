import React, { useState } from "react";
import {Col, Button, Card, CardBody,  FormControl,  Modal, ModalHeader,ModalFooter,ModalBody,ModalTitle } from 'react-bootstrap';
import { Link } from "react-router-dom";
import DeleteEntityModal from "../../generalModals/deleteEntityModal";


export default function GroupsCard({ id, name, isAdmin, onUpdateName, toast,updatePage }){

    const [showModal, setShowModal] = useState(false)
    const [groupName, setGroupName] = useState(name)
    const [showDeleteModal, setShowDeleteModal]=useState(false)

    

    const handleCloseModal = () => {
        setShowModal(false)
    };

    const handleSaveName = () => {
        onUpdateName(groupName)
        handleCloseModal()
    };


    return(
        <>
            <Card>
                <CardBody className="row">
                    <Link to={`/groups/${id}`} className="col-sm-6 fs-5">
                        {name}

                    </Link>
                    {isAdmin===true ? (
                        <Col sm={6} className="text-end">
                        <Button className="bg-warning border-0 text-dark" onClick={()=>setShowModal(true)}>Редактировать</Button>
                        <Button className="bg-danger border-0 ms-1" onClick={()=>setShowDeleteModal(true)}>Удалить</Button>
                        </Col>
                        
                    ): (
                        <>
                        </>
                    )}
                    <div></div>
                </CardBody>
            </Card>
            <Modal show={showModal} onHide={handleCloseModal} className="modal-lg" >
                <ModalHeader closeButton>
                    <ModalTitle>Редактирование группы</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <FormControl className={groupName.trim() === "" ? "border-danger" : ""} type="text" value={groupName} placeholder='Название курса' onChange={(e) => setGroupName(e.target.value)} />
                    {groupName==='' ? (
                        <span className="text-danger">Введите название курса!</span>
                    ):(
                        <></>
                    )}
                    
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleCloseModal}>Закрыть</Button>
                    <Button variant="primary" onClick={handleSaveName}>Сохранить</Button>
                </ModalFooter>
            </Modal>
            <DeleteEntityModal
                id={id}
                show={showDeleteModal}
                handleClose={()=>setShowDeleteModal(false)}
                updatePage={updatePage}
                toast={toast}
                type={'group'}
                name={name}
            />
        </>
    )
}