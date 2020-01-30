import React, { useState, useEffect } from 'react';
import {Form, Row, Col, CardColumns} from 'react-bootstrap';

import CardConsulta from '../CardConsulta';
import EditorDeEventos from "./EditarEventos";

import getEvents from './events';
import { notFind } from '../../assist/feedback';

import './styles.scss';

export default function ConsultarEventos(){
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [feedback, setFeedback] = useState('');

  let filteredEvents = [];

  function loadEvents(){
    setEvents(getEvents())
    return;
  }

  function updateTitle(e) {
    setTitle(e.target.value);  
  }

  function filterEvents(value){  
    const titleLowerCase = title.toLowerCase()
    const valueLowerCase = value.title.toLowerCase()
    return valueLowerCase.includes(titleLowerCase);
  }

  /* Carregando as notícias */
  useEffect(() => {   
    loadEvents();      
  }, []);

  /* Mensagens de feedback */
  useEffect(() => {   
    if(!filteredEvents.length && title.length){
      setFeedback(notFind('notícia', title));
    }
    else{
      setFeedback("");
    }      
  }, [filteredEvents, title]);

  function renderCards(){
    filteredEvents = events.filter(filterEvents)
    return filteredEvents.map((card, key) => (
      <CardConsulta
        key={key}
        title={card.title}
        subtitle={card.subtitle}
        urlImg={card.urlImg}
        creationDate={card.creationDate}
        updateDate={card.updateDate}
        editor={
          <EditorDeEventos 
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
          Evento
        </Form.Label>
        <Col sm={8} className="listarPessoas__inputText">
          <Form.Control 
            type="text" 
            placeholder="Ex: Dia das Crianças" 
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




