import React from "react";
import { FormControl, FormGroup, FormLabel, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Input(prop){
    return(
        <FormGroup className={prop.classgroup}>
            <FormLabel className={prop.classlabel}>{prop.label}</FormLabel>
               <InputGroup>
               <InputGroup.Text>
                    <FontAwesomeIcon icon={prop.iconbefore} />
                </InputGroup.Text>
                <FormControl 
                    className={prop.classcontrol}
                    type={prop.type}
                    placeholder={prop.placeholder} 
                    value={prop.value} 
                    onChange={prop.onChange}
                    required={prop.required} />
                {prop.icon && (
                    <InputGroup.Text>
                    <FontAwesomeIcon icon={prop.icon} />
                </InputGroup.Text>
                )}
             </InputGroup>
         </FormGroup>
            
    )
}

export default Input