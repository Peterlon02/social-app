import React from 'react'
import {Col, Container, Row }from 'react-bootstrap'
import LoginImage from '../assets/images/LoginImage.png'
import LoginLayout from '../components/layout/LoginLayout/LoginLayout'

function Login() {
    return(
        <Container fluid className=' vh-100  '>
            <Row className='h-100  '>
                <Col lg={6} md={6} className='d-none d-md-block  p-0'>
                    <img src={LoginImage} style={{objectFit:'cover', width:'100%', height:'100vh'}}></img>
                </Col>
                <Col md={6} xs={12} className='p-0  '>
                    <LoginLayout />
                </Col>
            </Row>
        </Container>
    )
}

export default Login