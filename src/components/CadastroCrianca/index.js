import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {Form, Row, Col, Button} from 'react-bootstrap';

import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';

export default function CadastroCrianca(){

  const [validated, setValidated] = useState(false);
  const [toRedirect, setToRedirect] = useState(false);

  const handleSubmit = e => {
    const form = e.currentTarget;


    if (form.checkValidity() === false || !fieldValidation(form)) {
      e.preventDefault();
      e.stopPropagation();
    }
    else{
      setToRedirect(true);
    }
    setValidated(true);

  };

  const fieldValidation = form =>{
    return true;
  }

  return (
    <Form onSubmit={handleSubmit} noValidate validated={validated}>
      <CamposPessoa />

      <Form.Group as={Row} controlId="formGroupName">
        <Form.Label column sm={2}>
          Nome do responsável *
        </Form.Label>
        <Col sm={10}>
          <Form.Control 
            required 
            type="text" 
          />
          <Form.Control.Feedback>Parece bom!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
              Preencha seu nome completo.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

        <Form.Group as={Row} controlId="formGroupCalcado">
          <Form.Label column sm={2}>
            Número do calçado
          </Form.Label>
          <Col>
            <Form.Control 
              type="number"
              placeholder="Ex: 33"
              sm={2}
            />
            <Form.Control.Feedback>Parecem bom!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Insira apenas números.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formGroupTamanho">
          <Form.Label column sm={2}>
            Tamanho de camiseta
          </Form.Label>
          <Col>
            <Form.Control 
              type="text"
              placeholder="Ex: GG"
              sm={2}
            />
            <Form.Control.Feedback>Parecem bom!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Insira uma desses valores [PP, P, M, G, GG, GGG].
            </Form.Control.Feedback>
          </Col>
        </Form.Group>


      <Comentario />

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Cadastrar</Button>
        </Col>
      </Form.Group>
    </Form>
    
  );
}
