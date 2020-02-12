import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import {Form, Row, Col} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Snackbar from '../Snackbars';

import { checkFormatData, checkTextField } from '../../validated';
import {converterData, desconverterData} from '../../assist';
import {postEvento, putEvento} from '../../services';

export default function EditorDeEventos({isUpdate, obj, updateList}){
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

  /* Setup inicial do componente */
  useEffect(() => {   
    if(isUpdate){
      setNomeEvento(obj.nome);
      setDescricaoEvento(obj.descricao);
      setDataEvento(desconverterData(obj.dataEvento));
      setLocalEvento(obj.local);
      setValidatedNomeEvento(true);
      setValidatedDescricaoEvento(true);
      setValidatedDataEvento(true);
      setValidatedLocalEvento(true);
    } 
  }, [isUpdate, obj]);

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

  function checkFields(){
    let isValid = true;
    if(validatedNomeEvento === false){
      setInvalidatedNomeEvento(true);
      isValid = false;
    }
    if(validatedDescricaoEvento === false){
      setInvalidatedDescricaoEvento(true);
      isValid = false;
    }
    if(validatedDataEvento === false){
      setInvalidatedDataEvento(true);
      isValid = false;
    }
    if(validatedLocalEvento === false){
      setInvalidatedLocalEvento(true);
      isValid = false;
    }


    return isValid;
  }

  async function handleSubmit(e){
    e.persist();
    e.preventDefault();
    e.stopPropagation();

    const id = obj.id;

    if(checkFields()){
      const data = converterData(dataEvento);
      let obj = {
        nome: nomeEvento,
        dataEvento: data,
        descricao: descricaoEvento,
        local: localEvento
      }

      if(isUpdate){
        await update(obj, id);      
      }
      else{
        await save(obj);
      }
    }
  }

  async function save(obj){
    try {
      await postEvento(obj);
      setOpenAlertSuccess(true);
      setOpenAlertError(false);
      resetFields();
    } catch (error) {
      setOpenAlertSuccess(false);
      setOpenAlertError(true);
    }
  }

  async function update(obj, id){
    try {
      await putEvento(obj, id);
      setOpenAlertSuccess(true);
      setOpenAlertError(false);
      updateList();
    } catch (error) {
      setOpenAlertSuccess(false);
      setOpenAlertError(true);
    }

  }


  return(
    <>
    <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} 
      msg="Evento salvo!" type="success"/>
    <Snackbar open={openAlertError} setOpen={setOpenAlertError} 
      msg="Ocorreu um erro ao salvar o evento" type="error"/>

    <label className="EditorDeEventos__descricao">É obrigatório o preenchimento de todos os campos com * (Asterisco) no título</label>
    
    <Form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Form.Group as={Row} controlId="formGroupNome">
        <Form.Label column sm={2} className="EditorDeEventos__label">
          Nome do evento*
        </Form.Label>
        <Col sm={8} className="EditorDeEventos__inputText">
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
        <Form.Label column sm={2} className="EditorDeEventos__label">
          Descrição *
        </Form.Label>
        <Col sm={8} className="EditorDeEventos__inputText">
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
        <Form.Label column sm={2} className="EditorDeEventos__label">
          Data de realização*
        </Form.Label>
        <Col sm={8} className="EditorDeEventos__inputText">
          <Form.Control 
            className="EditorDeEventos__inputNumber"
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
        <Form.Label column sm={2} className="EditorDeEventos__label">
          Local *
        </Form.Label>
        <Col sm={8} className="EditorDeEventos__inputText">
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
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            className="btn-save-event"
          >
            Salvar
          </Button>
        </Col>
      </Form.Group>
    </Form>
    </>
  );
}