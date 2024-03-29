import React, { useState, useEffect } from "react";
import { Container, Button, CardTitle } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { getRoles, getGroupCourses, getGroups, getUsers } from "../services/apiService";
import CourseCard from "../components/courseCard";
import CreateEditCourseModal from "../components/generalModals/createEditCourseModal";
import { toast, Toaster } from 'react-hot-toast';
export default function GroupCoursesPage() {
    const { id } = useParams();
    // const { toast } = useToaster();

    const [users, setUsers] = useState([])
    
    const [isCourseTeacher, setIsCourseTeacher]=useState(false)
    const [courses, setCourses] = useState([])
    const [isRequested, setIsRequested] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [roles, setRoles] = useState({});

    useEffect(() => {
        getRole()
        GetGroupCourses()
        getGroupName()
    }, []);

    const token = localStorage.getItem('token')

    async function getRole() {
        const response = await getRoles(token)
        if (response) {
            setRoles(response)
        }
    }

    async function GetGroupCourses() {
        const response = await getGroupCourses(token, id);
        if (response) {
            setCourses(response)
            setIsRequested(true)
        }
    }

    async function getGroupName() {
        const response = await getGroups(token);
        if (response) {
            setGroupName((response.find(group => group.id === id)).name)
        }
    }

    return (
        <Container style={{ marginTop: '110px' }}>
            <div>
                <Toaster />
            </div>
            <CardTitle className="fs-3">Группа - {groupName}</CardTitle>
            {roles.isAdmin ? (
                <Button className="mt-1" onClick={() => setShowModal(true)}>Создать курс</Button>
            ) : (
                <></>
            )}
            {courses.length > 0 ? (
                <div className="mt-4">
                    {courses.map(course => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            name={course.name}
                            startYear={course.startYear}
                            roles={roles}
                            maximumStudentsCount={course.maximumStudentsCount}
                            remainingSlotsCount={course.remainingSlotsCount}
                            status={course.status}
                            semester={course.semester}
                        />
                    ))}
                </div>
            ) : (
                isRequested === true ? (
                    <div className="text-danger text-center mt-4 fw-bold fs-3">
                        Курсы еще не были созданы
                    </div>
                ) : (
                    <></>
                )
            )}

            <CreateEditCourseModal
                type={'create'}
                isTeacher={isCourseTeacher}
                roles={roles}
                show={showModal}
                handleClose={() => setShowModal(false)}
                token={token}
                id={id}
                updateCourses={GetGroupCourses}
                toast={toast}
            />
        </Container>
    );
}
