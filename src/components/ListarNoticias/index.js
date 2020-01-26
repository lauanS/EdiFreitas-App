import React, { useState, useEffect } from 'react';
import {Form, Row, Col, CardColumns} from 'react-bootstrap';

import CardConsulta from '../CardConsulta';

import getNoticias from './news';

import './styles.scss';

export default function ConsultarNoticias(){
  const [noticias, setNoticias] = useState([]);


  function loadNoticias(){
    setNoticias(getNoticias())
    return;
  }

  useEffect(() => {   
    loadNoticias();      
  }, []);

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
    
    <CardColumns>
      {
        noticias.map((noticia, key) => (
          <CardConsulta
            key={key}
            title={noticia.title}
            subtitle={noticia.subtitle}
            urlImg={noticia.urlImg}
            creationDate={noticia.creationDate}
            updateDate={noticia.updateDate}
          />
        ))
      }
    </CardColumns>
    </>
  );
      
}




