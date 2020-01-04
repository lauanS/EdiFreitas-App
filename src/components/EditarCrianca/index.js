import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {Form, Row, Col} from 'react-bootstrap';
import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';

import { checkText, checkNumber, checkCamiseta, checkData } from '../../validated';

import SweetAlert from 'react-bootstrap-sweetalert';

export default function CadastroCrianca(props){
  const {submitEdit, setEdit, setSubmitEdit} = props;

  const [showAlert, setShowAlert] = useState(false);

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [validatedNomeCompleto, setValidatedNomeCompleto] = useState(false);
  const [invalidatedNomeCompleto, setInvalidatedNomeCompleto] = useState(false);

  const [dataNascimento, setDataNascimento] = useState('');
  const [validatedDataNascimento, setValidatedDataNascimento] = useState(false);
  const [invalidatedDataNascimento, setInvalidatedDataNascimento] = useState(false);

  const [sexoPessoa, setSexoPessoa] = useState("Masculino");

  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [validatedNomeResponsavel, setValidatedNomeResponsavel] = useState(false);
  const [invalidatedNomeResponsavel, setInvalidatedNomeResponsavel] = useState(false);
  
  const [numCalcado, setNumCalcado] = useState(0);
  const [validatedNumCalcado, setValidatedNumCalcado] = useState(false);
  const [invalidatedNumCalcado, setInvalidatedNumCalcado] = useState(false);

  const [tamCamiseta, setTamCamiseta] = useState("");
  const [validatedTamCamiseta, setValidatedTamCamiseta] = useState(false);
  const [invalidatedTamCamiseta, setInvalidatedTamCamiseta] = useState(false);

  const [comentario, setComentario] = useState("");

  if(submitEdit === true){
    console.log(nomeCompleto);
      console.log(dataNascimento);
      console.log(sexoPessoa);
      console.log(nomeResponsavel);
      console.log(numCalcado);
      console.log(tamCamiseta);
      console.log(comentario);
    setEdit(false);
    setSubmitEdit(false);
  }
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
    if(validatedNomeResponsavel === false){
      setInvalidatedNomeResponsavel(true);
      flag = true;
    }
    if(invalidatedNumCalcado === true){
      flag = true;
    }
    if(invalidatedTamCamiseta === true){
      flag = true;
    }
   
    if(flag === false){
      console.log(nomeCompleto);
      console.log(dataNascimento);
      console.log(sexoPessoa);
      console.log(nomeResponsavel);
      console.log(numCalcado);
      console.log(tamCamiseta);
      console.log(comentario);

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

    <label className="CadastroCriaca-Descricao">É obrigatório o preenchimento de campos com * (Asterisco) no título, é opcional quando não possuem o asterisco</label>
    
    <Form onSubmit={handleSubmit} noValidate  >
      <CamposPessoa onChangeNome={onChangeNome} valNome={validatedNomeCompleto} invNome={invalidatedNomeCompleto}
          data={dataNascimento} onChangeData={onChangeData} valData={validatedDataNascimento} invData={invalidatedDataNascimento}
          onChangeSexo={onChangeSexo}
      />

      <Form.Group as={Row} controlId="formGroupName" >
        <Form.Label column sm={2} className="CadastroCrianca-label">
          Nome do responsável *
        </Form.Label>
        <Col sm={8} className="CadastroCrianca-inputText">
          <Form.Control 
            required 
            type="text" 
            onChange={e => checkText(e.target, setNomeResponsavel, setValidatedNomeResponsavel, setInvalidatedNomeResponsavel)}
            isValid={validatedNomeResponsavel}
            isInvalid={invalidatedNomeResponsavel}
          />
          <Form.Control.Feedback type="invalid">
            Preencha o nome completo do responsável (Apenas letras).
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupCalcado">
        <Form.Label column sm={2} className="CadastroCrianca-label">
          Número do calçado
        </Form.Label>
        <Col sm={8} className="CadastroCrianca-inputText">
          <Form.Control 
            className="CadastroCrianca-inputNumber"
            type="text"
            placeholder="Ex: 33"
            onChange={e => checkNumber(e.target, setNumCalcado, setValidatedNumCalcado, setInvalidatedNumCalcado)}
            isValid={validatedNumCalcado}
            isInvalid={invalidatedNumCalcado}
          />
          <Form.Control.Feedback type="invalid">
            Insira um número maior que zero (Apenas números).
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupTamanho">
        <Form.Label column sm={2} className="CadastroCrianca-label">
          Tamanho de camiseta
        </Form.Label>
        <Col sm={8} className="CadastroCrianca-inputText">
          <Form.Control 
            className="CadastroCrianca-inputNumber"
            type="text"
            placeholder="Ex: 10, 12, GG ..."
            onChange={e => checkCamiseta(e.target, setTamCamiseta, setValidatedTamCamiseta, setInvalidatedTamCamiseta)}
            isValid={validatedTamCamiseta}
            isInvalid={invalidatedTamCamiseta}
          />
          <Form.Control.Feedback type="invalid">
            Insira um número ou um tamanho (PP, P, M, G, GG, GGG).
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Comentario setComentario={setComentario}/>

    </Form>
    </>
  );
}
