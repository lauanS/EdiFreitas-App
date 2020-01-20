import React from 'react';

import {Form, Row, Col, Card} from 'react-bootstrap';

import './styles.scss';

export default function ConsultarNoticias(){

  return (
    <>
    <Form autoComplete="off">
      <Form.Group as={Row} controlId="formGroupName">
        <Form.Label column sm={2} className="listarPessoas__label">
          Título
        </Form.Label>
        <Col sm={8} className="listarPessoas__inputText">
          <Form.Control 
            type="text" 
            placeholder="Ex: Especial de Natal na EdiFreitas" 
            onChange={() => {}}
          />
        </Col>
      </Form.Group>
    </Form>

    <Card>
      <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSty7h8ESj2uu40elR9QB8bkFZVzp-p5wcR9fSj7OMoZeajQz9x" className="card-img"/>
      <Card.Body>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk
          of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    <br />

    <Card>
      <Card.Body>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk
          of the card's content.
        </Card.Text>
      </Card.Body>
      <Card.Img variant="bottom" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9ZMs6-RUMHVgbRhRwZh8KhRZizU55MwhREo75SwFNSthHbGWC" />
    </Card>


    </>
  );
      
}




