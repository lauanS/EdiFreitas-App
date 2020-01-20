import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import {Form, Row, Col} from 'react-bootstrap';


export default function Endereco(props){
  const {logradouro, setLogradouro} = props;
  const {validatedLogradouro, setValidatedLogradouro} = props;
  const {invalidatedLogradouro, setInvalidatedLogradouro} = props;

  const {numero, setNumero} = props;
  const {validatedNumero, setValidatedNumero} = props;
  const {invalidatedNumero, setInvalidatedNumero} = props;

  const {cep, setCep} = props;
  const {validatedCep, setValidatedCep} = props;
  const {invalidatedCep, setInvalidatedCep} = props;

  const {bairro, setBairro} = props;
  const {validatedBairro, setValidatedBairro} = props;
  const {invalidatedBairro, setInvalidatedBairro} = props;

  const {cidade, setCidade} = props;
  const {validatedCidade, setValidatedCidade} = props;
  const {invalidatedCidade, setInvalidatedCidade} = props;

  const {estado, setEstado} = props;
  const {validatedEstado, setValidatedEstado} = props;
  const {invalidatedEstado, setInvalidatedEstado} = props;

  const { onChangedTextField } = props;

  /* Formata o CEP */
  function onChangeCep(e, setCep, setValidatedCep, setInvalidatedCep) {
    let value = e.target.value;

    value = value.replace('-', '');

    // Formata a string para o formato 00000-000
    value = value.replace(/(\d{5})(\d{0,3})/,
      function( regex, arg1, arg2) {
        if(arg2.length){
          return arg1 + '-' + arg2 ;
        }
        else{
          return arg1 + arg2 ;
        }                   
    });  

    // Expressão regular para verificar o formato do CEP
    const re = /\d{5}-\d{3}/gm; 

    // Impede que o usuário digite mais de 9 caracteres
    if (value.length > 9) {
      value = value.substring(0,9);
    }

    // Verificar se o tamanho e o formato do CEP está correto 
    if (value.length === 9 && value.match(re)){
      setValidatedCep(true);
      setInvalidatedCep(false);
    }
    else{
      setValidatedCep(false);
      setInvalidatedCep(true);
    }
  
    setCep(value);   
  }

  /* Verifica o número */
  const onChangeNumero = e => {
    let value = e.target.value;
    let re = /[^\d]+/gm;

    if(value.match(re) || !value.length){
      setInvalidatedNumero(true);
      setValidatedNumero(false);
    }          
    else{
      setInvalidatedNumero(false);
      setValidatedNumero(true);
    }

    setNumero(value);
  }

  return (
    <>
    <Form.Group as={Row} controlId="formLogradouro">
      <Form.Label column sm={2}>
        Logradouro *
      </Form.Label>
      <Col sm={8}>
        <Form.Control 
          required
          type="text" 
          placeholder="Rua/Avenidade/Estrada"
          value={logradouro}
          onChange={e => onChangedTextField(e.target, setLogradouro, setValidatedLogradouro, setInvalidatedLogradouro)}
          isValid={validatedLogradouro}
          isInvalid={invalidatedLogradouro}
          className="cadastro-inputText"
        />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório.
        </Form.Control.Feedback>
      </Col>
    </Form.Group>


    <Form.Group as={Row} sm="3" controlId="formNumero">
      <Form.Label  column sm={2}>
        Número *
      </Form.Label>
      <Col sm={8}>
        <Form.Control 
          required
          className="num-endereco"
          placeholder="Digite apenas números"
          onChange={onChangeNumero}
          value={numero}
          isValid={validatedNumero}
          isInvalid={invalidatedNumero}
        />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório, digite apenas números.
        </Form.Control.Feedback>
      </Col>
    </Form.Group>


    <Form.Group as={Row}  controlId="formCEP">
      <Form.Label  column sm={2}>
        CEP
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          className="num-endereco"
          placeholder="Digite apenas números"
          onChange={e => onChangeCep(e, setCep, setValidatedCep, setInvalidatedCep)}
          value={cep}
          isValid={validatedCep}
          isInvalid={invalidatedCep}
        />        
      </Col>     
    </Form.Group>
    

    <Form.Group as={Row} controlId="formBairro">
      <Form.Label column sm={2}>
        Bairro *
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          required
          type="text" 
          placeholder="Ex: Jd. Neptune"
          className="cadastro-inputText"
          onChange={e => onChangedTextField(e.target, setBairro, setValidatedBairro, setInvalidatedBairro)}
          value={bairro}
          isValid={validatedBairro}
          isInvalid={invalidatedBairro}
        />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório.
        </Form.Control.Feedback>
      </Col>
    </Form.Group>


    <Form.Group as={Row} controlId="formCidade">
      <Form.Label column sm={2}>
        Cidade *
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          required   
          className="cadastro-inputText"
          onChange={e => onChangedTextField(e.target, setCidade, setValidatedCidade, setInvalidatedCidade)}
          value={cidade}
          isValid={validatedCidade}
          isInvalid={invalidatedCidade}
        />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório.
        </Form.Control.Feedback>
      </Col>
    </Form.Group>


    <Form.Group as={Row} controlId="formEstado">
      <Form.Label column sm={2}>
        Estado *
      </Form.Label>
      <Col sm={8}>
        <Form.Control 
          required
          className="cadastro-inputText"
          onChange={e => onChangedTextField(e.target, setEstado, setValidatedEstado, setInvalidatedEstado)}
          value={estado}
          isValid={validatedEstado}
          isInvalid={invalidatedEstado}
        />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório.
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
    

    </>
  );
}
