import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import {Form, Row, Col} from 'react-bootstrap';


export default function DadosNoticia(props){

  const handleTitleChange = e => {
    console.log("New title: ", e.target.value);
    props.setTitle(e.target.value);
  }

  const handleSubtitleChange = e => {
    console.log("New subtitle: ", e.target.value);
    props.setSubtitle(e.target.value);
  }

  return (
    <>
      <Form.Group as={Row} controlId="formGroupName">
        <Form.Label column sm={2}>
          Título da notícia
        </Form.Label>
        <Col sm={5}>
          <Form.Control 
            onChange={handleTitleChange} 
            type="text" 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupName">
        <Form.Label column sm={2}>
          Subtítulo
        </Form.Label>
        <Col>
          <Form.Control 
            as="textarea" 
            rows="2" 
            onChange={handleSubtitleChange}
          />
        </Col>
      </Form.Group>
    </>
  );
}
