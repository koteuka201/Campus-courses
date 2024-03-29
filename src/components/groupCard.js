import React, { useState } from "react";
import {Col, Button, Card, CardBody,  FormControl,  Modal, ModalHeader,ModalFooter,ModalBody,ModalTitle } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function GroupsCard({ id, name, isAdmin, onUpdateName, onDelete }){

    const [showModal, setShowModal] = useState(false)
    const [groupName, setGroupName] = useState(name)

    

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
                        <Button className="bg-danger border-0 ms-1" onClick={onDelete}>Удалить</Button>
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
        </>
    )
}