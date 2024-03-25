import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalTitle, Form, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import {  } from "../../services/apiService";
export default function CreateEditCourseModal ({token, id, status, show, handleClose,  updateCourses }){
    
    const [selectedStatus, setSelectedStatus]=useState(status)

    return (

        <Modal show={show} onHide={handleClose} className="modal-xl">
            <ModalHeader closeButton>
                <ModalTitle>
                    Изменение статуса курса
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup className="mb-3">
                        <FormLabel>Семестр</FormLabel>
                        <div>
                            <FormCheck
                                inline
                                type="radio"
                                label="Создан"
                                name="filter"
                                value="Created"
                                checked={selectedStatus === "Created"}
                                onChange={(e)=> 
                                    setSelectedStatus(e.target.value)
                                    
                                }
                            />
                            <FormCheck
                                inline
                                type="radio"
                                label="В процессе обучения"
                                name="filter"
                                value="Started"
                                checked={selectedStatus === "Started"}
                                onChange={(e)=> 
                                    setSelectedStatus(e.target.value)   
                                }
                            />
                            <FormCheck
                                inline
                                type="radio"
                                label="В процессе обучения"
                                name="filter"
                                value="Started"
                                checked={selectedStatus === "Started"}
                                onChange={(e)=> 
                                    setSelectedStatus(e.target.value)   
                                }
                            />
                        </div>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
    );
}
