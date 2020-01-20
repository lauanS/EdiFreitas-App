import React, { useState } from 'react';
import {Form, Col, Row} from 'react-bootstrap';

import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

import { checkTelefone } from '../../validated';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';





export default function CampoContato(props){

  const { id, contacts, setContacts } = props;

  const [validatedContact, setValidatedContact] = useState(false);
  const [invalidatedContact, setInvalidatedContact] = useState(false);


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
    else if(e.value.match(/[\d]{9}/gm)){
      // quando for um telefone
      checkTelefone(e, setValidatedContact, setInvalidatedContact)
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
    // Atualiza o valor
    const newContacts = contacts.filter(( _ , index) => id !== index);
    setContacts(newContacts);

  }

  return (
  <>
    <Form.Group as={Row} controlId="formGroupTelefone">
      <Form.Label column sm={2} className="CadastroResponsavel-label">
        Contato {id}
      </Form.Label>
      <Col sm={5} >
        <Form.Control 
          className="cadastro-inputText"
          required
          type="text" 
          placeholder="E-mail ou telefone"
          onChange={e => handleChangeContact(e.target, contacts, setContacts)}
          value={contacts[id]}
          isValid={validatedContact}
          isInvalid={invalidatedContact}
        />
        <Form.Control.Feedback type="invalid">
          Digite um número de telefone celular (11 dígitos) ou um e-mail
        </Form.Control.Feedback>
      </Col>
      <Col>
        <IconButton 
          aria-label="delete" 
          onClick={() => removeContact(id, contacts, setContacts)}
        >
          <DeleteIcon />
        </IconButton>
      </Col>
    </Form.Group> 
  </>
  );
}
