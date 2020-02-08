import React, { useState, useEffect } from 'react';
import '../styles.scss';

import {Form, Col, Row, InputGroup} from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

import { checkTelefone } from '../../../validated';

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

    checkTelefone(e, setValidatedContact, setInvalidatedContact)
      
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
      return `Telefone`;
    }
    else{
      return `Telefone ${id + 1}`;;
    }
  }

  return(
    <Form.Group as={Row} controlId="formGroupTelefone">
      
      <Form.Label column sm={2} className="contato__label">
      { labelText() }
      </Form.Label>
      <Col sm={8} className="contato__inputContact">
        <InputGroup>
          <Form.Control 
            required
            type="text" 
            placeholder="DDD + número, Ex: 15988884444"
            onChange={e => handleChangeContact(e.target, contacts, setContacts)}
            value={contacts[id]}
            isValid={validatedContact}
            isInvalid={invalidatedContact}
          />
          <InputGroup.Append>
            <InputGroup.Text id="inputGroupAppend"  className="contato__inputGroup"> 
              <IconButton 
                aria-label="Apagar o telefone" 
                size="small"
                onClick={() => removeContact(id, contacts, setContacts)}
              >
                <DeleteIcon />
              </IconButton>
            </InputGroup.Text>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">
            Digite um número de telefone válido, DDD obrigatório
          </Form.Control.Feedback>
        </InputGroup>
      </Col>
    </Form.Group> 
  );
    


}
