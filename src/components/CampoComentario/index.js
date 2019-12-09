import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {Form, Row, Col} from 'react-bootstrap';


export default function CampoComentario(props){
  const {setComentario} = props;
  const [valited, setValidated] = useState(false);

  const onChange = e => {
   setComentario(e.value);
   if(e.value.length > 0){
     setValidated(true);
   }
   else{
     setValidated(false);
   }
  }

  return (
    <Form.Group as={Row} controlId="formGroupComment">
      <Form.Label column sm={3}>
        Comentário
      </Form.Label>
      <Col sm={9}>
        <Form.Control 
          onChange={e => onChange(e.target)}
          as="textarea" 
          isValid={valited}
          rows="3" 
          placeholder="Algum comentário sobre a criança"/>
      </Col>
    </Form.Group>
  );
}
