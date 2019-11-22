import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {Form, Row, Col, Button} from 'react-bootstrap';

export default class Administrar extends React.Component{
    render(){
        return (
          <Form>
            <Form.Group as={Row} controlId="formGroupName">
              <Form.Label column sm={2}>
                Nome completo do responsável:
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="Ex: Leonardo dos Santos Sampaio  " />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formGroupDate">
              <Form.Label column sm={2}>
                Data de nascimento:
              </Form.Label>
              <Col sm="2">
                <Form.Control type="date" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formGroup">
              <Form.Label column sm={2}>
                CPF:
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="(apenas números)" />
              </Col>
            </Form.Group>

            <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Sexo
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Masculino"
                  name="rdMasc"
                  id="rdMasc"
                />
                <Form.Check
                  type="radio"
                  label="Feminino"
                  name="rdFem"
                  id="rdMasc"
                />
              </Col>
            </Form.Group>
            </fieldset>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Sign in</Button>
              </Col>
            </Form.Group>
          </Form>
         
        );
      }

}
