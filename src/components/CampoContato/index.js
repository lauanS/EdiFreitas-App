import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.scss';

import {Form, Col, Row} from 'react-bootstrap';

export default function CampoContato(props){

  const { id, valor, contacts, setContacts } = props;


  function handleChangeContact(e, contacts, setContacts){
    let count = 0;
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

      
    setContacts(newContacts);

  }

  return (
  <>
    <Form.Group as={Row} controlId="formGroupTelefone">
      <Form.Label column sm={2} className="CadastroResponsavel-label">
        Contato {id}
      </Form.Label>
      <Col sm={5} className="cadastro-inputText">
        <Form.Control 
          required
          type="text" 
          placeholder="E-mail ou telefone"
          onChange={e => handleChangeContact(e.target, contacts, setContacts)}
          value={valor}
          isValid={e => {}}
          isInvalid={e => {}}
        />
        <Form.Control.Feedback type="invalid">
          Digite um número de telefone celular (9 dígitos) ou um e-mail
        </Form.Control.Feedback>
      </Col>
    </Form.Group> 
  </>
  );
}
