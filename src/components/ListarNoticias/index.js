import React, { useState, useEffect } from 'react';
import {Form, Row, Col, CardColumns} from 'react-bootstrap';

import CardConsulta from '../CardConsulta';
import EditorDeNoticia from "./EditarNoticia";

import getNews from './news';
import { notFind } from '../../assist/feedback';

import './styles.scss';

export default function ConsultarNoticias(){
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [feedback, setFeedback] = useState('');

  let filteredNews = [];

  function loadNews(){
    setNews(getNews())
    return;
  }

  function updateTitle(e) {
    setTitle(e.target.value);  
  }

  function filterNews(value){  
    const titleLowerCase = title.toLowerCase()
    const valueLowerCase = value.title.toLowerCase()
    return valueLowerCase.includes(titleLowerCase);
  }

  /* Carregando as notícias */
  useEffect(() => {   
    loadNews();      
  }, []);

  /* Mensagens de feedback */
  useEffect(() => {   
    if(!filteredNews.length && title.length){
      setFeedback(notFind('notícia', title));
    }
    else{
      setFeedback("");
    }      
  }, [filteredNews, title]);

  function renderCards(){
    filteredNews = news.filter(filterNews)
    return filteredNews.map((card, key) => (
      <CardConsulta
        key={key}
        title={card.title}
        description={card.subtitle}
        urlImg={card.urlImg}
        firstFooter={`Criado em ${card.firstFooter}`}
        lastFooter={`Última atualização ${card.lastFooter}`}
        editor={
          <EditorDeNoticia 
            title={card.title}
            subtitle={card.subtitle}
          />
        }
      />
    ))
  }

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

    <p>{feedback}</p>
    
    <CardColumns>
      {
        renderCards()  
      }
    </CardColumns>
    </>
  );
      
}




