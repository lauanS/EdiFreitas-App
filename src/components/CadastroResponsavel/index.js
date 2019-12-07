import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {Form, Row, Col, Button} from 'react-bootstrap';

import Contato from '../CampoContato/index';
import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';

export default function CadastroResponsavel(){

  const [validated, setValidated] = useState(false);
  //const [toRedirect, setToRedirect] = useState(false);

  const handleSubmit = e => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    else{
     // setToRedirect(true);
    }
    setValidated(true);

  };

  return (
    <Form onSubmit={handleSubmit} noValidate validated={validated}>
      <CamposPessoa />
      <Form.Group as={Row} controlId="formGroup">
        <Form.Label column sm={2}>
          CPF *
        </Form.Label>
        <Col sm={10}>
          <Form.Control 
            required
            type="text" 
            placeholder="(apenas números)" />
          <Form.Control.Feedback type="invalid">
            Campo obrigatório.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Comentario />
      <Contato />

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Cadastrar</Button>
        </Col>
      </Form.Group>

      
    </Form>
    
  );
}
