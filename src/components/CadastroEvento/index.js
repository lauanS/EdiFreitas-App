import React, { useState } from 'react';
import './styles.scss';

import {Form, Row, Col, Button} from 'react-bootstrap';
import Snackbar from '../Snackbars';

import { checkFormatData, checkTextField } from '../../validated';
import {converterData} from '../../assist';
import {postEvento} from '../../services';

export default function CadastroEvento(){
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  const [nomeEvento, setNomeEvento] = useState("");
  const [validatedNomeEvento, setValidatedNomeEvento] = useState(false);
  const [invalidatedNomeEvento, setInvalidatedNomeEvento] = useState(false);

  const [descricaoEvento, setDescricaoEvento] = useState("");
  const [validatedDescricaoEvento, setValidatedDescricaoEvento] = useState(false);
  const [invalidatedDescricaoEvento, setInvalidatedDescricaoEvento] = useState(false);

  const [dataEvento, setDataEvento] = useState("");
  const [validatedDataEvento, setValidatedDataEvento] = useState(false);
  const [invalidatedDataEvento, setInvalidatedDataEvento] = useState(false);

  const [localEvento, setLocalEvento] = useState("");
  const [validatedLocalEvento, setValidatedLocalEvento] = useState(false);
  const [invalidatedLocalEvento, setInvalidatedLocalEvento] = useState(false);

  const resetFields = () => {
    setNomeEvento("");
    setValidatedNomeEvento(false);
    setInvalidatedNomeEvento(false);
  
    setDescricaoEvento("");
    setValidatedDescricaoEvento(false);
    setInvalidatedDescricaoEvento(false);
  
    setDataEvento("");
    setValidatedDataEvento(false);
    setInvalidatedDataEvento(false);
  
    setLocalEvento("");
    setValidatedLocalEvento(false);
    setInvalidatedLocalEvento(false);
  }

  const handleSubmit = e => {
    let flag = false;

    if(validatedNomeEvento === false){
      setInvalidatedNomeEvento(true);
      flag = true;
    }
    if(validatedDescricaoEvento === false){
      setInvalidatedDescricaoEvento(true);
      flag = true;
    }
    if(validatedDataEvento === false){
      setInvalidatedDataEvento(true);
      flag = true;
    }
    if(validatedLocalEvento === false){
      setInvalidatedLocalEvento(true);
      flag = true;
    }

    if(flag === false){
      let data = converterData(dataEvento);

      const obj = {
        nome: nomeEvento,
        dataEvento: data,
        descricao: descricaoEvento,
        local: localEvento
      }

      postEvento(obj)
      .then(res => {
        setOpenAlertSuccess(true);
        setOpenAlertError(false);
        resetFields();
      })
      .catch(res => {
        setOpenAlertSuccess(false);
        setOpenAlertError(true);
      });
    }
    e.preventDefault();
    e.stopPropagation();
  }

  return(
    <>
    <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} msg="Evento cadastrado" type="success"/>
    <Snackbar open={openAlertError} setOpen={setOpenAlertError} msg="Ocorreu um erro ao cadastrar" type="error"/>

    <label className="CadastroEvento__descricao">É obrigatório o preenchimento de todos os campos com * (Asterisco) no título</label>
    
    <Form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Form.Group as={Row} controlId="formGroupNome">
        <Form.Label column sm={2} className="CadastroEvento__label">
          Nome *
        </Form.Label>
        <Col sm={8} className="CadastroEvento__inputText">
          <Form.Control 
            type="text"
            placeholder="Festa de natal"
            onChange={e => checkTextField(e.target, setNomeEvento, setValidatedNomeEvento, setInvalidatedNomeEvento)}
            value={nomeEvento}
            isValid={validatedNomeEvento}
            isInvalid={invalidatedNomeEvento}
          />
          <Form.Control.Feedback type="invalid">
            Campo obrigatório, preencha o nome do evento.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupDescricao">
        <Form.Label column sm={2} className="CadastroEvento__label">
          Descrição *
        </Form.Label>
        <Col sm={8} className="CadastroEvento__inputText">
          <Form.Control 
            as="textarea" 
            rows="3" 
            placeholder="Realização de um almoço especial para todas as famílias"
            onChange={e => checkTextField(e.target, setDescricaoEvento, setValidatedDescricaoEvento, setInvalidatedDescricaoEvento)}
            value={descricaoEvento}
            isValid={validatedDescricaoEvento}
            isInvalid={invalidatedDescricaoEvento}
          />
          <Form.Control.Feedback type="invalid">
            Campo obrigatório, preencha a descrição do evento.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupData">
        <Form.Label column sm={2} className="CadastroEvento__label">
          Data *
        </Form.Label>
        <Col sm={8} className="CadastroEvento__inputText">
          <Form.Control 
            className="CadastroEvento__inputNumber"
            type="text"
            placeholder="dd/MM/aaaa" 
            onChange={e => checkFormatData(e.target, dataEvento, setDataEvento, setValidatedDataEvento, setInvalidatedDataEvento)}
            value={dataEvento}
            isValid={validatedDataEvento}
            isInvalid={invalidatedDataEvento}
          />
          <Form.Control.Feedback type="invalid">
            Campo obrigatório, preencha a data do evento.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupLocal">
        <Form.Label column sm={2} className="CadastroEvento__label">
          Local *
        </Form.Label>
        <Col sm={8} className="CadastroEvento__inputText">
          <Form.Control 
            type="text"
            placeholder="Na ONG Edi Freitas"
            onChange={e => checkTextField(e.target, setLocalEvento, setValidatedLocalEvento, setInvalidatedLocalEvento)}
            value={localEvento}
            isValid={validatedLocalEvento}
            isInvalid={invalidatedLocalEvento}
          />
          <Form.Control.Feedback type="invalid">
            Campo obrigatório, preencha o local do evento.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Cadastrar</Button>
        </Col>
      </Form.Group>
    </Form>
    </>
  );
}