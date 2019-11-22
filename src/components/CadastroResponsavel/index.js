import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {Form, Row, Col, Button} from 'react-bootstrap';

export default function CadastroResponsavel(){

  const [validated, setValidated] = useState(false);
  const [toRedirect, setToRedirect] = useState(false);

  const handleSubmit = e => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    else{
      setToRedirect(true);
    }
    setValidated(true);

  };

      
  return (
    <Form onSubmit={handleSubmit} noValidate validated={validated}>
      <Form.Group as={Row} controlId="formGroupName">
        <Form.Label column sm={2}>
          Nome completo do responsável:
        </Form.Label>
        <Col sm={10}>
          <Form.Control 
            required 
            type="text" 
            placeholder="Ex: Leonardo dos Santos Sampaio" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
              Preencha seu nome completo.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupDate">
        <Form.Label column sm={2}>
          Data de nascimento:
        </Form.Label>
        <Col sm="2">
          <Form.Control 
            required
            type="date" />
          <Form.Control.Feedback type="invalid">
            Campo obrigatório.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroup">
        <Form.Label column sm={2}>
          CPF:
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

      <fieldset>
      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={2}>
          Sexo
        </Form.Label>
        <Col sm={10}>
          <Form.Check
            type="radio"
            label="Masculino"
            name="rdMasc"
            id="rdMasc"
          />
          <Form.Check
            type="radio"
            label="Feminino"
            name="rdFem"
            id="rdMasc"
          />
        </Col>
      </Form.Group>
      </fieldset>


      <Form.Group as={Row} controlId="formGroupComment">
        <Form.Label column sm={2}>
          Comentário:
        </Form.Label>
        <Col>
          <Form.Control as="textarea" rows="3"/>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Cadastrar</Button>
        </Col>
      </Form.Group>

      
    </Form>
    
  );
}
