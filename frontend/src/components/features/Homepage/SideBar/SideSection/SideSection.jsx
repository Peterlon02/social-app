import React, { useState } from "react";
import styles from './SideSection.module.css'
import { Button } from "react-bootstrap";


function SideSection(prop){


    return(
        <Button className={`text-light d-flex ${styles['container-section']} `} onClick={prop.onClick}>
            <icon className={ prop.isSelected ? styles['icon-section-selected']: styles['icon-section']}>
                {prop.icon}
            </icon>
            <h5   className={ prop.isSelected ? styles['text-section-selected']: styles['text-section']}>{prop.text}</h5>
        </Button>
    )
}

export default SideSection