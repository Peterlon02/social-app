import React from "react";
import { Col, Container, Image } from "react-bootstrap";
import image from '../../../../../../../assets/images/le-roi-lion-et-son-regard-de-grand-felin.jpg'
import { useAuth } from "../../../../../../../context/AuthContext";
import BackgroundImage from "./Components/BackgroundImage/BackgroundImage";

function MainProfile(){

    const {state}= useAuth()

    return(
        <Col  className="">
            <BackgroundImage />
        </Col>)
}

export default MainProfile