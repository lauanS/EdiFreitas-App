import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {Form, Row, Col, InputGroup} from 'react-bootstrap';

export default function CadastroResponsavel(){

  const [typeContact, setType] = useState('E-mail');

  const handleChange = e => {
    let {name, value} = e.target;
    setType(value);
  } 

  return (
  <>
    <Form.Group controlId="fromGroupTypeContact">
      <Form.Label>Novo Contato: </Form.Label>
      <Form.Control as="select" value={typeContact} onChange={handleChange}>
        <option>Telefone</option>
        <option>E-mail</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Row} controlId="formGroupContact">
      <Form.Label column sm={2}>
        {typeContact}
      </Form.Label>
      <Col sm={10}>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control 
            required 
            type="text" 
            placeholder="contact" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
              Preencha seu nome completo.
          </Form.Control.Feedback>    
        </InputGroup>

      </Col>
    </Form.Group>  
  </>
  );
}
