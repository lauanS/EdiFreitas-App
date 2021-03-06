import React from 'react';
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

  const { onChangeTextField } = props;

  /* Formata o CEP */
  const onChangeCep = e => {
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

    // Regras para o CEP ser válido
    const sizeIsCorrect = (value.length === 9);
    const onlyNumbers = value.match(re);
    const IsEmpty = (value.length === 0);

    // Verificar se o tamanho e o formato do CEP está correto 
    if (sizeIsCorrect && onlyNumbers){
      setValidatedCep(true);
      setInvalidatedCep(false);
    }
    else if(IsEmpty){
      setValidatedCep(false);
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
    const value = e.target.value;
    
    if(!value.length){
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
      <Form.Label column sm={2} className="endereco__label">
        Logradouro *
      </Form.Label>
      <Col sm={8}>
        <Form.Control 
          required
          type="text" 
          placeholder="Rua/Avenidade/Estrada"
          value={logradouro}
          onChange={e => onChangeTextField(e.target, setLogradouro, setValidatedLogradouro, setInvalidatedLogradouro)}
          isValid={validatedLogradouro}
          isInvalid={invalidatedLogradouro}
          className="endereco__inputText"
        />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório.
        </Form.Control.Feedback>
      </Col>
    </Form.Group>


    <Form.Group as={Row} sm="3" controlId="formNumero">
      <Form.Label  column sm={2} className="endereco__label">
        Número *
      </Form.Label>
      <Col sm={8}>
        <Form.Control 
          required
          type="text"
          className="endereco__inputNumber"
          placeholder="Número da casa"
          onChange={onChangeNumero}
          value={numero}
          isValid={validatedNumero}
          isInvalid={invalidatedNumero}
        />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório.
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
    

    <Form.Group as={Row} controlId="formBairro">
      <Form.Label column sm={2} className="endereco__label">
        Bairro *
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          required
          type="text" 
          placeholder="Ex: Jd. Neptune"
          className="endereco__inputText"
          onChange={e => onChangeTextField(e.target, setBairro, setValidatedBairro, setInvalidatedBairro)}
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
      <Form.Label column sm={2} className="endereco__label">
        Cidade *
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          required   
          type="text" 
          className="endereco__inputText"
          onChange={e => onChangeTextField(e.target, setCidade, setValidatedCidade, setInvalidatedCidade)}
          value={cidade}
          isValid={validatedCidade}
          isInvalid={invalidatedCidade}
          placeholder="Ex: Sorocaba"
        />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório.
        </Form.Control.Feedback>
      </Col>
    </Form.Group>   

    <Form.Group as={Row}  controlId="formCEP">
      <Form.Label  column sm={2} className="endereco__label">
        CEP
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          type="text"
          className="endereco__inputNumber"
          placeholder="Digite apenas números"
          onChange={onChangeCep}
          value={cep}
          isValid={validatedCep}
          isInvalid={invalidatedCep}
        />        
      </Col>     
    </Form.Group>

    </>
  );
}
