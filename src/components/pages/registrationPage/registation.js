import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Container, Button,  Card, CardBody, CardTitle,Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { registation } from "../../../apiServices/accountService";
import { useNavigate } from "react-router-dom";
import { isDateValid } from "../../../helpers/dateValidChecker";
import { isFieldEmpty } from "../../../helpers/isFieldEmpty";
import { toast, Toaster } from 'react-hot-toast';
import {isPasswordValid, isEmailValid} from "../../../helpers/registrationValidation";
import { clearAuth } from "../../../store/slices/authSlice";

export default function Registration(){

    const dispatch=useDispatch()
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
        
        if(data.email!=='' && data.password!=='' && data.fullName!=='' && data.birthDate!=='' && data.confirmPassword!=='' && isPasswordSame && isDate && isPasswordValid(data.password) && isEmailValid(data.email)){
            setIsempty(false)
            const loadingToast = toast.loading('Регистрируем тебя...')
            const response=await registation(data.email, data.password, data.fullName, data.birthDate, data.confirmPassword)
            toast.dismiss(loadingToast.id)
            if(response.token){
                
                localStorage.setItem('token', response.token)
                dispatch(clearAuth())
                navigate('/')
                toast.success('Вы успешно зарегистрировались!')
            }
            else{
                toast.error('Не удалось зарегистрироваться!')
            }
        }
        else{
            setIsempty(true)
        }
    }
    

    function checkForm(firstP,secondP, date){
        
        setIsDate(isDateValid(date))
        if(firstP==='' || secondP===''){
            setIsPasswordEmpty(true)
        }
        else{
            setIsPasswordEmpty(false)
        }

        if(firstP===secondP && firstP!==''){
            setIsPasswordSame(true)
        }
        else{
            setIsPasswordSame(false)
        }
    }


    return(
        <Container className="mt-5">
            <div>
                <Toaster/>
            </div>
            <Card>
                <CardBody>
                    <CardTitle className="d-flex justify-content-center align-items-center">Регистрация нового пользователя</CardTitle>
                    <Form>
                        <FormGroup>
                            <FormLabel>ФИО</FormLabel>
                            <FormControl className={data.fullName.trim() === "" && isEmpty  ? "border-danger" : ""} value={data.fullName} onChange={handlefullName} placeholder="Введите ваше ФИО"></FormControl>
                            {isFieldEmpty(data.fullName,isEmpty)}
                        </FormGroup>
                        <FormGroup className="mt-2">
                            <FormLabel>День рождения</FormLabel>
                            <FormControl className={(data.birthDate.trim() === "" || !isDate) && isEmpty  ? "border-danger" : ""} type="date" value={data.birthDate} onChange={handleDateBirth}></FormControl>
                        </FormGroup>
                        {!isDate && isEmpty ? (
                            <span className="text-danger">День рождения должен быть в промежутке от 01.01.1900 до настоящего момента!</span>
                        ) :(
                            <></>
                        )}
                        <FormGroup className="mt-2">
                            <FormLabel>Email</FormLabel>
                            <FormControl type="email" className={(data.email.trim() === "" || !isEmailValid(data.email)) && isEmpty ? "border-danger" : ""} value={data.email} onChange={handleEmailChange} placeholder="Введите ваш email"></FormControl>
                            <div className="small" style={{opacity: 0.7}}>Email будет использоваться для входа в систему</div>
                            {!isEmailValid(data.email) && isEmpty ? (
                                <span className="text-danger">Используйте маску exemple@exemple.exemple!</span>
                            ) : (
                                isFieldEmpty(data.email,isEmpty)
                            )}
                            
                        </FormGroup>
                        
                        {isPasswordSame && isPasswordValid(data.password) ? (
                            <div>
                            <FormGroup className="mt-2">
                                <FormLabel>Пароль</FormLabel>
                                <FormControl type="password" className={(data.password.trim() === "" || !isPasswordValid(data.password)) && isEmpty ? "border-danger" : "border-success"} value={data.password} onChange={handlePasswordChange} placeholder="Введите ваш пароль"></FormControl>
                            </FormGroup>
                            <span className="text-success">Пароли совпадают!</span>
                            </div>
                            
                        ):(
                            <div>
                            <FormGroup className="mt-2">
                                <FormLabel>Пароль</FormLabel>
                                <FormControl type="password" className={(data.password.trim() === "" && isEmpty) || !isPasswordEmpty ? "border-danger" : ''} value={data.password} onChange={handlePasswordChange} placeholder="Введите ваш пароль"></FormControl>
                                {isFieldEmpty(data.password,isEmpty)}
                            </FormGroup>
                            {!isPasswordValid(data.password) && isEmpty && data.password!=='' ? (
                                <span className="text-danger">Пароль должен содержать не менее 6 букв и хотя бы одну цифру</span>
                            ) : (
                                !isPasswordEmpty  ? (
                                    <span className="text-danger">Пароли не совпадают!</span>
                                ) :(
                                    <></>
                                )
                            )}
                            
                            <FormGroup className="mt-2">
                                <FormLabel>Повторите пароль</FormLabel>
                                <FormControl type="password" className={(data.confirmPassword.trim() === "" && isEmpty) || !isPasswordEmpty ? "border-danger" : ''} value={data.confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Повторите ваш пароль"></FormControl>
                                {isFieldEmpty(data.confirmPassword,isEmpty)}
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