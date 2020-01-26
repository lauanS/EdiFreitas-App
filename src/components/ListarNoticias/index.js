import React, { useState, useEffect } from 'react';
import {Form, Row, Col, CardColumns} from 'react-bootstrap';

import CardConsulta from '../CardConsulta';

import getNews from './news';

import './styles.scss';

export default function ConsultarNoticias(){
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');

  function loadNews(){
    setNews(getNews())
    return;
  }

  function updateTitle(e) {
    setTitle(e.target.value);
    console.log(title);    
  }

  function filterNews(value){
    const re = new RegExp(title, "i");
    if(value.title.match(re)){
      return true;
    }
    return false;
  }

  useEffect(() => {   
    loadNews();      
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
            value={title}
            onChange={updateTitle}
          />
        </Col>
      </Form.Group>
    </Form>
    
    <CardColumns>
      {
        news.filter(filterNews).map((card, key) => (
          <CardConsulta
            key={key}
            title={card.title}
            subtitle={card.subtitle}
            urlImg={card.urlImg}
            creationDate={card.creationDate}
            updateDate={card.updateDate}
          />
        ))
      }
    </CardColumns>
    </>
  );
      
}




