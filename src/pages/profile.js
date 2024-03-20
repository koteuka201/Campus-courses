import React, { useState, useEffect } from "react";
import {Row,Col, Container, Button, Alert, Card, CardBody, CardTitle,Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { getProfile, putProfile } from "../services/apiService";
import { Navigate, useNavigate } from "react-router-dom";
import { dateConvertor } from "../helpers/dateConverter";

export default function Profile(){

    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [isDate, setIsDate]=useState(false)
    const [isEmpty, setIsempty]=useState(false)
    const [fullName, setName]=useState('')
    const [birthDate, setDate]=useState('')
    const [errorMessage, setErrorMessage] = useState('')
    

    const token=localStorage.getItem('token')
    
    useEffect(()=>{
        checkDate(birthDate)
    },[birthDate])

    useEffect(() => {
        async function getName(){
            if (token) {
                const response = await getProfile(token);
                if(response.fullName){
                    
                    setName(response.fullName);
                    setDate(dateConvertor(response.birthDate));
                    setEmail(response.email);

                    
                }
            }
        }
        getName();
    }, []);

    const handleDateBirth=(e)=>{
        
        setDate(e.target.value)
    }

    const handlefullName=(e)=>{
        
        setName(e.target.value)
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        if(fullName!='' && birthDate!='' && isDate){
            setIsempty(false)
            setErrorMessage('')
            const response=await putProfile(fullName,birthDate, token)
            
            if(response.status===400){
                
            }
        }
        else{
            setIsempty(true)
            setErrorMessage('Заполните выделенные поля!')
        }
    }

    function checkDate(date){
        if(new Date(date)>new Date()){
            setIsDate(false)
        }
        else{
            setIsDate(true)
        }
    }
    return(
        <Container style={{marginTop: '110px'}} className="">
            <Card>
                <CardBody>
                    <CardTitle className="d-flex justify-content-center align-items-center fs-3">Профиль</CardTitle>
                    <Form >
                        <Row className="mb-3">
                            <FormLabel column sm={2} className="">ФИО</FormLabel>
                            <Col sm={10}>
                                <FormControl className={(fullName.trim() === "" && isEmpty) ? "border-danger" : ""} value={fullName} onChange={handlefullName} placeholder="Введите ваше ФИО" />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <FormLabel column sm={2}>Email</FormLabel> 
                            <Col sm={10}>
                                {email}
                            </Col>
                        </Row>
                        
                        <Row className=" mb-2">
                            <FormLabel column sm={2}>День рождения</FormLabel>
                            <Col sm={10}>
                                <FormControl className={birthDate.trim() === "" && isEmpty ? "border-danger" : ""} type="date" value={birthDate} onChange={handleDateBirth}></FormControl>
                                {isDate ? (
                                    <></>
                                ) :(
                                    <span className="text-danger">День рождения не может быть в будущем!</span>
                                )}
                            </Col>
                            
                        </Row>
                        
                        
                        
                        <Row className="mb-2">
                            <Col sm={12} className="d-flex justify-content-end">
                                <Button type="onSubmit"  onClick={handleSubmit}>Изменить</Button>
                            </Col>
                        </Row>
                    </Form>
                    {errorMessage && <Alert variant="danger" className="mt-2 text-center">{errorMessage}</Alert>}
                </CardBody>
            </Card>
        </Container>
    )
}