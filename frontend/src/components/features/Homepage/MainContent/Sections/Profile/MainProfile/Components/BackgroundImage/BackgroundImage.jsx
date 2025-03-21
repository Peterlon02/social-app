import React, { useEffect } from "react";
import { useAuth } from "../../../../../../../../../context/AuthContext";
import { Container, Image, Form, Button } from "react-bootstrap";
import styles from './BackgroundImage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import axios from "axios";

function BackgroundImage() {

    const{state}=useAuth()
    const {result}= useState(state.user)
    

    // Funzione che gestisce il cambio dell'input file
    const handleFileChange =async (event) => {
        
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "image/jpeg" ) {
            
            const formData = new FormData();
            formData.append('email', state.user.email);
            formData.append('campo', 'imgBackground');
            formData.append('file', selectedFile);  // Aggiungi il file
            
            
            try{
                // Invia formData al backend tramite axios
                const response=await axios.post(`${process.env.REACT_APP_API_URL}/auth/add`, formData, {
                    'Content-Type': 'multipart/form-data'    
                })
                
             result= response.data.user
                

            }catch (err) {
                if (err.response) {
                  console.error('Error response:', err.response.data);
                } else {
                  console.error('Error message:', err.message);
                }
              }
        } else {
            alert("Per favore carica un file JPG.");
        } 
    };

    useEffect(() =>{
        state.user=result
    })

    return(
        <Container fluid className={`${styles['container-image']}`}>
                <h1>{state.user.imgBackground}</h1>
                {state.user.imgBackground ? (
                    <Image   src={`${process.env.REACT_APP_API_URL}${state.user.imgBackground}`} className="w-100 img-fluid" />
                ): (
                    <Form.Group controlId="formFile" className="">
                    <Form.Label>
                        {/* Bottone per caricare file */}
                        <Button variant="primary" as="label" htmlFor="file-upload">
                            <FontAwesomeIcon icon={faPlus} /> Carica file
                        </Button>
                        <Form.Control
                            type="file"
                            id="file-upload"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            accept=".jpg, .jpeg"
                        />
                    </Form.Label>
                </Form.Group>
                )}
        </Container>
    )
}

export default BackgroundImage