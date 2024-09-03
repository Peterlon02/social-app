import React from "react";
import { Container } from "react-bootstrap";
import Navbar from '../components/layout/RegisterPage/Navbar/Navbar'
import ModuleRegistation from '../components/layout/RegisterPage/ModuleRegistration/ModuleRegistration'

function Registration() {
    return(
        <Container fluid className="vh-100 p-0" style={{backgroundColor:'#f4f4f4'}}>
            <Navbar />
            <ModuleRegistation />
        </Container>
    )
}

export default Registration