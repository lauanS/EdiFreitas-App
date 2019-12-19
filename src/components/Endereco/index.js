import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import {Form, Row, Col} from 'react-bootstrap';


export default function Endereco(props){
  /* Formata o CEP */
  const onChangeCep = e => {
    let value = e.target.value;
    value = value.replace('-', '');
    let newValue = value.replace(/(\d{5})(\d{0,3})/,
                    function( regex, arg1, arg2) {
                      if(arg2.length){
                        return arg1 + '-' + arg2 ;
                      }
                      else{
                        return arg1 + arg2 ;
                      }
                        
                    });;
    e.target.value = newValue;           
  }

  return (
    <>
    <Form.Group as={Row} controlId="formGroupCpf">
      <Form.Label column sm={2}>Endereço</Form.Label>
      <Col sm={8}>

        <Form.Group controlId="formLogradouro">
          <Form.Label>Logradouro</Form.Label>
          <Form.Control placeholder="Rua/Avenidade/Estrada"/>
        </Form.Group>


        <Form.Row>
          <Form.Group as={Col} sm="3" controlId="formNumero">
            <Form.Label>Número</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} className="CEP-cad" controlId="formCEP">
            <Form.Label>CEP</Form.Label>
            <Form.Control
              placeholder="Digite apenas números"
              onChange={onChangeCep}
            />
          </Form.Group>
        </Form.Row>


        <Form.Group controlId="formBairro">
          <Form.Label>Bairro</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group controlId="formCidade">
          <Form.Label>Cidade</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group controlId="formEstado">
          <Form.Label>Estado</Form.Label>
          <Form.Control />
        </Form.Group>

      </Col>
    </Form.Group>
    
    </>
  );
}
