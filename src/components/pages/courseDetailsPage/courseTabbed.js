import React, { useState } from "react";
import '../../../styles/tab.css'
import {Tab, Tabs, Button  } from 'react-bootstrap';
import CreateNotificationModal from "./courseDetailsModals/createNotificationModal";

export default function CourseTabbed({id,roles,requirements ,annotations,notifications,isCourseTeacher,updateNotifications, toast}){

    const [showNotificationModal, setShowNotificationModal]=useState(false)
    
    return(
        <>
            <Tabs
            defaultActiveKey='requirements'
            fill
            className="custom-tabs mt-4 "
            
        >
            
            <Tab eventKey="requirements" className="border border-top-0" title={'Требования к курсу'} >
                <div className="me-3 ms-3 mb-3 wrap">
                    <div dangerouslySetInnerHTML={{ __html: requirements }} />
                </div>
                
            </Tab>
            
            
            <Tab eventKey="annotations" className="border border-top-0  wrap" title={'Аннотация'}>
                <div className="me-3 ms-3 mb-3 ">
                    <div dangerouslySetInnerHTML={{ __html: annotations }} />
                </div>
            </Tab>
            <Tab eventKey="notifications" className="border border-top-0" 
                title={
                    !notifications ? (
                        <div>Уведомления</div>
                    ) : (
                        
                        <div>
                            Уведомления
                            <div className="badge rounded-pill bg-danger ms-1">{notifications.length>3 ? '3+' : notifications.length}</div>
                        </div>
                    )}
                    >
                <div className="me-3 ms-3 mb-3 " >
                    {roles.isAdmin || isCourseTeacher ? (
                        <Button className="mt-4 ms-2" onClick={()=> setShowNotificationModal(true)}>Создать уведомление</Button>
                    ):(<></>)}
                    <div className="mt-0 ms-2">
                        {notifications && notifications.length ? (
                            notifications.map((note, index)=>(
                                <div key={index} className={`${note.isImportant ? 'bg-danger-subtle text-danger ' : ''} border-bottom  wrap`} >
                                    <div className="mb-2 ms-2 fs-5">
                                    {note.text}
                                    </div>
                                </div>
                            ))
                        ):(
                            <span className="fs-3 fw-bold  text-danger">Уведомлений нет</span>
                        )}
                    </div>
                </div>
            </Tab>
            
        </Tabs>
        <CreateNotificationModal
                id={id}
                show={showNotificationModal}
                handleClose={()=> setShowNotificationModal(false)}
                updateNotification={updateNotifications}
                toast={toast}
            />
        </>
        
    )
}