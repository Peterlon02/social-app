import React, { useState } from "react";
import { Button, Container, Form, FormCheck, FormGroup, InputGroup, Row, Col, Alert } from "react-bootstrap";
import styles from './LoginLayout.module.css'
import Input from '../../common/input'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import ButtonSocials from "../../features/loginPage/ButtonSocials";

function LoginLayout(){

    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const navigate = useNavigate()
    const [error, setError] =useState('')
    const { dispatch, } = useAuth();
    const [rememberMe, setRememberMe]= useState(false)


    const handleLogin= async (e) =>{
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                email,
                password
            })

            const { token, user } = response.data
            
            // Salva il token e i dettagli utente nel localStorage se "Remember me" è selezionato
            if (rememberMe){
                localStorage.setItem('authToken',token)
                localStorage.setItem('user', JSON.stringify(user))
            }

            // Aggiorna lo stato globale con i dati dell'utente
            dispatch({ type: 'LOGIN', payload: user });

            // Reindirizza l'utente alla homepage
            navigate('/home');
            
            
        }catch (err) {
            setError('Invalid email or password');
          }
    }

    return (
        <div className={`${styles["container-main"]}`}>
            <Container fluid className=" pt-sm-5 pt-4 vh-100  p-0 w-75">
                <div className="align-items-center d-flex flex-column ">
                    <h1 className="text-login">Login</h1>
                    <p className="text-center">Sign in to VibraGram for more fun</p>
                </div>
                {error && (<Alert variant="danger">{error}</Alert>)}
                <Form onSubmit={handleLogin}>
                    <Input 
                        label='Email'
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        required= 'required'
                        icon={faEnvelope}
                    />
                    <Input 
                        classlabel='mt-3'
                        label='Password'
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        required= 'required'
                        icon={faLock}
                    />
                    <FormGroup className={`mt-3 ${styles['remember-container']} `}>
                            <FormCheck type="checkbox" label="Remember me" checked={rememberMe}  onChange={(e) => setRememberMe(e.target.checked)} />
                           <p className={`${styles["forgot-container "]}`}>Forgot your password?</p>
                    </FormGroup>
                    <Button  type="submit" className={`${styles['button-signin']} mt-3 text-light`}>
                        <h3>Sign in</h3>
                    </Button>
                </Form>
                
                <div className="d-flex justify-content-center ">
                <Col xs={5} className={`mt-5 ${styles['border-or']}`} />
                <Col xs={2} className="mt-5 d-flex justify-content-center" >or</Col>
                <Col xs={5} className={`mt-5 ${styles['border-or']}`} />
                </div>
                <div className="d-flex justify-content-between  mt-5">
                    <ButtonSocials label="G"  />
                    <ButtonSocials label="F"  />
                    <ButtonSocials label="X"  />
                </div>
                <div className={`${styles["container-register"]}`}>New here? Join Vibragram now! Sign up</div>
                <div className="mt-4 d-flex justify-content-center ">
                    <Col xs={6} >
                        <Button className={`${styles["button-register"]}`} onClick={()=>navigate('/register')}>Register</Button>
                    </Col>
                </div>
            </Container>
            </div>
    )
}

export default LoginLayout