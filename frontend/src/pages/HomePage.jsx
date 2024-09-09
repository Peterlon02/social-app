import React from "react";
import {useAuth} from '../context/AuthContext'
import { Button, Col, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUserFriends, faBell, faCog } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/layout/HomePage/Navbar/Navbar'
import Main from '../components/layout/HomePage/Main/Main'
import { SelectedSectionProvider } from "../context/SelectedSectionContext";

function HomePage(){
    const {state} = useAuth()
    const {navigate}= useNavigate()

    

    return (
    <SelectedSectionProvider>
        <Container fluid className= "p-0">
            <Navbar />
            <Main />
        </Container >
     </SelectedSectionProvider>
    )
}

export default HomePage