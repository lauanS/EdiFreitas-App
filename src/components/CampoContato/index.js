import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

import './styles.css';

import {Form, Col, InputGroup} from 'react-bootstrap';

export default function CampoContato(){

  const [typeContact, setType] = useState('E-mail');

  const handleChange = e => {
    let {value} = e.target;
    setType(value);
  }

  const displayContactField = type => {
    if(typeContact === "Telefone"){
      return contactFieldPhone();
    }
    return contactFieldEmail();
  }

  const contactFieldEmail = () => {
    return (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroupPrepend"> 
          <EmailIcon />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control 
          required 
          type="email" 
          placeholder="Ex: seu.email@exemplo.com" />
        <Form.Control.Feedback type="invalid">
          E-mail inválido.
        </Form.Control.Feedback>    
      </InputGroup>
    )
  }

  const contactFieldPhone = () => {
    return (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroupPrepend"> 
            <PhoneIcon />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control 
          required 
          type="text" 
          placeholder="Ex: (99) 99999-9999" />
        <Form.Control.Feedback type="invalid">
          Telefone inválido.
        </Form.Control.Feedback>    
      </InputGroup>
    );
  }

  return (
  <>
    <Form.Row>
      <Form.Group as={Col} controlId="fromGroupTypeContact">
        <Form.Label>Novo contato: </Form.Label>
        <Form.Control as="select" value={typeContact} onChange={handleChange}>
          <option>Telefone</option>
          <option>E-mail</option>
        </Form.Control>  
      </Form.Group>

      <Form.Group as={Col} sm={10} controlId="formGroupContact">
        <Form.Label>
          {typeContact}
        </Form.Label>
        { displayContactField('') } 
      </Form.Group> 

    </Form.Row>
    
  </>
  );
}
