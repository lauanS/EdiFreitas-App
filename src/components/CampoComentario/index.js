import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {Form, Row, Col} from 'react-bootstrap';


export default function CampoComentario(){

  return (
      <Form.Group as={Row} controlId="formGroupComment">
        <Form.Label column sm={2}>
          Comentário
        </Form.Label>
        <Col>
          <Form.Control as="textarea" rows="3"/>
        </Col>
      </Form.Group>
  );
}
