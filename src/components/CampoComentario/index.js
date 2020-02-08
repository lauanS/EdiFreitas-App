import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import {Form, Row, Col} from 'react-bootstrap';


export default function CampoComentario(props){
  const {setComentario, comentario, validatedComentario, setValidatedComentario} = props;

  const onChange = e => {
    setComentario(e.value);
    if(e.value.length > 0){
      setValidatedComentario(true);
    }
    else{
      setValidatedComentario(false);
    }
  }

  return (
    <Form.Group as={Row} controlId="formGroupComment">
      <Form.Label column sm={2} className="Comentario__label">
        Comentário
      </Form.Label>
      <Col sm={8} className="Comentario__inputText">
        <Form.Control 
          onChange={e => onChange(e.target)}
          as="textarea" 
          isValid={validatedComentario}
          rows="3" 
          value={comentario}
          placeholder="Algum comentário sobre a pessoa"/>
      </Col>
    </Form.Group>
  );
}
