import React, { useState, useEffect } from 'react';
import {Form, Col, Row, InputGroup} from 'react-bootstrap';

import DeleteIcon from '@material-ui/icons/Delete';

import { IconButton } from '@material-ui/core';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.scss';


export default function Telefone(props){

  const { id, contacts, setContacts } = props;

  const [validatedContact, setValidatedContact] = useState(false);
  const [invalidatedContact, setInvalidatedContact] = useState(false);

  useEffect(() => {
    if(!contacts[id]){
      setValidatedContact(false);
      setInvalidatedContact(false);
    }
    
  }, [id, contacts]);

  function handleChangeContact(e, contacts, setContacts){
    let count = 0;

    // Atualiza o valor
    const newContacts = contacts.map(contact => {      
      if(id === count){
        count++;
        return e.value;
      }
      else{
        count++;
        return contact;
      }
    });

    // Verifica se é um email "valido"
    if(e.value.match(/.+@.+/gm)){
      // quando for um e-mail
      setValidatedContact(true);
      setInvalidatedContact(false);

    }
    else if(!e.value.length){
      // quando estiver vazio
      setValidatedContact(false);
      setInvalidatedContact(false);
    }
    else{
      // quando for um contato inválido
      setValidatedContact(false);
      setInvalidatedContact(true);
    }
      
    setContacts(newContacts);

  }

  function removeContact(id, contacts, setContacts){
    if(contacts.length === 1) {
      setContacts(['']);
      setValidatedContact(false);
      setInvalidatedContact(false);
      return;
    }
    // Atualiza o valor
    const newContacts = contacts.filter(( _ , index) => id !== index);
    setContacts(newContacts);
  }

  function labelText(){
    if(id === 0){
      return `Email`;
    }
    else{
      return `Email ${id + 1}`;;
    }
  }

  return(
    <Form.Group as={Row} controlId="formGroupEmail">
      
      <Form.Label column sm={2} className="cadastro-label">
        {labelText()}
      </Form.Label>
      <Col sm={8} className="cadastro-inputContact">
        <InputGroup>
          <Form.Control 
            className="cadastro-inputText"
            required
            type="text" 
            placeholder="Ex: seu-email@gmail.com"
            onChange={e => handleChangeContact(e.target, contacts, setContacts)}
            value={contacts[id]}
            isValid={validatedContact}
            isInvalid={invalidatedContact}
          />
           <InputGroup.Append>
            <InputGroup.Text id="inputGroupAppend"  className="cadastro-inputGroup"> 
              <IconButton 
                aria-label="Apagar o email" 
                size="small"
                onClick={() => removeContact(id, contacts, setContacts)}
              >
                <DeleteIcon />
              </IconButton>
            </InputGroup.Text>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">
            Digite um e-mail válido
          </Form.Control.Feedback>
        </InputGroup>
      </Col>
    </Form.Group> 
  );
    


}
