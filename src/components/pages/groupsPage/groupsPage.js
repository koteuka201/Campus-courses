import React, { useState, useEffect } from "react";
import { Container, Button,  CardTitle, FormControl, Modal, ModalHeader,ModalFooter,ModalBody,ModalTitle } from 'react-bootstrap';
import { getRoles,getGroups,createGroup,editGroup,deleteGroup } from "../../../services/apiService";
import GroupsCard from "./groupCard";
import { Toaster, toast } from 'react-hot-toast'
import { Loader } from "../../layouts/loader/loader";

export default function GroupsPage(){

    const [loading,setLoading]=useState(false)
    const [isTap,setisTap]=useState(false)
    const [isModalEmpty,setisModalEmpty]=useState(false)
    const [showModal, setShowModal] = useState(false);

    const [groups, setGroups]=useState([])
    const [groupName,setGroupName]=useState('')
    const [roles,setRoles]=useState({
        isStudent: '',
        isTeacher: '',
        isAdmin: ''
    })
    
    const token=localStorage.getItem('token')

    useEffect(()=>{
        getGroup()
        getRole()
    },[])

    useEffect(()=>{
        isEmpty(groupName)
    },[groupName])

    async function getRole(){
        
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
    async function getGroup(){
        setLoading(true)
        const response=await getGroups(token)
        if(response){
            
            setGroups(response)
            setLoading(false)
        }
    }

    async function handleEditGroup(groupId, name) {
        
        if(name!==''){
            const loadingToast = toast.loading('Изменение название группы...')
            const response = await editGroup(token, groupId, name);
            toast.dismiss(loadingToast.id)
            if (response) {
                await getGroup();
                toast.success('Название группы обновлено!')
            }
            if (response==='') {
                toast.error('Не удалось изменить название группы!')
            }
        }
        
    }

    async function handleCreateGroup() {
        if(groupName!==''){
            setisTap(false)
            setisModalEmpty(false)
            const loadingToast = toast.loading('Создание группы...')
            const response = await createGroup(token, groupName)
            toast.dismiss(loadingToast.id)
            
            if (response.id) {
                await getGroup();
                setTimeout(() => {
                    toast.success('Группа создана!')
                }, 10)
                // toast.success('Группа создана!')
                setGroupName('')
                setShowModal(false)
            }
            if(response===""){
                toast.error('Не удалось создать группу!')
            }
        }
        else{
            setisTap(true)
            setisModalEmpty(true)
        } 
    }
    // debugger
    function isEmpty(value){
        if(value==='' && isTap){
            setisModalEmpty(true)
        }
        else{
            setisModalEmpty(false)
        }
    }

    // if(loading){
    //     return <Loader/>
        
    // }

    return(
        <Container style={{marginTop: '110px'}} >
            <div>
                <Toaster />
            </div>
            {loading ? (
                <Loader/>
            ) : (
                <>
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
                    toast={toast}
                    updatePage={getGroup}
                />
            ))}
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <ModalHeader closeButton>
                    <ModalTitle>Создание группы</ModalTitle>
                    
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
                </>
            )}
            {/* <CardTitle className="fs-3">Группы кампусных курсов</CardTitle>
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
                    toast={toast}
                    updatePage={getGroup}
                />
            ))}
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <ModalHeader closeButton>
                    <ModalTitle>Создание группы</ModalTitle>
                    
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
            </Modal> */}
            
        </Container>
    )
}