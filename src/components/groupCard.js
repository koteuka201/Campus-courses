import React, { useState, useEffect } from "react";
import {Row,Col, Container, Button, Alert, Card, CardBody,  FormControl,  Modal, ModalHeader,ModalFooter,ModalBody,ModalTitle } from 'react-bootstrap';
import { getProfile, putProfile } from "../services/apiService";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { dateConvertor } from "../helpers/dateConverter";

export default function GroupsCard({ id, name, isAdmin, onUpdateName, onDelete }){

    const [showModal, setShowModal] = useState(false)
    const [groupName, setGroupName] = useState(name)

    const handleEdit = () => {
        setShowModal(true)
    };

    const handleCloseModal = () => {
        setShowModal(false)
    };

    const handleSaveName = () => {
        onUpdateName(groupName)
        handleCloseModal()
    };

    // useEffect(()=>{
        
    // },[groupName])

    return(
        <>
            <Card>
                <CardBody className="row">
                    <Col sm={8} className="fs-5">{name}</Col>
                    {isAdmin===true ? (
                        <Col sm={4} className="text-end">
                        <Button className="bg-warning border-0 text-dark" onClick={handleEdit}>Редактировать</Button>
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