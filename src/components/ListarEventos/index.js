import React, { useState, useEffect } from 'react';
import {Form, Row, Col, CardColumns} from 'react-bootstrap';

import CardConsulta from '../CardConsulta';
import EditorDeEventos from "./EditarEventos";

import { getEventos } from '../../services';
import { notFind } from '../../assist/feedback';

import './styles.scss';

export default function ConsultarEventos(){
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState('');

  const urlImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSGSchNBJSYBWUARzgM2YisE5S9_Ew8LSyblcHTg_sCRf38-ApP"

  let filteredEvents = [];

  async function loadEvents(){
    const response = await getEventos();
    console.log(response.data);

    setEvents(response.data);
    return;
  }

  function updateSearch(e) {
    setSearch(e.target.value);  
  }

  function filterEvents(value){  
    const searchLowerCase = search.toLowerCase()
    const valueLowerCase = value.nome.toLowerCase()
    return valueLowerCase.includes(searchLowerCase);
  }

  /* Carregando as notícias */
  useEffect(() => {   
    loadEvents();      
  }, []);

  /* Mensagens de feedback */
  useEffect(() => {   
    if(!filteredEvents.length && search.length){
      setFeedback(notFind('notícia', search));
    }
    else{
      setFeedback("");
    }      
  }, [filteredEvents, search]);

  function renderCards(){
    filteredEvents = events.filter(filterEvents)
    return filteredEvents.map((card, key) => (
      <CardConsulta
        key={key}
        title={card.nome}
        subtitle={card.descricao}
        urlImg={urlImg}
        firstFooter={`Dia: ${card.dataEvento}`}
        lastFooter={`Local: ${card.local}`}
        editor={
          <EditorDeEventos 
            title={card.nome}
            subtitle={card.descricao}
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
            value={search}
            onChange={updateSearch}
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




