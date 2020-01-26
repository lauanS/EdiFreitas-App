import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import {Form, Row, Col} from 'react-bootstrap';


export default function DadosNoticia(props){
  const { title, subtitle, setTitle, setSubtitle } = props;

  const handleTitleChange = e => {
    setTitle(e.target.value);
  }

  const handleSubtitleChange = e => {
    setSubtitle(e.target.value);
  }

  return (
    <>
      <Form.Group as={Row} controlId="formGroupName">
        <Form.Label column sm={2}>
          Título da notícia
        </Form.Label>
        <Col sm={5}>
          <Form.Control 
            value={title}
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
            value={subtitle}
            onChange={handleSubtitleChange}
          />
        </Col>
      </Form.Group>
    </>
  );
}
