import React from "react";
import { Button, Col } from "react-bootstrap";
import styles from '../../layout/LoginLayout/LoginLayout.module.css';

function ButtonSocials({ label,  onClick }) {
  return (
    <Col xs={3} className="text-center">
      <Button className={`bg-dark w-100 ${styles['container-socials']} `} onClick={onClick}>
        <h1>{label}</h1>
      </Button>
    </Col>
  );
}

export default ButtonSocials;