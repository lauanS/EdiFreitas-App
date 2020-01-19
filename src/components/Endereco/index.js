import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import {Form, Row, Col} from 'react-bootstrap';


export default function Endereco(props){
  const [invalidatedNumero, setInvalidatedNumero] = useState(false);

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

    /* Verifica o número */
    const onChangeNumero = e => {
      let value = e.target.value;
      let re = /[^\d]+/gm;

      if(value.match(re)){
        setInvalidatedNumero(true);
      }          
      else{
        setInvalidatedNumero(false);
      }
    }

  return (
    <>
    <Form.Group as={Row} controlId="formLogradouro">
      <Form.Label column sm={2}>
        Logradouro
      </Form.Label>
      <Col sm={8}>
        <Form.Control 
          placeholder="Rua/Avenidade/Estrada"
        />
      </Col>
    </Form.Group>


    
    <Form.Group as={Row} sm="3" controlId="formNumero">
      <Form.Label  column sm={2}>
        Número
      </Form.Label>
      <Col sm={8}>
        <Form.Control 
          isInvalid={invalidatedNumero}
          placeholder="Digite apenas números"
          onChange={onChangeNumero}
        />
      </Col>
    </Form.Group>

    <Form.Group as={Row}  controlId="formCEP">
      <Form.Label  column sm={2}>
        CEP
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          className="CEP-cad"
          placeholder="Digite apenas números"
          onChange={onChangeCep}
        />
      </Col>     
    </Form.Group>
    


    <Form.Group as={Row} controlId="formBairro">
      <Form.Label column sm={2}>
        Bairro
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          placeholder="Ex: Jd. Neptune"
        />
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId="formCidade">
      <Form.Label column sm={2}>
        Cidade
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          value="Sorocaba"        
        />
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId="formEstado">
      <Form.Label column sm={2}>
        Estado
      </Form.Label>
      <Col sm={8}>
        <Form.Control 
          value="São Paulo"
        />
      </Col>
      
    </Form.Group>
    

    
    </>
  );
}
