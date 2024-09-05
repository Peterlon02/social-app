import React from "react";
import { Col } from "react-bootstrap";
import { useSelectedSection } from "../../../../context/SelectedSectionContext";
import Home from "./Sections/Home/Home";

function MainContent(){

    const {selectedSection} = useSelectedSection()

    //Mostra il componente in base alla sezione selezionata
    function renderContent(){
        switch (selectedSection) {
            case 'Home':
                return <Home />;
            case 'Profile':
                return <div>{selectedSection}</div>;
            case 'Friends':
                return <div>{selectedSection}</div>;
            case 'Notifications':
                return <div>{selectedSection}</div>;
            case 'Settings':
                return <div>{selectedSection}</div>;
            
        
            default:
                break;
        }
    }

    return (
        <Col md={6}>{renderContent()}</Col>
    )
}

export default MainContent