import React, { useState, useEffect } from "react";
import {Container, Button, ListGroup , CardTitle, Col,  Row } from 'react-bootstrap';
// import { getRoles, getCourseDetails, getProfile,getUsers,  signUpForCourse} from "../../../services/apiService";
import { getCourseDetails } from "../../../apiServices/courseService";
import { getRoles, getUsers } from "../../../apiServices/usersService";
import { getProfile } from "../../../apiServices/accountService";
import { useParams  } from "react-router-dom";
import CourseTabbed from "./courseTabbed"; 
import CourseCommunityTabbed from "./courseCommunity/courseCommunityTabbed";
import CreateEditCourseModal from "../../generalModals/createEditCourseModal";
import DeleteEntityModal from "../../generalModals/deleteEntityModal";
import CourseMainInfo from "./courseMainInfo";
import { toast, Toaster } from 'react-hot-toast';
import { Loader } from "../../layouts/loader/loader";


export default function CourseDetailsPage(){
    
    const { id } = useParams()

    const [loading,setLoading]=useState(false)
    const [currentUserName,setCurrentUserName]=useState('')
    const [isCourseTeacher, setIsCourseTeacher]=useState(false)
    const [isCourseStudent, setIsCourseStudent]=useState(false)

    const [isMainTeacher, setIsMainTeacher]=useState(false)
    const [isRolesGot, setIsRolesGot]=useState(false)

    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal]=useState(false)


    const [details,setDetails]=useState([])
    const [roles,setRoles]=useState({})
    const [users, setUsers] = useState([])

    
    useEffect(()=>{
        GetCourseDetails('first')
        getRole()
        getUsersList()
        
    },[])

    useEffect(()=>{
        if(details.name){
            GetProfile()
        }
        
    },[details])
    const token=localStorage.getItem('token')

    async function getRole(){
        const response = await getRoles(token)
        if(response){
            
            setRoles(response) 
            setIsRolesGot(true)
        }
    }
    async function GetCourseDetails(num){
        if(num==='first'){
            setLoading(true)
        }
        
        const response = await getCourseDetails(token,id)
        if(response){
            setDetails(response)
        }
        if(num==='first'){
            setLoading(false)
        }
    }
    async function GetProfile(){
        const response = await getProfile(token)
        if(response){
            setCurrentUserName(response.fullName)

            const teacher=details.teachers.find(teacher => teacher.name===response.fullName)
            const student=details.students.find(student => student.name===response.fullName)
            
            if(teacher){
                
                setIsCourseTeacher(true)
                if(teacher.isMain){
                    
                    setIsMainTeacher(true)
                }
            }
            if(student){
                setIsCourseStudent(true)
            }
        }
    }
    async function getUsersList() {
        const response = await getUsers(token)
        if (response) {
 
            setUsers(response)
        }
    }

    if(loading){
        return <Loader/>
    }

    return(
        <Container style={{marginTop: '110px'}}>
            <div>
                <Toaster />
            </div>
            <CardTitle className="fs-1 mb-3">{details.name}</CardTitle>
            <Row>
                <Col sm={4} className="fs-4">Основные данные курса</Col>
                {roles.isAdmin ? (
                    <Col sm={8} className="text-end">
                        <Button variant="warning" onClick={() => setShowModal(true)}>Редактировать</Button>
                        <Button variant="danger" className="ms-1" onClick={()=>setShowDeleteModal(true)}>Удалить</Button>
                    </Col>
                ) :(
                    isCourseTeacher ? (
                        <Col sm={8} className="text-end">
                            <Button variant="warning" onClick={() => setShowModal(true)}>Редактировать</Button>
                        </Col>
                        ) : (
                        <></>
                    )
                    
                )}
            </Row>
            <CourseMainInfo
                id={id}
                roles={roles}
                details={details}
                isCourseTeacher={isCourseTeacher}
                isCourseStudent={isCourseStudent}
                updatePage={GetCourseDetails}
                toast={toast}
                isRolesGot={isRolesGot}
            />
            <CourseTabbed
                id={id}
                roles={roles}
                requirements={details.requirements}
                annotations={details.annotations}
                notifications={details.notifications}
                isCourseTeacher={isCourseTeacher}
                updateNotifications={GetCourseDetails}
                toast={toast}
            />
            <CourseCommunityTabbed
                id={id}
                roles={roles}
                teachers={details.teachers}
                students={details.students}
                users={users}
                isMainTeacher={isMainTeacher}
                updateTeachers={GetCourseDetails}
                isCourseStudent={isCourseStudent}
                currentUserName={currentUserName}
                isCourseTeacher={isCourseTeacher}
                toast={toast}
            />
            <CreateEditCourseModal
                type={'edit'}
                isTeacher={isCourseTeacher}
                roles={roles}
                show={showModal}
                handleClose={() => setShowModal(false)}
                token={token}
                id={id}
                updateCourses={GetCourseDetails}
                toast={toast}
                isMainTeacher={isMainTeacher}
            />
            
            <DeleteEntityModal
                id={id}
                show={showDeleteModal}
                handleClose={()=>setShowDeleteModal(false)}
                updatePage={GetCourseDetails}
                toast={toast}
                type={'course'}
                name={details.name}
            />  
        </Container>
    )
}