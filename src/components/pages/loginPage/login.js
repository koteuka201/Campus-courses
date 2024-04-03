import React, { useState } from "react";
import { Container, Button, Alert, Card, CardBody, CardTitle,Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { login } from "../../../apiServices/accountService";
import { useNavigate } from "react-router-dom";
import { clearAuth } from '../../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { isFieldEmpty } from "../../../helpers/isFieldEmpty";
import { toast, Toaster } from 'react-hot-toast';

export default function Login(){
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const [data, setData]=useState({
        email: '',
        password: ''
    })
    const [isEmpty, setIsEmpty] = useState(false);

    const [errorMessage, setErrorMessage] = useState('')

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
    
    const handleSubmit=async (e)=>{
        e.preventDefault()
        if(data.email!=='' && data.password!==''){
            const loadingToast = toast.loading('Выполняется вход...')
            const response=await login(data.email, data.password)
            if(response){
                toast.dismiss(loadingToast.id)
                localStorage.setItem('token', response.token)
                dispatch(clearAuth())
                navigate('/')
            }
            else{
                setErrorMessage('Неправильный email или пароль')
            }
            
        }
        else{
            setIsEmpty(true)
        }
    }
    return (
        <Container style={{marginTop: '110px'}} className="d-flex justify-content-center align-items-center">
            <div>
                <Toaster />
            </div>
            <Card className="col-md-6 shadow">
                <CardBody>
                    <CardTitle className="text-center fs-3">Авторизация</CardTitle>
                    <Form >
                        <FormGroup>
                            <FormLabel>Email</FormLabel>
                            <FormControl type="email" value={data.email} onChange={handleEmailChange}  placeholder="Введите ваш email" />
                            {isFieldEmpty(data.email,isEmpty)}
                        </FormGroup>
                        <FormGroup className="mt-4 ">
                            <FormLabel>Пароль</FormLabel>
                            <FormControl type="password" value={data.password} onChange={handlePasswordChange} placeholder="Введите ваш пароль" />
                            {isFieldEmpty(data.password,isEmpty)}
                        </FormGroup>
                        <Button type="submit" onClick={handleSubmit} className="mt-4 mb-3 text-center w-100">Войти</Button>

                        {errorMessage && <Alert variant="danger" className="text-center">{errorMessage}</Alert>}
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
}