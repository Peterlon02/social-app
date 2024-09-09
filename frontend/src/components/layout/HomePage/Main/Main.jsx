import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import SideBar from "../../../features/Homepage/SideBar/SideBar";
import { SelectedSectionProvider, useSelectedSection } from "../../../../context/SelectedSectionContext";
import MainContent from "../../../features/Homepage/MainContent/MainContent";


function Main(){

    const {selectedSection}=useSelectedSection()

    return(

            <Row className={'vh-100'}>
                {selectedSection != 'Profile' && (
                    <>
                    <SideBar size={3} />
                    <Col md={1}></Col>
                    </>
                )}
                
                <MainContent />
            </Row>
        
    )
}

export default Main