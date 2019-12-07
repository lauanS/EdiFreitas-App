import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {Form, Row, Col} from 'react-bootstrap';

export default function CamposPessoa(){

  return (
    <>
    <Form.Group as={Row} controlId="formGroupName">
      <Form.Label column sm={2}>
        Nome completo *
      </Form.Label>
      <Col sm={10}>
        <Form.Control 
          required 
          type="text" 
          placeholder="Ex: Leonardo dos Santos Sampaio" />
        <Form.Control.Feedback>Parece bom!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
            Preencha seu nome completo.
        </Form.Control.Feedback>
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId="formGroupDate">
      <Form.Label column sm={2}>
        Data de nascimento *
      </Form.Label>
      <Col sm="3">
        <Form.Control 
          required
          type="date" />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório.
        </Form.Control.Feedback>
      </Col>
    </Form.Group>

    <fieldset>
    <Form.Group as={Row}>
      <Form.Label as="legend" column sm={2}>
        Sexo *
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Masculino"
          name="formSexo"
          id="formSexo"
          className="radio-buttom"
        />
        <Form.Check
          type="radio"
          label="Feminino"
          name="formSexo"
          id="formSexo"
          className="radio-buttom"
        />
        <Form.Check
          type="radio"
          label="Outro"
          name="formSexo"
          id="formSexo"
          className="radio-buttom"
        />
      </Col>
    </Form.Group>
    </fieldset>
    </>
  );
}
