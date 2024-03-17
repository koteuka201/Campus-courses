import React, { useState, useEffect } from "react";
import {Row,Col, Container, Button, Alert,  CardTitle,Form, FormGroup, FormControl, Modal, ModalHeader,ModalFooter,ModalBody,ModalTitle } from 'react-bootstrap';
import { getRoles,getGroups,createGroup,editGroup,deleteGroup } from "../services/apiService";
import { Navigate, useNavigate } from "react-router-dom";
import GroupsCard from "../components/groupCard";

export default function GroupsPage(){

    const [isTap,setisTap]=useState(false)
    const [isModalEmpty,setisModalEmpty]=useState(false)
    const [groups, setGroups]=useState([])
    const [groupName,setGroupName]=useState('')
    const [roles,setRoles]=useState({
        isStudent: '',
        isTeacher: '',
        isAdmin: ''
    })
    const [showModal, setShowModal] = useState(false);
    const token=localStorage.getItem('token')

    useEffect(()=>{
        getGroup()
        getRole()
    },[])

    useEffect(()=>{
        isEmpty(groupName)
    },[groupName])

    async function getRole(){
        if (token) {
            const response = await getRoles(token)
            
            if(response){
                
                setRoles({
                    ...roles,
                    isStudent: response.isStudent,
                    isTeacher: response.isTeacher,
                    isAdmin: response.isAdmin
                })
                
            }
        }   
    }
    async function getGroup(){
        const response=await getGroups(token)
        if(response){
            
            setGroups(response)
        }
    }

    async function handleEditGroup(groupId, name) {
        const response = await editGroup(token, groupId, name);
        if (response) {
            getGroup();
        }
    }

    async function handleDeleteGroup(groupId) {
        const response = await deleteGroup(token, groupId);
        
        if (response.status===200) {
            getGroup();
        }
    }

    async function handleCreateGroup() {
        if(groupName!=''){
            setisTap(false)
            setisModalEmpty(false)
            const response = await createGroup(token, groupName);
            if (response) {
                getGroup();
                setShowModal(false);
                setGroupName('')
            }
        }
        else{
            setisTap(true)
            setisModalEmpty(true)
        } 
    }

    function isEmpty(value){
        if(value==='' && isTap){
            setisModalEmpty(true)
        }
        else{
            setisModalEmpty(false)
        }
    }

    return(
        <Container style={{marginTop: '110px'}} className="">
            
            <CardTitle className="fs-3">Группы кампусных курсов</CardTitle>
            {roles.isAdmin ? (
                <Button className="mt-1"  onClick={() => setShowModal(true)}>Создать</Button>
            ):(
                <></>
            )}
            
            
            <div className="mt-4">
            {groups.map(group=>(
                <GroupsCard
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    isAdmin={roles.isAdmin}
                    onUpdateName={(newName) => handleEditGroup(group.id, newName)}
                    onDelete={() => handleDeleteGroup(group.id)}
                />
            ))}
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <ModalHeader closeButton>
                    <ModalTitle>Создать курс</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <FormControl className={isModalEmpty ? "border-danger" : ""} type="text" placeholder="Название курса" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                    {isModalEmpty ? (
                        <span className="text-danger">Введите название группы!</span>
                    ) : (
                        <></>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Отмена</Button>
                    <Button variant="primary" onClick={handleCreateGroup}>Создать</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}