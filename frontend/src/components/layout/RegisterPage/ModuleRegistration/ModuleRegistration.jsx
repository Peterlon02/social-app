import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from './ModuleRegistration.module.css'
import Input from '../../../common/input'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../../../../context/AuthContext'
function ModuleRegistration(){


    const [name, setName]= useState('')
    const [surname, setSurname]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [confirmPassword, setConfirmPassword]= useState('')
    const [birth, setBirth]= useState('')
    const [message, setMessage]= useState('')
    const [username, setUsername]= useState('')
    const { dispatch, } = useAuth();
    const navigate= useNavigate()

    const handleRegister= async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try{
            const response= await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
                nome: name, cognome: surname, username, email, password, dateOfBirth: birth
            })

            const { token, user } = response.data

            localStorage.setItem('authToken',token)
            localStorage.setItem('user', JSON.stringify(user))

            dispatch({ type: 'LOGIN', payload: user });
            
            navigate('/home')

        }catch(err){
            if(err.response && err.response.status === 400){
                setMessage('User already exists')
            }else{
                setMessage('Server Error')
            }
        }
    }

    return(
        <Row className={`${styles['container-main']} w-100 m-0`}>
            <Col sm={6} xs={8} className={styles['container-register']}>
                <Form onSubmit={handleRegister} className={`${styles["container-form"]}`}>
                    <h3 className={`${styles["text-create"]} `}>Create Your Account</h3>
                    {message && (<Alert variant="danger">{message}</Alert>)}
                    <div  className=" d-flex justify-content-between mt-3">
                        <Col lg={5} xs={12} className={` ${styles["container-input "]}`}>
                            <Input 
                                classgroup='text-start'
                                label='Name'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required='required'
                            />
                        </Col>
                        <Col lg={5} className="d-none d-lg-block ">
                            <Input 
                                classgroup='text-start'
                                label='Surname'
                                type='text'
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required='required'
                            />
                        </Col>
                    </div>
                    <Col  className="d-lg-none  w-100 mt-3">
                            <Input 
                                classgroup='text-start'
                                label='Surname'
                                type='text'
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required='required'
                            />
                        </Col>
                        <Input 
                                classgroup='text-start mt-3'
                                label='Username'
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required='required'
                            />
                    <Input 
                        classgroup='text-start mt-3'
                        label='Email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required='required'
                    />
                    <Input 
                        classgroup='text-start mt-3'
                        label='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required='required'
                    />
                    <Input 
                        classgroup='text-start mt-3'
                        label='Confirm Password' 
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required='required'
                    />
                    <Input 
                        classgroup='text-start mt-3'
                        label='Date of Birth (Optional)'
                        type='date'
                        value={birth}
                        onChange={(e) => setBirth(e.target.value)}
                        
                    />
                    <Button type='submit' className={`mt-5 w-100 ${styles['button-signup']}`}>Sign up</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default ModuleRegistration