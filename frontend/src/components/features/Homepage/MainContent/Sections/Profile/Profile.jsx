import React from "react";
import { useAuth } from "../../../../../../context/AuthContext";
import { Button, Col, Row } from "react-bootstrap";
import SidebarScroll from "./SidebarScroll/SidebarScroll";
import MainProfile from "./MainProfile/MainProfile";

function Profile() {

    const {state} = useAuth()

    return(
        <Row className="h-100" >
            <SidebarScroll />
            <MainProfile />
        </Row>
        )
}

export default Profile