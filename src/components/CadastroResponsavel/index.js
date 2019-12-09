import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {Form, Row, Col, Button} from 'react-bootstrap';

import { checkText, checkData, checkCpf, checkTelefone } from '../../validated';

import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';

import SweetAlert from 'react-bootstrap-sweetalert';

export default function CadastroResponsavel(){
  const [showAlert, setShowAlert] = useState(false);

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [validatedNomeCompleto, setValidatedNomeCompleto] = useState(false);
  const [invalidatedNomeCompleto, setInvalidatedNomeCompleto] = useState(false);

  const [dataNascimento, setDataNascimento] = useState('');
  const [validatedDataNascimento, setValidatedDataNascimento] = useState(false);
  const [invalidatedDataNascimento, setInvalidatedDataNascimento] = useState(false);

  const [sexoPessoa, setSexoPessoa] = useState("Masculino");

  const [cpf, setCpf] = useState('');
  const [validatedCpf, setValidatedCpf] = useState(false);
  const [invalidatedCpf, setInvalidatedCpf] = useState(false);

  const [telefone, setTelefone] = useState('');
  const [validatedTelefone, setValidatedTelefone] = useState(false);
  const [invalidatedTelefone, setInvalidatedTelefone] = useState(false);

  const [comentario, setComentario] = useState("");

  const handleSubmit = e => {
    let flag = false;

    if(validatedNomeCompleto === false){
      setInvalidatedNomeCompleto(true);
      flag = true;
    }
    if(validatedDataNascimento === false){
      setInvalidatedDataNascimento(true);
      flag = true;
    }
    if(validatedCpf === false){
      setInvalidatedCpf(true);
      flag = true;
    }
   
    if(flag === false){
      console.log(nomeCompleto);
      console.log(dataNascimento);
      console.log(sexoPessoa);
      console.log(cpf);
      console.log(comentario);
      console.log(telefone);

      setShowAlert(true);
    }
    e.preventDefault();
    e.stopPropagation();

  };

  const handleConfirm = e => {
    setShowAlert(false);
    window.location.reload();
  }

  const onChangeNome = e => {
    checkText(e, setNomeCompleto, setValidatedNomeCompleto, setInvalidatedNomeCompleto);
  }

  const onChangeSexo = e => {
    setSexoPessoa(e.target.value);
  }

  const onChangeData = e => {
    checkData(e, dataNascimento, setDataNascimento, setValidatedDataNascimento, setInvalidatedDataNascimento)
  }

  return (
    <>
    <SweetAlert title="Criança cadastrada com sucesso!" show={showAlert} 
      type='success' onConfirm={handleConfirm}
      btnSize='sm' confirmBtnText="Entendido"
      />
    <Form onSubmit={handleSubmit} noValidate>
      <CamposPessoa onChangeNome={onChangeNome} valNome={validatedNomeCompleto} invNome={invalidatedNomeCompleto}
          data={dataNascimento} onChangeData={onChangeData} valData={validatedDataNascimento} invData={invalidatedDataNascimento}
          onChangeSexo={onChangeSexo}
      />

      <Form.Group as={Row} controlId="formGroupCpf">
        <Form.Label column sm={2} className="CadastroResponsavel-label">
          CPF *
        </Form.Label>
        <Col sm={4} className="CadastroResponsavel-inputCpf">
          <Form.Control 
            required
            type="text" 
            placeholder="Digite apenas números"
            onChange={e => checkCpf(e.target, setCpf, setValidatedCpf, setInvalidatedCpf)}
            isValid={validatedCpf}
            isInvalid={invalidatedCpf}
          />
          <Form.Control.Feedback type="invalid">
            Digite um CPF válido/correto (Apenas números)
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Comentario setComentario={setComentario}/>
      
      <Form.Group as={Row} controlId="formGroupTelefone">
        <Form.Label column sm={2} className="CadastroResponsavel-label">
          Telefone celular
        </Form.Label>
        <Col sm={4} className="CadastroResponsavel-inputCpf">
          <Form.Control 
            required
            type="text" 
            placeholder="Ex: 1533224466"
            onChange={e => checkTelefone(e.target, setTelefone, setValidatedTelefone, setInvalidatedTelefone)}
            isValid={validatedTelefone}
            isInvalid={invalidatedTelefone}
          />
          <Form.Control.Feedback type="invalid">
            Digite um número de telefone celular (9 dígitos)
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
