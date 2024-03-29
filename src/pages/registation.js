import React, { useState, useEffect } from "react";
import { Container, Button,  Card, CardBody, CardTitle,Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { registation } from "../services/apiService";
import { useNavigate } from "react-router-dom";

export default function Registration(){

    const navigate = useNavigate();
    const [isEmpty, setIsempty]=useState(false)
    const [isDate, setIsDate]=useState(false)
    const [isPasswordSame, setIsPasswordSame]=useState(false)
    const [isPasswordEmpty, setIsPasswordEmpty]=useState(true)
    const [data,setData]=useState({
        fullName: '',
        birthDate: '',
        email:'',
        password:'',
        confirmPassword: ''
    })

    useEffect(()=>{
        checkForm(data.password,data.confirmPassword, data.birthDate)
    },[data.password,data.confirmPassword, data.birthDate])

    const handleEmailChange=(e)=>{
        setData({
            ...data,
            email: e.target.value
        })
    }
    const handlePasswordChange=(e)=>{
        setData({
            ...data,
            password: e.target.value
        })
    }
    const handleConfirmPasswordChange=(e)=>{
        setData({
            ...data,
            confirmPassword: e.target.value
        })
    }
    const handleDateBirth=(e)=>{
        setData({
            ...data,
            birthDate: e.target.value
        })
    }
    const handlefullName=(e)=>{
        setData({
            ...data,
            fullName: e.target.value
        })
    }

    
    const handleSubmit=async (e)=>{
        e.preventDefault()
        
        if(data.email!='' && data.password!='' && data.fullName!='' && data.birthDate!='' && data.confirmPassword!='' && isPasswordSame && isDate){
            setIsempty(false)
            const response=await registation(data.email, data.password, data.fullName, data.birthDate, data.confirmPassword)
            
            if(response.token){
                localStorage.setItem('token', response.token)
                navigate('/')
            }
        }
        else{
            setIsempty(true)
        }
    }
    

    function checkForm(firstP,secondP, date){
        
        if(new Date(date)>new Date()){
            setIsDate(false)
        }
        else{
            setIsDate(true)
        }

        if(firstP=='' || secondP==''){
            setIsPasswordEmpty(true)
        }
        else{
            setIsPasswordEmpty(false)
        }

        if(firstP===secondP && firstP!=''){
            setIsPasswordSame(true)
        }
        else{
            setIsPasswordSame(false)
        }
    }


    return(
        <Container style={{marginTop: '110px'}} className="">
            <Card>
                <CardBody>
                    <CardTitle className="d-flex justify-content-center align-items-center">Регистрация нового пользователя</CardTitle>
                    <Form>
                        <FormGroup>
                            <FormLabel>ФИО</FormLabel>
                            <FormControl className={data.fullName.trim() === "" && isEmpty  ? "border-danger" : ""} value={data.fullName} onChange={handlefullName} placeholder="Введите ваше ФИО"></FormControl>
                        </FormGroup>
                        <FormGroup className="mt-2">
                            <FormLabel>День рождения</FormLabel>
                            <FormControl className={(data.birthDate.trim() === "" && isEmpty) || !isDate ? "border-danger" : ""} type="date" value={data.birthDate} onChange={handleDateBirth}></FormControl>
                        </FormGroup>
                        {isDate ? (
                            <></>
                        ) :(
                            <span className="text-danger">День рождения не может быть в будущем!</span>
                        )}
                        <FormGroup className="mt-2">
                            <FormLabel>Email</FormLabel>
                            <FormControl type="email" className={data.email.trim() === "" && isEmpty ? "border-danger" : ""} value={data.email} onChange={handleEmailChange} placeholder="Введите ваш email"></FormControl>
                            <FormLabel className="small" style={{opacity: 0.7}}>Email будет использоваться для входа в систему</FormLabel>
                        </FormGroup>
                        
                        {isPasswordSame ? (
                            <div>
                            <FormGroup className="mt-2">
                                <FormLabel>Пароль</FormLabel>
                                <FormControl type="password" className={data.password.trim() === "" && isEmpty ? "border-danger" : "border-success"} value={data.password} onChange={handlePasswordChange} placeholder="Введите ваш пароль"></FormControl>
                            </FormGroup>
                            <span className="text-success">Пароли совпадают!</span>
                            </div>
                            
                        ):(
                            <div>
                            <FormGroup className="mt-2">
                                <FormLabel>Пароль</FormLabel>
                                <FormControl type="password" className={(data.password.trim() === "" && isEmpty) || !isPasswordEmpty ? "border-danger" : ''} value={data.password} onChange={handlePasswordChange} placeholder="Введите ваш пароль"></FormControl>
                            </FormGroup>
                            {!isPasswordEmpty ? (
                                <span className="text-danger">Пароли не совпадают!</span>
                            ) :(
                                <></>
                            )}
                            <FormGroup className="mt-2">
                                <FormLabel>Повторите пароль</FormLabel>
                                <FormControl type="password" className={(data.confirmPassword.trim() === "" && isEmpty) || !isPasswordEmpty ? "border-danger" : ''} value={data.confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Повторите ваш пароль"></FormControl>
                            </FormGroup>

                            </div>
                            
                        )}
                        
                        <Button type="OnSubmit" className="mt-2" onClick={handleSubmit}>Зарегистрироваться</Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}