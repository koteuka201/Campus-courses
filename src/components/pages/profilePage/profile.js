import React, { useState, useEffect } from "react";
import {Row,Col, Container, Button,  Card, CardBody, CardTitle,Form,  FormControl, FormLabel } from 'react-bootstrap';
import { getProfile, putProfile } from "../../../services/apiService";
import { dateConvertor } from "../../../helpers/dateConverter";
import { isDateValid } from "../../../helpers/dateValidChecker";
import { isFieldEmpty } from "../../../helpers/isFieldEmpty";
import { Toaster, toast } from 'react-hot-toast'
import { Loader } from "../../layouts/loader/loader";

export default function Profile(){

    const [loading,setLoading]=useState(false)
    const [email,setEmail]=useState('')
    const [isEmpty, setIsempty]=useState(false)
    const [fullName, setName]=useState('')
    const [birthDate, setDate]=useState('')
    

    const token=localStorage.getItem('token')
    

    useEffect(() => {
        async function getName(){
            if (token) {
                setLoading(true)
                const response = await getProfile(token);
                if(response.fullName){
                    setName(response.fullName);
                    setDate(dateConvertor(response.birthDate));
                    setEmail(response.email);
                    
                }
                setLoading(false)
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
        if(fullName!='' && birthDate!='' && isDateValid(birthDate)){
            const loadingToast = toast.loading('Попытка изменить профиль...')
            setIsempty(false)
            const response=await putProfile(fullName,birthDate, token)
            toast.dismiss(loadingToast.id)
            if(response.fullName){
                toast.success('Профиль успешно обновлен!', { duration: 1000 })
            }
            if(response.status===400){
                toast.error('Не удалось изменить профиль!', { duration: 1000 })
            }
        }
        else{
            setIsempty(true)
        }
    }

    if(loading){
        return <Loader/>
    }

    return(
        <Container style={{marginTop: '110px'}} className="">
            <div>
                <Toaster />
            </div>
            <Card>
                <CardBody>
                    <CardTitle className="d-flex justify-content-center align-items-center fs-3">Профиль</CardTitle>
                    <Form >
                        <Row className="mb-3">
                            <FormLabel column sm={2} className="">ФИО</FormLabel>
                            <Col sm={10}>
                                <FormControl className={(fullName.trim() === "" && isEmpty) ? "border-danger" : ""} value={fullName} onChange={handlefullName} placeholder="Введите ваше ФИО" />
                                {isFieldEmpty(fullName,isEmpty)}
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
                                <FormControl className={birthDate.trim() === "" && isEmpty && !isDateValid(birthDate) ? "border-danger" : ""} type="date" value={birthDate} onChange={handleDateBirth}></FormControl>
                                {isDateValid(birthDate) ? (
                                    <></>
                                ) :(
                                    <span className="text-danger">День рождения должен быть в промежутке от 01.01.1900 до настоящего момента!</span>
                                )}
                            </Col>
                            
                        </Row>
                        
                        
                        
                        <Row className="mb-2">
                            <Col sm={12} className="d-flex justify-content-end">
                                <Button type="onSubmit"  onClick={handleSubmit}>Изменить</Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}