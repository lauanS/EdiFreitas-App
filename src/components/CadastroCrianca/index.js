import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {Form, Row, Col, Button} from 'react-bootstrap';
import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';

import { checkText, checkNumber } from '../../validated';

import SweetAlert from 'react-bootstrap-sweetalert';

export default function CadastroCrianca(){
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [validatedNomeResponsavel, setValidatedNomeResponsavel] = useState(false);
  const [InvalidatedNomeResponsavel, setInvalidatedNomeResponsavel] = useState(false);
  
  const [numCalcado, setNumCalcado] = useState(1);
  const [validatedNumCalcado, setValidatedNumCalcado] = useState(false);
  const [InvalidatedNumCalcado, setInvalidatedNumCalcado] = useState(false);

  const [tamCamiseta, setTamCamiseta] = useState("");

  const handleSubmit = e => {
    const form = e.currentTarget;

    if (form.checkValidity() === false || !fieldValidation(form)) {
      e.preventDefault();
      e.stopPropagation();
    }
    else{
      setNumCalcado("");
      setTamCamiseta("");
      setShowAlert(true);
      e.preventDefault();
    }
    setValidated(true);
  };

  const fieldValidation = form =>{
    return true;
  }

  const handleConfirm = e => {
    setShowAlert(false);
    window.location.reload();
  }

  return (
    <>
    <SweetAlert title="Criança cadastrada com sucesso!" show={showAlert} 
      type='success' onConfirm={handleConfirm}
      btnSize='sm' confirmBtnText="Entendido"
      />
    <Form onSubmit={handleSubmit} noValidate validated={validated} >
      <CamposPessoa />

      <Form.Group as={Row} controlId="formGroupName" >
        <Form.Label column sm={2}>
          Nome do responsável *
        </Form.Label>
        <Col sm={10}>
          <Form.Control 
            required 
            type="text" 
            onChange={e => checkText(e.target, nomeResponsavel, setNomeResponsavel, setValidatedNomeResponsavel, 
              setInvalidatedNomeResponsavel)}
            value={nomeResponsavel}
            isValid={validatedNomeResponsavel}
            isInvalid={InvalidatedNomeResponsavel}
          />
          <Form.Control.Feedback type="invalid">
            Preencha o nome completo do responsável.
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
            onChange={e => checkNumber(e.target, numCalcado, setNumCalcado, setValidatedNumCalcado, 
              setInvalidatedNumCalcado)}
            value={numCalcado}
            isValid={validatedNumCalcado}
            isInvalid={InvalidatedNumCalcado}
            sm={2}
          />
          <Form.Control.Feedback type="invalid">
            Insira um número maior que zero.
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
            onChange={e => setTamCamiseta(e.target.value)}
            value={tamCamiseta}
            sm={2}
            isInvalid={false}
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
    </>
  );
}
