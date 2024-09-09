import React, { useState } from "react";
import { Col } from "react-bootstrap";
import styles from './SideBar.module.css';
import SideSection from './SideSection/SideSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers, faBell, faCog } from '@fortawesome/free-solid-svg-icons';
import { useSelectedSection } from "../../../../context/SelectedSectionContext";


function SideBar(prop){

    const {selectedSection, setSelectedSection}=useSelectedSection()  //Usa il contesto
    

    function handleClick(text){
        setSelectedSection(text)
    }

    return(
        <Col  md={prop.size} className={`${styles['column-main']} d-md-block d-none h-100`}>
            <SideSection 
                icon={<FontAwesomeIcon icon={faHome}/>}
                text={'Home'}
                onClick={() => handleClick('Home')}  // Passa una funzione anonima
                isSelected={selectedSection === 'Home'}
                      />
            <SideSection 
                icon={<FontAwesomeIcon icon={faUser}/>}
                text={'Profile'}
                onClick={()=>handleClick('Profile')}
                isSelected={selectedSection === 'Profile'}
            />
            <SideSection 
                icon={<FontAwesomeIcon icon={faUsers}/>}
                text={'Friends'}
                onClick={()=>handleClick('Friends')}
                isSelected={selectedSection === 'Friends'}
            />
            <SideSection 
                icon={<FontAwesomeIcon icon={faBell}/>}
                text={'Notifications'}
                onClick={()=>handleClick('Notifications')}
                isSelected={selectedSection === 'Notifications'}
                />
            <SideSection 
                icon={<FontAwesomeIcon icon={faCog}/>}
                text={'Settings'}
                onClick={()=>handleClick('Settings')}
                isSelected={selectedSection === 'Settings'}
                />
        </Col>
    )
}

export default SideBar