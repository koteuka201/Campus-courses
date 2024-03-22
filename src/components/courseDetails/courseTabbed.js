import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import ReactSelect from 'react-select';
import 'react-quill/dist/quill.snow.css';
import {Container, Button, Alert,ListGroup ,  CardTitle,Form, FormCheck, FormGroup, FormControl, Modal, ModalHeader,ModalFooter,ModalBody,ModalTitle, FormLabel, Col, Card, CardBody, Row } from 'react-bootstrap';
import { getRoles, getCourseDetails} from "../services/apiService";
import { useNavigate,useParams  } from "react-router-dom";
import CourseCard from "../components/courseCard";

export default function CourseTabbed({roles,requirements ,annotations,notifications}){

    
    return(
        <Container style={{marginTop: '110px'}}>
            
        </Container>
    )
}