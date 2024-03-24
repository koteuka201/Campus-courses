import React, { useState, useEffect } from "react";
import '../../styles/tab.css'
import {Container, ButtonCardTitle, Tab, Tabs, Button  } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function CourseTabbed({id,roles,requirements ,annotations,notifications}){

    return(
        
        <Tabs
            defaultActiveKey='requirements'
            fill
            className="custom-tabs mt-4 "
        >
            
            <Tab eventKey="requirements" className="border border-top-0" title={'Требования к курсу'} >
                <div className="me-3 ms-3 mb-3">
                    <div dangerouslySetInnerHTML={{ __html: requirements }} />
                </div>
                
            </Tab>
            
            
            <Tab eventKey="annotations" className="border border-top-0" title={'Аннотация'}>
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
                <div className="me-3 ms-3 mb-3 ">
                    {roles.isAdmin || roles.isTeacher ? (
                        <Button className="mt-4 ms-2">Создать уведомление</Button>
                    ):(<></>)}
                    <div className="mt-3 ms-2">
                        {notifications && notifications.length ? (
                            notifications.map((note, index)=>(
                                <div key={index} className={`${note.isImportant ? 'bg-danger-subtle text-danger ' : ''} border-bottom`}>
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
    )
}