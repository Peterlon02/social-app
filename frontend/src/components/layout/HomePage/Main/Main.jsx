import React from "react";
import { Col, Row } from "react-bootstrap";
import SideBar from "../../../features/Homepage/SideBar/SideBar";
import { SelectedSectionProvider, useSelectedSection } from "../../../../context/SelectedSectionContext";
import MainContent from "../../../features/Homepage/MainContent/MainContent";


function Main(){
    return(
        <SelectedSectionProvider>
            <Row className={'vh-100'}>
                <SideBar />
                <Col md={1}></Col>
                <MainContent />
            </Row>
        </SelectedSectionProvider>
    )
}

export default Main