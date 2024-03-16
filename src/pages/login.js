import React, { useState } from "react";
import { Container, Button, Alert, Card, CardBody, CardTitle,Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { login } from "../services/apiService";
import { useNavigate } from "react-router-dom";


export default function Login(){

    const navigate = useNavigate();
    const [data, setData]=useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);

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
        if(data.email!='' && data.password!=''){
            const response=await login(data.email, data.password)
            if(response){
                localStorage.setItem('token', response.token)
                navigate('/')
            }
            else{
                setErrorMessage('Неправильный email или пароль')
            }
            
        }
    }
    return (
        <Container style={{marginTop: '110px'}} className="d-flex justify-content-center align-items-center">
            <Card className="col-md-6 shadow">
                <CardBody>
                    <CardTitle className="text-center fs-3">Авторизация</CardTitle>
                    <Form >
                        <FormGroup>
                            <FormLabel>Email</FormLabel>
                            <FormControl type="email" value={data.email} onChange={handleEmailChange}  placeholder="Введите ваш email" />
                        </FormGroup>
                        <FormGroup className="mt-4 ">
                            <FormLabel>Пароль</FormLabel>
                            <FormControl type="password" value={data.password} onChange={handlePasswordChange} placeholder="Введите ваш пароль" />
                        </FormGroup>
                        {loading ? (
                            <div className="d-flex ms-4 justify-content-center align-items-center">
                                {/* <Loader
                                    color="#43c4ca"
                                    height={80}
                                    width={80}
                                /> */}
                            </div>
                        ) :<Button type="submit" onClick={handleSubmit} className="mt-4 mb-3 text-center w-100">Войти</Button>}

                        {errorMessage && <Alert variant="danger" className="text-center">{errorMessage}</Alert>}
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
}