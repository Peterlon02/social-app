import React, { useState } from "react";
import { Button, Col, Offcanvas } from "react-bootstrap";
import SideBar from "../../../../SideBar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from './SidebarScroll.module.css'
function SidebarScroll() {
    // Stato per gestire la visibilità della sidebar
    const [showSidebar, setShowSidebar] = useState(false);

    // Funzione per aprire e chiudere la sidebar
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <Col md={1} className={`text-center h-100 ${styles['container-show']}`}>
            {/* Pulsante hamburger per aprire la sidebar */}
            <Button variant='' onClick={toggleSidebar} className={`me-2 ${styles['container-button']} `}>
                <FontAwesomeIcon className="text-light" icon={faBars} size="lg" />
            </Button>

            {/* Sidebar o Offcanvas */}
            <Offcanvas  show={showSidebar} onHide={toggleSidebar} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Inserisci qui la tua sidebar */}
                    <SideBar  />
                </Offcanvas.Body>
            </Offcanvas>
        </Col>
    );
}

export default SidebarScroll;